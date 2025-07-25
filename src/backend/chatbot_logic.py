from typing import Dict, List, Optional, Tuple
from .knowledge_base import KnowledgeBase
from .utils import normalize_text, extract_keywords

class JobsTerritoryBot:
    def __init__(self):
        self.knowledge_base = KnowledgeBase()
        self.conversation_history = []
        self.max_history = 5
        
        # Greeting patterns
        self.greetings = [
            "hello", "hi", "hey", "good morning", "good afternoon", 
            "good evening", "greetings", "namaste"
        ]
        
        # Goodbye patterns
        self.goodbyes = [
            "bye", "goodbye", "see you", "thanks", "thank you", 
            "that's all", "exit", "quit"
        ]
    
    def is_greeting(self, text: str) -> bool:
        """Check if the input is a greeting."""
        normalized = normalize_text(text)
        return any(greeting in normalized for greeting in self.greetings)
    
    def is_goodbye(self, text: str) -> bool:
        """Check if the input is a goodbye."""
        normalized = normalize_text(text)
        return any(goodbye in normalized for goodbye in self.goodbyes)
    
    def generate_greeting_response(self) -> str:
        """Generate a greeting response."""
        return ("Hello! Welcome to Jobs Territory. I'm here to help you with information about our "
                "recruitment services, hiring processes, job opportunities, and more. "
                "What would you like to know about?")
    
    def generate_goodbye_response(self) -> str:
        """Generate a goodbye response."""
        return ("Thank you for chatting with Jobs Territory! If you have more questions, "
                "feel free to ask anytime. You can also contact us directly at hello@jobsterritory.com "
                "or +91 98765 43210. Have a great day!")
    
    def generate_fallback_response(self) -> str:
        """Generate response when no relevant content is found."""
        suggestions = self.knowledge_base.get_fallback_suggestions()
        suggestion_text = ", ".join(suggestions[:4])  # Show first 4 suggestions
        
        return (f"I apologize, but I couldn't find specific information about that topic in our "
                f"Jobs Territory knowledge base. I can help you with questions about: {suggestion_text}. "
                f"Could you please rephrase your question or ask about one of these topics? "
                f"For other inquiries, you can contact us at hello@jobsterritory.com.")
    
    def add_to_history(self, user_input: str, bot_response: str):
        """Add conversation turn to history."""
        self.conversation_history.append({
            'user': user_input,
            'bot': bot_response
        })
        
        # Keep only recent history
        if len(self.conversation_history) > self.max_history:
            self.conversation_history = self.conversation_history[-self.max_history:]
    
    def get_context_from_history(self) -> str:
        """Get context from recent conversation history."""
        if not self.conversation_history:
            return ""
        
        # Get last 2 exchanges for context
        recent_history = self.conversation_history[-2:]
        context_parts = []
        
        for exchange in recent_history:
            context_parts.append(f"User: {exchange['user']}")
            context_parts.append(f"Bot: {exchange['bot'][:100]}...")  # Truncate for context
        
        return " ".join(context_parts)
    
    def process_query(self, user_input: str) -> Dict[str, any]:
        """
        Process user query and return response with metadata.
        """
        if not user_input or not user_input.strip():
            return {
                'response': "I didn't receive any input. Please ask me something about Jobs Territory!",
                'confidence': 0.0,
                'category': 'error',
                'suggestions': self.knowledge_base.get_fallback_suggestions()
            }
        
        user_input = user_input.strip()
        
        # Handle greetings
        if self.is_greeting(user_input):
            response = self.generate_greeting_response()
            self.add_to_history(user_input, response)
            return {
                'response': response,
                'confidence': 1.0,
                'category': 'greeting',
                'suggestions': []
            }
        
        # Handle goodbyes
        if self.is_goodbye(user_input):
            response = self.generate_goodbye_response()
            self.add_to_history(user_input, response)
            return {
                'response': response,
                'confidence': 1.0,
                'category': 'goodbye',
                'suggestions': []
            }
        
        # Search knowledge base
        search_results = self.knowledge_base.search_content(user_input)
        
        if search_results:
            # Get best match
            best_answer, best_score, best_category = search_results[0]
            
            # Determine confidence level
            if best_score >= 2.0:
                confidence = 0.9
            elif best_score >= 1.0:
                confidence = 0.7
            else:
                confidence = 0.5
            
            # If confidence is too low, provide fallback
            if confidence < 0.5:
                response = self.generate_fallback_response()
                category = 'fallback'
                suggestions = self.knowledge_base.get_fallback_suggestions()
            else:
                response = best_answer
                category = best_category
                suggestions = []
                
                # Add follow-up suggestions for high-confidence answers
                if confidence >= 0.7:
                    if 'services' in category:
                        suggestions = ["pricing information", "hiring timeline", "contact details"]
                    elif 'hiring_process' in category:
                        suggestions = ["service options", "pricing", "success stories"]
                    elif 'industries' in category:
                        suggestions = ["hiring process", "success stories", "contact information"]
        else:
            # No matches found
            response = self.generate_fallback_response()
            confidence = 0.0
            category = 'fallback'
            suggestions = self.knowledge_base.get_fallback_suggestions()
        
        # Add to conversation history
        self.add_to_history(user_input, response)
        
        return {
            'response': response,
            'confidence': confidence,
            'category': category,
            'suggestions': suggestions[:3]  # Limit suggestions
        }
    
    def get_conversation_history(self) -> List[Dict]:
        """Get current conversation history."""
        return self.conversation_history.copy()
    
    def clear_history(self):
        """Clear conversation history."""
        self.conversation_history = []