import json
import os
from typing import Dict, List, Tuple, Optional

class KnowledgeBase:
    def __init__(self, data_file: str = "data/jobsterritory_content.json"):
        self.data_file = data_file
        self.content = {}
        self.load_content()
    
    def load_content(self):
        """Load knowledge base content from JSON file."""
        try:
            if os.path.exists(self.data_file):
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    self.content = json.load(f)
                print(f"Knowledge base loaded successfully with {len(self.content)} categories")
            else:
                print(f"Warning: Knowledge base file {self.data_file} not found")
                self.content = {}
        except Exception as e:
            print(f"Error loading knowledge base: {e}")
            self.content = {}
    
    def get_all_entries(self) -> List[Tuple[List[str], str, str]]:
        """
        Get all entries from knowledge base as (keywords, answer, category) tuples.
        """
        entries = []
        
        for category, subcategories in self.content.items():
            for subcategory, data in subcategories.items():
                if isinstance(data, dict) and 'keywords' in data and 'answer' in data:
                    keywords = data['keywords']
                    answer = data['answer']
                    full_category = f"{category}.{subcategory}"
                    entries.append((keywords, answer, full_category))
        
        return entries
    
    def search_content(self, query: str) -> List[Tuple[str, float, str]]:
        """
        Search for relevant content based on query.
        Returns list of (answer, score, category) tuples sorted by relevance.
        """
        from utils import extract_keywords, calculate_match_score, normalize_text
        
        user_keywords = extract_keywords(query)
        user_text_normalized = normalize_text(query)
        
        results = []
        
        for keywords, answer, category in self.get_all_entries():
            # Calculate match score
            score = calculate_match_score(user_keywords, keywords, query, ' '.join(keywords))
            
            if score > 0:
                results.append((answer, score, category))
        
        # Sort by score (descending)
        results.sort(key=lambda x: x[1], reverse=True)
        
        return results
    
    def get_fallback_suggestions(self) -> List[str]:
        """Get list of suggested topics when no match is found."""
        suggestions = [
            "recruitment services (RaaS, Pay Per Hire, Fractional Hiring)",
            "hiring process and timeline",
            "technology and IT jobs",
            "pricing and costs",
            "contact information",
            "company information",
            "job seeker services",
            "success stories and case studies"
        ]
        return suggestions
    
    def get_category_info(self, category: str) -> Optional[Dict]:
        """Get information about a specific category."""
        parts = category.split('.')
        if len(parts) == 2:
            main_cat, sub_cat = parts
            return self.content.get(main_cat, {}).get(sub_cat)
        return None