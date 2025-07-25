# ATS Resume Matcher Setup Guide

## Overview
This guide will help you set up the new ATS (Applicant Tracking System) Resume Matcher feature that allows users to compare job descriptions with resumes instantly.

## Installation Steps

### 1. Install Python Dependencies
Run the following command to install the required Python packages:

```bash
pip install -r requirements.txt
```

### 2. Install SpaCy English Model
After installing the Python dependencies, you need to download the English language model for spaCy:

```bash
python -m spacy download en_core_web_sm
```

### 3. Download NLTK Data
Run this Python command to download required NLTK data:

```bash
python -c "import nltk; nltk.download('stopwords'); nltk.download('punkt')"
```

### 4. Install Node.js Dependencies
Install the frontend dependencies:

```bash
npm install
```

## Files Added/Modified

### New Files Created:
- `src/backend/ats_core.py` - Core ATS logic for document parsing and skill matching
- `src/components/ATSComponent.tsx` - React component for the ATS interface
- `ATS_SETUP_GUIDE.md` - This setup guide

### Modified Files:
- `src/backend/main.py` - Added new `/api/ats/match` endpoint
- `src/App.tsx` - Integrated ATSComponent into the main app
- `requirements.txt` - Added python-docx, PyPDF2, spacy
- `package.json` - Added axios dependency

## How to Use

1. Start the backend server:
   ```bash
   cd src/backend
   python main.py
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. Navigate to the application in your browser
4. Scroll down to the "ATS Resume Matcher" section
5. Upload a Job Description file (PDF, DOCX, or TXT)
6. Upload a Resume file (PDF, DOCX, or TXT)
7. Click "Compare Files" to see the match results

## Features

- **Instant Processing**: Files are processed in memory without server storage
- **Multiple File Formats**: Supports PDF, DOCX, and TXT files
- **Skill Extraction**: Uses advanced NLP to identify skills from both documents
- **Match Scoring**: Provides percentage match score and detailed skill breakdown
- **Privacy Focused**: No files are stored on the server after processing

## API Endpoint

### POST `/api/ats/match`
- **Purpose**: Compare job description and resume files
- **Parameters**: 
  - `jd_file`: Job description file (multipart/form-data)
  - `resume_file`: Resume file (multipart/form-data)
- **Response**: JSON with match score and skill analysis
- **Supported Formats**: PDF, DOCX, TXT

## Troubleshooting

### Common Issues:

1. **SpaCy model not found**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

2. **NLTK data missing**:
   ```bash
   python -c "import nltk; nltk.download('stopwords'); nltk.download('punkt')"
   ```

3. **PDF parsing errors**: Ensure PDF files are text-based (not scanned images)

4. **CORS issues**: Make sure the backend is running on port 5001 and frontend on the default Vite port

## Security Notes

- Files are processed entirely in memory
- No persistent storage of uploaded documents
- Files are automatically cleaned up after processing
- All processing happens server-side for security