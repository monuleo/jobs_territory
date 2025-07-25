"""
FastAPI Backend for Advanced CV-to-JD Matching System
Provides ephemeral, high-accuracy matching without persistent storage
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from typing import Dict, Any
import os

# Import our enhanced ATS core module
from ats_core import parse_document, calculate_match_score, initialize_nlp

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Advanced ATS Matching API",
    description="High-accuracy CV-to-JD matching with comprehensive analysis",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supported file types
SUPPORTED_FILE_TYPES = {'.pdf', '.docx', '.doc', '.txt'}

def get_file_extension(filename: str) -> str:
    """Extract file extension from filename"""
    return os.path.splitext(filename.lower())[1]

def validate_file(file: UploadFile) -> str:
    """Validate uploaded file and return file type"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
    
    file_ext = get_file_extension(file.filename)
    if file_ext not in SUPPORTED_FILE_TYPES:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file type: {file_ext}. Supported types: {', '.join(SUPPORTED_FILE_TYPES)}"
        )
    
    # Check file size (10MB limit)
    if hasattr(file, 'size') and file.size and file.size > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size too large. Maximum 10MB allowed.")
    
    return file_ext.lstrip('.')

@app.on_event("startup")
async def startup_event():
    """Initialize NLP models on startup"""
    logger.info("Initializing NLP models...")
    if initialize_nlp():
        logger.info("NLP models initialized successfully")
    else:
        logger.error("Failed to initialize NLP models")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Advanced ATS Matching API is running", "status": "healthy"}

@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "ATS Matching API",
        "version": "1.0.0",
        "features": [
            "CV parsing (PDF, DOCX, TXT)",
            "JD parsing (PDF, DOCX, TXT)", 
            "Skills extraction",
            "Experience analysis",
            "CTC matching",
            "Academic info extraction",
            "Responsibility matching",
            "Ephemeral processing"
        ]
    }

@app.post("/api/ats/match")
async def match_cv_to_jd(
    jd_file: UploadFile = File(..., description="Job Description file (PDF, DOCX, or TXT)"),
    resume_file: UploadFile = File(..., description="Resume/CV file (PDF, DOCX, or TXT)")
) -> Dict[str, Any]:
    """
    Advanced CV-to-JD matching endpoint with comprehensive analysis
    
    This endpoint processes uploaded JD and CV files, performs sophisticated matching,
    and returns detailed analysis without storing any file content persistently.
    
    Returns:
    - Overall match score (0-100)
    - Matched and missing skills
    - Experience alignment analysis
    - CTC compatibility assessment
    - Academic qualifications review
    - JD responsibilities matching
    - Detailed feedback for recruiters
    """
    
    try:
        logger.info(f"Processing match request: JD={jd_file.filename}, CV={resume_file.filename}")
        
        # Validate both files
        jd_file_type = validate_file(jd_file)
        cv_file_type = validate_file(resume_file)
        
        # Read file contents into memory (ephemeral processing)
        jd_content = await jd_file.read()
        cv_content = await resume_file.read()
        
        # Validate file contents
        if not jd_content:
            raise HTTPException(status_code=400, detail="JD file is empty")
        if not cv_content:
            raise HTTPException(status_code=400, detail="Resume file is empty")
        
        logger.info(f"Files read successfully. JD: {len(jd_content)} bytes, CV: {len(cv_content)} bytes")
        
        # Parse Job Description
        try:
            parsed_jd = parse_document(jd_content, jd_file_type, is_jd=True)
            logger.info(f"JD parsed successfully. Skills found: {len(parsed_jd.get('skills', []))}")
        except Exception as e:
            logger.error(f"Failed to parse JD: {e}")
            raise HTTPException(status_code=422, detail=f"Failed to parse Job Description: {str(e)}")
        
        # Parse CV/Resume
        try:
            parsed_cv = parse_document(cv_content, cv_file_type, is_jd=False)
            logger.info(f"CV parsed successfully. Skills found: {len(parsed_cv.get('skills', []))}")
        except Exception as e:
            logger.error(f"Failed to parse CV: {e}")
            raise HTTPException(status_code=422, detail=f"Failed to parse Resume/CV: {str(e)}")
        
        # Calculate comprehensive match score
        try:
            match_result = calculate_match_score(parsed_jd, parsed_cv)
            logger.info(f"Match calculation completed. Score: {match_result.get('score', 0)}")
        except Exception as e:
            logger.error(f"Failed to calculate match score: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to calculate match score: {str(e)}")
        
        # Enhance result with metadata
        enhanced_result = {
            **match_result,
            "metadata": {
                "jd_filename": jd_file.filename,
                "cv_filename": resume_file.filename,
                "jd_skills_count": len(parsed_jd.get('skills', [])),
                "cv_skills_count": len(parsed_cv.get('skills', [])),
                "jd_experience_years": parsed_jd.get('experience', {}).get('years_of_experience', 0),
                "cv_experience_years": parsed_cv.get('experience', {}).get('years_of_experience', 0),
                "jd_responsibilities_count": len(parsed_jd.get('key_responsibilities', [])),
                "processing_note": "Files processed in-memory only. No data stored on server."
            }
        }
        
        logger.info("Match request completed successfully")
        return enhanced_result
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error in match endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/ats/parse")
async def parse_single_document(
    file: UploadFile = File(..., description="Document to parse (PDF, DOCX, or TXT)"),
    is_jd: bool = False
) -> Dict[str, Any]:
    """
    Parse a single document (JD or CV) and return extracted information
    Useful for testing and debugging parsing capabilities
    """
    
    try:
        logger.info(f"Parsing single document: {file.filename}, is_jd={is_jd}")
        
        # Validate file
        file_type = validate_file(file)
        
        # Read file content
        file_content = await file.read()
        if not file_content:
            raise HTTPException(status_code=400, detail="File is empty")
        
        # Parse document
        parsed_result = parse_document(file_content, file_type, is_jd=is_jd)
        
        # Add metadata
        result = {
            **parsed_result,
            "metadata": {
                "filename": file.filename,
                "file_type": file_type,
                "is_jd": is_jd,
                "text_length": len(parsed_result.get('text', '')),
                "processing_note": "File processed in-memory only. No data stored on server."
            }
        }
        
        # Remove full text from response to keep it manageable
        if 'text' in result:
            result['text_preview'] = result['text'][:500] + "..." if len(result['text']) > 500 else result['text']
            del result['text']
        
        logger.info("Document parsing completed successfully")
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error parsing document: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse document: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)