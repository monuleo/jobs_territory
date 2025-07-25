#!/usr/bin/env python3
"""
Test script for Advanced ATS Matching System
Tests core functionality without requiring file uploads
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src', 'backend'))

def test_imports():
    """Test if all required modules can be imported"""
    print("🔄 Testing imports...")
    
    try:
        import spacy
        import nltk
        import docx
        import pypdf
        import fastapi
        import uvicorn
        from ats_core import initialize_nlp, extract_skills, extract_experience, extract_ctc_info
        print("✅ All imports successful")
        return True
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return False

def test_nlp_initialization():
    """Test NLP model initialization"""
    print("\n🔄 Testing NLP initialization...")
    
    try:
        from ats_core import initialize_nlp
        if initialize_nlp():
            print("✅ NLP models initialized successfully")
            return True
        else:
            print("❌ NLP initialization failed")
            return False
    except Exception as e:
        print(f"❌ NLP initialization error: {e}")
        return False

def test_text_processing():
    """Test text processing functions"""
    print("\n🔄 Testing text processing...")
    
    try:
        from ats_core import extract_skills, extract_experience, extract_ctc_info, clean_text
        
        # Sample CV text
        cv_text = """
        John Doe
        Senior Software Engineer
        
        Experience: 8 years in software development
        
        Skills: Python, JavaScript, React, AWS, Docker, Kubernetes, Machine Learning
        
        Work Experience:
        - Senior Software Engineer at Tech Corp (2020-2024)
        - Developed scalable REST APIs using Python and Django
        - Led a team of 5 developers
        - Implemented microservices architecture
        
        Education:
        - M.Sc Computer Science, MIT (2016)
        - Published 3 research papers in AI conferences
        
        Expected CTC: $120,000 - $140,000 per annum
        """
        
        # Sample JD text
        jd_text = """
        Senior Software Engineer Position
        
        Requirements:
        - 5+ years of experience in software development
        - Strong skills in Python, JavaScript, React
        - Experience with cloud platforms (AWS preferred)
        - Knowledge of containerization (Docker, Kubernetes)
        - Leadership experience preferred
        
        Responsibilities:
        - Develop and maintain scalable web applications
        - Design REST APIs and microservices
        - Collaborate with cross-functional teams
        - Mentor junior developers
        
        Compensation: $110,000 - $130,000 annually
        """
        
        # Test skills extraction
        cv_skills = extract_skills(clean_text(cv_text))
        jd_skills = extract_skills(clean_text(jd_text))
        
        print(f"   CV Skills found: {len(cv_skills)} - {cv_skills[:5]}...")
        print(f"   JD Skills found: {len(jd_skills)} - {jd_skills[:5]}...")
        
        # Test experience extraction
        cv_exp = extract_experience(cv_text)
        jd_exp = extract_experience(jd_text)
        
        print(f"   CV Experience: {cv_exp}")
        print(f"   JD Experience: {jd_exp}")
        
        # Test CTC extraction
        cv_ctc = extract_ctc_info(cv_text)
        jd_ctc = extract_ctc_info(jd_text)
        
        print(f"   CV CTC: {cv_ctc}")
        print(f"   JD CTC: {jd_ctc}")
        
        print("✅ Text processing tests passed")
        return True
        
    except Exception as e:
        print(f"❌ Text processing test failed: {e}")
        return False

def test_matching_algorithm():
    """Test the matching algorithm"""
    print("\n🔄 Testing matching algorithm...")
    
    try:
        from ats_core import parse_document, calculate_match_score
        
        # Create sample parsed data (simulating document parsing)
        parsed_jd = {
            "text": "Senior Software Engineer position requiring Python, JavaScript, React, AWS, 5+ years experience",
            "skills": ["python", "javascript", "react", "aws", "docker"],
            "experience": {"years_of_experience": 5, "seniority_level": "Senior"},
            "ctc": {"min_value": 110000, "max_value": 130000, "currency": "USD"},
            "key_responsibilities": [
                "Develop and maintain scalable web applications",
                "Design REST APIs and microservices",
                "Collaborate with cross-functional teams"
            ]
        }
        
        parsed_cv = {
            "text": "Senior Software Engineer with 8 years experience in Python, JavaScript, React, AWS, Docker, Kubernetes",
            "skills": ["python", "javascript", "react", "aws", "docker", "kubernetes", "machine learning"],
            "experience": {"years_of_experience": 8, "seniority_level": "Senior"},
            "ctc": {"min_value": 120000, "max_value": 140000, "currency": "USD"},
            "academic_info": {
                "degrees": ["M.Sc Computer Science"],
                "universities": ["MIT"],
                "publications": ["3 research papers"],
                "awards": []
            }
        }
        
        # Calculate match score
        result = calculate_match_score(parsed_jd, parsed_cv)
        
        print(f"   Match Score: {result['score']}%")
        print(f"   Matched Skills: {len(result['matched_skills'])} - {result['matched_skills']}")
        print(f"   Missing Skills: {len(result['missing_jd_skills'])} - {result['missing_jd_skills']}")
        print(f"   Experience Feedback: {result['experience_feedback'][:100]}...")
        print(f"   CTC Feedback: {result['ctc_feedback'][:100]}...")
        
        if result['score'] > 0:
            print("✅ Matching algorithm test passed")
            return True
        else:
            print("❌ Matching algorithm returned 0 score")
            return False
            
    except Exception as e:
        print(f"❌ Matching algorithm test failed: {e}")
        return False

def test_file_processing():
    """Test file processing capabilities"""
    print("\n🔄 Testing file processing...")
    
    try:
        from ats_core import extract_text_from_txt
        
        # Test with sample text
        sample_text = "This is a test document with Python and JavaScript skills."
        text_bytes = sample_text.encode('utf-8')
        
        extracted = extract_text_from_txt(text_bytes)
        
        if extracted.strip() == sample_text:
            print("✅ File processing test passed")
            return True
        else:
            print(f"❌ File processing test failed: expected '{sample_text}', got '{extracted}'")
            return False
            
    except Exception as e:
        print(f"❌ File processing test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Testing Advanced ATS Matching System")
    print("=" * 50)
    
    tests = [
        test_imports,
        test_nlp_initialization,
        test_text_processing,
        test_matching_algorithm,
        test_file_processing
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The system is ready to use.")
        print("\nNext steps:")
        print("1. Start the backend server: python src/backend/main.py")
        print("2. Start the frontend: npm run dev")
        print("3. Open http://localhost:5173 in your browser")
    else:
        print("❌ Some tests failed. Please check the setup and dependencies.")
        print("Run 'python setup_ats.py' to fix common issues.")

if __name__ == "__main__":
    main()