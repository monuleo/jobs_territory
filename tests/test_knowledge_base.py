import unittest
import sys
import os
import json
import tempfile

# Add the src directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from backend.knowledge_base import KnowledgeBase

class TestKnowledgeBase(unittest.TestCase):
    def setUp(self):
        # Create a temporary knowledge base file for testing
        self.test_data = {
            "services": {
                "raas": {
                    "keywords": ["raas", "recruitment as a service"],
                    "answer": "Test RaaS answer"
                },
                "pay_per_hire": {
                    "keywords": ["pay per hire", "pph"],
                    "answer": "Test Pay Per Hire answer"
                }
            },
            "contact": {
                "general": {
                    "keywords": ["contact", "phone", "email"],
                    "answer": "Test contact answer"
                }
            }
        }
        
        # Create temporary file
        self.temp_file = tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json')
        json.dump(self.test_data, self.temp_file)
        self.temp_file.close()
        
        self.kb = KnowledgeBase(self.temp_file.name)
    
    def tearDown(self):
        # Clean up temporary file
        os.unlink(self.temp_file.name)
    
    def test_load_content(self):
        """Test loading content from JSON file."""
        self.assertEqual(len(self.kb.content), 2)  # services and contact
        self.assertIn('services', self.kb.content)
        self.assertIn('contact', self.kb.content)
    
    def test_get_all_entries(self):
        """Test getting all entries from knowledge base."""
        entries = self.kb.get_all_entries()
        self.assertEqual(len(entries), 3)  # raas, pay_per_hire, contact.general
        
        # Check structure
        keywords, answer, category = entries[0]
        self.assertIsInstance(keywords, list)
        self.assertIsInstance(answer, str)
        self.assertIsInstance(category, str)
    
    def test_search_content_exact_match(self):
        """Test searching with exact keyword match."""
        results = self.kb.search_content("raas")
        self.assertGreater(len(results), 0)
        
        answer, score, category = results[0]
        self.assertEqual(answer, "Test RaaS answer")
        self.assertGreater(score, 0)
    
    def test_search_content_partial_match(self):
        """Test searching with partial keyword match."""
        results = self.kb.search_content("recruitment service")
        self.assertGreater(len(results), 0)
        
        # Should find RaaS entry
        answer, score, category = results[0]
        self.assertEqual(answer, "Test RaaS answer")
    
    def test_search_content_no_match(self):
        """Test searching with no matches."""
        results = self.kb.search_content("quantum physics")
        self.assertEqual(len(results), 0)
    
    def test_search_content_multiple_matches(self):
        """Test searching that returns multiple matches."""
        results = self.kb.search_content("contact phone")
        self.assertGreater(len(results), 0)
        
        # Results should be sorted by score
        if len(results) > 1:
            self.assertGreaterEqual(results[0][1], results[1][1])
    
    def test_get_fallback_suggestions(self):
        """Test getting fallback suggestions."""
        suggestions = self.kb.get_fallback_suggestions()
        self.assertIsInstance(suggestions, list)
        self.assertGreater(len(suggestions), 0)
        
        # Check that suggestions are strings
        for suggestion in suggestions:
            self.assertIsInstance(suggestion, str)
    
    def test_get_category_info(self):
        """Test getting category information."""
        info = self.kb.get_category_info("services.raas")
        self.assertIsNotNone(info)
        self.assertIn('keywords', info)
        self.assertIn('answer', info)
        
        # Test non-existent category
        info = self.kb.get_category_info("nonexistent.category")
        self.assertIsNone(info)
    
    def test_load_nonexistent_file(self):
        """Test loading from non-existent file."""
        kb = KnowledgeBase("nonexistent_file.json")
        self.assertEqual(len(kb.content), 0)
    
    def test_case_insensitive_search(self):
        """Test that search is case insensitive."""
        results_lower = self.kb.search_content("raas")
        results_upper = self.kb.search_content("RAAS")
        results_mixed = self.kb.search_content("RaaS")
        
        # All should return the same results
        self.assertEqual(len(results_lower), len(results_upper))
        self.assertEqual(len(results_lower), len(results_mixed))
        
        if results_lower:
            self.assertEqual(results_lower[0][0], results_upper[0][0])
            self.assertEqual(results_lower[0][0], results_mixed[0][0])

if __name__ == '__main__':
    unittest.main()