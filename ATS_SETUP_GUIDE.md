# Advanced CV-to-JD Matching System - Setup Guide

## Overview

This system provides "ChatGPT-level" accuracy for CV-to-JD matching with comprehensive analysis including skills matching, experience alignment, CTC compatibility, academic qualifications, and responsibility matching. All processing is ephemeral - no data is stored on the server.

## Features

- **Advanced Skills Extraction**: Uses spaCy NLP with curated professional skills dictionary
- **Experience Analysis**: Extracts years of experience and seniority levels
- **CTC Matching**: Parses and compares salary expectations with job offerings
- **Academic Info**: Extracts degrees, universities, publications, and awards
- **Responsibility Matching**: Maps JD requirements to CV experience
- **Ephemeral Processing**: All data processed in-memory only
- **Multi-format Support**: PDF, DOCX, and TXT files

## System Requirements

- **Python**: 3.8 or higher
- **Node.js**: 16 or higher
- **Memory**: At least 2GB RAM (for NLP models)
- **Storage**: ~500MB for dependencies and models

## Quick Setup

### 1. Backend Setup

```bash
# Create and activate virtual environment (recommended)
python -m venv ats_env

# Windows
ats_env\Scripts\activate

# macOS/Linux
source ats_env/bin/activate

# Run automated setup
python setup_ats.py
```

### 2. Frontend Setup

```bash
# Install frontend dependencies (if not already done)
npm install

# Start frontend development server
npm run dev
```

### 3. Start Backend Server

```bash
# Option 1: Direct Python execution
cd src/backend
python main.py

# Option 2: Using uvicorn
uvicorn src.backend.main:app --reload --host 0.0.0.0 --port 8000
```

## Manual Setup (if automated setup fails)

### Backend Dependencies

```bash
# Install Python packages
pip install fastapi==0.104.1
pip install uvicorn==0.24.0
pip install python-multipart==0.0.6
pip install python-dotenv==1.0.0
pip install python-docx==0.8.11
pip install pypdf==3.17.1
pip install spacy==3.7.2
pip install nltk==3.8.1

# Download spaCy English model
python -m spacy download en_core_web_sm

# Download NLTK data
python -c "import nltk; nltk.download('stopwords'); nltk.download('punkt')"
```

### Frontend Dependencies

The required frontend dependencies should already be in package.json:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "framer-motion": "^10.16.4",
    "axios": "^1.6.0"
  }
}
```

## Architecture Overview

### Backend Components

1. **`src/backend/ats_core.py`** - Core matching engine
   - Text extraction from PDF, DOCX, TXT
   - NLP processing with spaCy
   - Skills extraction with professional dictionary
   - Experience and CTC parsing
   - Academic information extraction
   - Comprehensive matching algorithm

2. **`src/backend/main.py`** - FastAPI server
   - `/api/ats/match` - Main matching endpoint
   - `/api/ats/parse` - Single document parsing (for testing)
   - Robust error handling and validation
   - CORS configuration for frontend

### Frontend Components

1. **`src/components/ATSComponent.tsx`** - Main UI component
   - File upload interface
   - Results visualization
   - Detailed analysis sections
   - Export functionality

## API Endpoints

### POST /api/ats/match

Main matching endpoint that accepts JD and CV files.

**Request:**
```
Content-Type: multipart/form-data
- jd_file: File (PDF, DOCX, TXT)
- resume_file: File (PDF, DOCX, TXT)
```

**Response:**
```json
{
  "score": 85.2,
  "matched_skills": ["python", "react", "aws"],
  "missing_jd_skills": ["kubernetes", "docker"],
  "extra_cv_skills": ["tensorflow", "pytorch"],
  "experience_feedback": "Candidate's 8 years of Senior experience exceeds...",
  "ctc_feedback": "Perfect alignment: Candidate's expected CTC...",
  "academic_alignment_feedback": "Candidate holds relevant degrees...",
  "jd_responsibilities_matched_in_cv": [
    {
      "responsibility": "Develop scalable REST APIs",
      "found_in_cv": true,
      "relevant_snippet": "Developed and deployed highly scalable...",
      "confidence": 0.85
    }
  ],
  "metadata": {
    "jd_filename": "job_description.pdf",
    "cv_filename": "resume.pdf",
    "processing_note": "Files processed in-memory only..."
  }
}
```

### POST /api/ats/parse

Single document parsing endpoint for testing.

**Request:**
```
Content-Type: multipart/form-data
- file: File (PDF, DOCX, TXT)
- is_jd: boolean (optional, default: false)
```

## Accuracy Features

### Skills Extraction
- **Professional Skills Dictionary**: 200+ curated technical and soft skills
- **Multi-word Skills**: Handles "Machine Learning", "Project Management"
- **Synonyms**: Recognizes variations like "Python" vs "Py"
- **Context-aware**: Uses spaCy NLP for better accuracy

### Experience Analysis
- **Years Extraction**: Multiple regex patterns for experience parsing
- **Seniority Detection**: Maps job titles to seniority levels
- **Contextual Analysis**: Considers both explicit years and job titles

### CTC Processing
- **Multi-currency Support**: USD, EUR, GBP, INR
- **Format Flexibility**: Handles "10 LPA", "$75,000", "75k-80k"
- **Range Detection**: Extracts min/max salary ranges

### Responsibility Matching
- **Semantic Analysis**: Uses spaCy for better text understanding
- **Confidence Scoring**: Provides match confidence levels
- **Snippet Extraction**: Shows relevant CV sections

## Security & Privacy

### Ephemeral Processing
- Files are processed entirely in-memory
- No persistent storage of uploaded content
- Automatic cleanup after processing
- No logging of sensitive data

### File Validation
- File type restrictions (PDF, DOCX, TXT only)
- File size limits (10MB maximum)
- Content validation before processing

## Performance Optimization

### NLP Model Loading
- spaCy model loaded once at startup
- Shared across all requests
- Memory-efficient processing

### Caching
- NLTK data downloaded once
- Professional skills dictionary pre-loaded
- Optimized regex patterns

## Troubleshooting

### Common Issues

1. **spaCy model not found**
   ```bash
   python -m spacy download en_core_web_sm
   ```

2. **NLTK data missing**
   ```python
   import nltk
   nltk.download('stopwords')
   nltk.download('punkt')
   ```

3. **Memory issues**
   - Ensure at least 2GB RAM available
   - Close other applications if needed
   - Consider using smaller files for testing

4. **CORS errors**
   - Check that backend is running on port 8000
   - Verify frontend is accessing correct backend URL
   - Check CORS configuration in main.py

### Testing the System

1. **Backend Health Check**
   ```bash
   curl http://localhost:8000/api/health
   ```

2. **Test with Sample Files**
   - Use the provided test files in the repository
   - Start with small, simple documents
   - Gradually test with more complex files

## Extending the System

### Adding New Skills
Edit the `PROFESSIONAL_SKILLS` set in `ats_core.py`:

```python
PROFESSIONAL_SKILLS.update({
    'new_skill_1', 'new_skill_2', 'framework_name'
})
```

### Improving Accuracy
1. **Expand Skills Dictionary**: Add domain-specific skills
2. **Enhance Patterns**: Improve regex patterns for better extraction
3. **Custom NLP Models**: Train domain-specific spaCy models
4. **Feedback Loop**: Collect user feedback for continuous improvement

### Adding New File Types
1. Add extraction function in `ats_core.py`
2. Update file validation in `main.py`
3. Add MIME type support in frontend

## Production Deployment

### Backend
- Use production WSGI server (Gunicorn + Uvicorn)
- Configure proper logging
- Set up monitoring and health checks
- Use environment variables for configuration

### Frontend
- Build production bundle: `npm run build`
- Serve with nginx or similar
- Configure proper CORS for production domain

### Security
- Add authentication if needed
- Implement rate limiting
- Use HTTPS in production
- Regular security updates

## Support

For issues or questions:
1. Check this setup guide
2. Review error logs
3. Test with simple files first
4. Verify all dependencies are installed correctly

The system is designed to be robust and handle various file formats and content types while maintaining high accuracy in matching analysis.