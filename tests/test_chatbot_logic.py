import unittest
import sys
import os

# Add the src directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from backend.chatbot_logic import JobsTerritoryBot

class TestChatbotLogic(unittest.TestCase):
    def setUp(self):
        self.bot = JobsTerritoryBot()
    
    def test_greeting_detection(self):
        """Test greeting detection."""
        self.assertTrue(self.bot.is_greeting("hello"))
        self.assertTrue(self.bot.is_greeting("Hi there"))
        self.assertTrue(self.bot.is_greeting("Good morning"))
        self.assertFalse(self.bot.is_greeting("What is RaaS?"))
    
    def test_goodbye_detection(self):
        """Test goodbye detection."""
        self.assertTrue(self.bot.is_goodbye("bye"))
        self.assertTrue(self.bot.is_goodbye("Thank you"))
        self.assertTrue(self.bot.is_goodbye("goodbye"))
        self.assertFalse(self.bot.is_goodbye("What is your pricing?"))
    
    def test_greeting_response(self):
        """Test greeting response generation."""
        result = self.bot.process_query("Hello")
        self.assertEqual(result['category'], 'greeting')
        self.assertEqual(result['confidence'], 1.0)
        self.assertIn('Welcome', result['response'])
    
    def test_service_query(self):
        """Test service-related queries."""
        result = self.bot.process_query("Tell me about RaaS")
        self.assertGreater(result['confidence'], 0.5)
        self.assertIn('Recruitment as a Service', result['response'])
    
    def test_pricing_query(self):
        """Test pricing-related queries."""
        result = self.bot.process_query("What are your fees?")
        self.assertGreater(result['confidence'], 0.5)
        self.assertIn('pricing', result['response'].lower())
    
    def test_contact_query(self):
        """Test contact information queries."""
        result = self.bot.process_query("How can I contact you?")
        self.assertGreater(result['confidence'], 0.5)
        self.assertIn('hello@jobsterritory.com', result['response'])
    
    def test_fallback_response(self):
        """Test fallback for unknown queries."""
        result = self.bot.process_query("What is quantum physics?")
        self.assertEqual(result['category'], 'fallback')
        self.assertIn('apologize', result['response'])
    
    def test_empty_query(self):
        """Test empty query handling."""
        result = self.bot.process_query("")
        self.assertEqual(result['category'], 'error')
        self.assertIn("didn't receive", result['response'])
    
    def test_conversation_history(self):
        """Test conversation history management."""
        self.bot.process_query("Hello")
        self.bot.process_query("Tell me about RaaS")
        
        history = self.bot.get_conversation_history()
        self.assertEqual(len(history), 2)
        self.assertEqual(history[0]['user'], "Hello")
        self.assertEqual(history[1]['user'], "Tell me about RaaS")
    
    def test_history_limit(self):
        """Test conversation history limit."""
        # Add more than max_history messages
        for i in range(10):
            self.bot.process_query(f"Message {i}")
        
        history = self.bot.get_conversation_history()
        self.assertLessEqual(len(history), self.bot.max_history)
    
    def test_clear_history(self):
        """Test clearing conversation history."""
        self.bot.process_query("Hello")
        self.bot.clear_history()
        
        history = self.bot.get_conversation_history()
        self.assertEqual(len(history), 0)

if __name__ == '__main__':
    unittest.main()