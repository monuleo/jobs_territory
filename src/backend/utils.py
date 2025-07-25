import re
import string
from typing import List

def normalize_text(text: str) -> str:
    """
    Normalize user input text for better matching.
    """
    if not text:
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove punctuation except spaces
    text = text.translate(str.maketrans('', '', string.punctuation.replace(' ', '')))
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    return text

def extract_keywords(text: str) -> List[str]:
    """
    Extract meaningful keywords from text.
    """
    # Common stop words to filter out
    stop_words = {
        'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
        'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
        'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
        'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
        'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
        'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
        'while', 'of', 'at', 'by', 'for', 'with', 'through', 'during', 'before', 'after',
        'above', 'below', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
        'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
        'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
        'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will',
        'just', 'don', 'should', 'now', 'tell', 'about', 'know', 'want', 'need'
    }
    
    normalized = normalize_text(text)
    words = normalized.split()
    
    # Filter out stop words and short words
    keywords = [word for word in words if word not in stop_words and len(word) > 2]
    
    return keywords

def calculate_match_score(user_keywords: List[str], content_keywords: List[str], user_text: str, content_text: str) -> float:
    """
    Calculate relevance score between user input and content.
    """
    if not user_keywords or not content_keywords:
        return 0.0
    
    # Check for exact phrase matches (higher weight)
    exact_phrase_score = 0
    user_text_normalized = normalize_text(user_text)
    content_text_normalized = normalize_text(content_text)
    
    for content_keyword in content_keywords:
        if content_keyword in user_text_normalized:
            exact_phrase_score += len(content_keyword.split()) * 2
    
    # Check for individual keyword matches
    keyword_matches = 0
    for user_keyword in user_keywords:
        for content_keyword in content_keywords:
            if user_keyword in content_keyword or content_keyword in user_keyword:
                keyword_matches += 1
    
    # Calculate final score
    keyword_score = keyword_matches / len(user_keywords)
    total_score = exact_phrase_score + keyword_score
    
    return total_score

def get_synonyms(word: str) -> List[str]:
    """
    Get simple synonyms for common recruitment terms.
    """
    synonym_map = {
        'job': ['position', 'role', 'career', 'employment', 'work'],
        'hire': ['recruit', 'employ', 'onboard', 'place'],
        'company': ['organization', 'firm', 'business', 'employer'],
        'salary': ['compensation', 'pay', 'wage', 'ctc', 'package'],
        'experience': ['background', 'expertise', 'skills'],
        'process': ['procedure', 'steps', 'workflow', 'method'],
        'cost': ['price', 'fee', 'charge', 'pricing'],
        'fast': ['quick', 'rapid', 'speedy', 'swift'],
        'help': ['assist', 'support', 'aid'],
        'find': ['search', 'locate', 'discover', 'get']
    }
    
    return synonym_map.get(word.lower(), [])