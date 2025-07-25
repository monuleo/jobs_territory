#!/usr/bin/env python3
"""
Setup script for Advanced ATS Matching System
Installs required Python dependencies and downloads necessary NLP models
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error: {e.stderr}")
        return False

def main():
    print("🚀 Setting up Advanced ATS Matching System")
    print("=" * 50)
    
    # Check if we're in a virtual environment
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️  Warning: You're not in a virtual environment.")
        print("It's recommended to create and activate a virtual environment first:")
        print("python -m venv ats_env")
        print("# On Windows: ats_env\\Scripts\\activate")
        print("# On macOS/Linux: source ats_env/bin/activate")
        
        response = input("\nContinue anyway? (y/N): ").lower().strip()
        if response != 'y':
            print("Setup cancelled.")
            return
    
    # Install Python dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        print("Failed to install Python dependencies. Please check your requirements.txt file.")
        return
    
    # Download spaCy model
    if not run_command("python -m spacy download en_core_web_sm", "Downloading spaCy English model"):
        print("Failed to download spaCy model. You may need to install it manually:")
        print("python -m spacy download en_core_web_sm")
    
    # Download NLTK data
    print("\n🔄 Downloading NLTK data...")
    try:
        import nltk
        nltk.download('stopwords', quiet=True)
        nltk.download('punkt', quiet=True)
        print("✅ NLTK data downloaded successfully")
    except Exception as e:
        print(f"❌ Failed to download NLTK data: {e}")
        print("You may need to download it manually in Python:")
        print("import nltk; nltk.download('stopwords'); nltk.download('punkt')")
    
    # Test imports
    print("\n🔄 Testing imports...")
    try:
        import spacy
        import nltk
        import docx
        import pypdf
        import fastapi
        import uvicorn
        
        # Test spaCy model
        nlp = spacy.load("en_core_web_sm")
        print("✅ All imports successful")
        
        print("\n🎉 Setup completed successfully!")
        print("\nTo start the backend server:")
        print("cd src/backend")
        print("python main.py")
        print("\nOr using uvicorn directly:")
        print("uvicorn src.backend.main:app --reload --host 0.0.0.0 --port 8000")
        
        print("\nTo start the frontend (in another terminal):")
        print("npm run dev")
        
    except ImportError as e:
        print(f"❌ Import test failed: {e}")
        print("Some dependencies may not be installed correctly.")
        print("Please check the error messages above and install missing packages.")
    except OSError as e:
        print(f"❌ spaCy model test failed: {e}")
        print("Please run: python -m spacy download en_core_web_sm")

if __name__ == "__main__":
    main()