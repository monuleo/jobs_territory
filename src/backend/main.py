from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.chatbot_logic import JobsTerritoryBot
from backend.ats_core import parse_document, extract_skills, calculate_match_score

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the chatbot
bot = JobsTerritoryBot()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'service': 'Jobs Territory Chatbot API',
        'version': '1.0.0'
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Main chat endpoint."""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'error': 'Missing message in request body'
            }), 400
        
        user_message = data['message']
        
        # Process the query
        result = bot.process_query(user_message)
        
        return jsonify({
            'response': result['response'],
            'confidence': result['confidence'],
            'category': result['category'],
            'suggestions': result.get('suggestions', []),
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': f'Internal server error: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/chat/history', methods=['GET'])
def get_history():
    """Get conversation history."""
    try:
        history = bot.get_conversation_history()
        return jsonify({
            'history': history,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': f'Error retrieving history: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/chat/clear', methods=['POST'])
def clear_history():
    """Clear conversation history."""
    try:
        bot.clear_history()
        return jsonify({
            'message': 'Conversation history cleared',
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': f'Error clearing history: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/chat/suggestions', methods=['GET'])
def get_suggestions():
    """Get topic suggestions."""
    try:
        suggestions = bot.knowledge_base.get_fallback_suggestions()
        return jsonify({
            'suggestions': suggestions,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': f'Error getting suggestions: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/api/ats/match', methods=['POST'])
def ats_match():
    """ATS matching endpoint for job description and resume comparison."""
    try:
        # Check if files are present in the request
        if 'jd_file' not in request.files or 'resume_file' not in request.files:
            return jsonify({
                'error': 'Both jd_file and resume_file are required',
                'status': 'error'
            }), 400
        
        jd_file = request.files['jd_file']
        resume_file = request.files['resume_file']
        
        # Check if files are actually selected
        if jd_file.filename == '' or resume_file.filename == '':
            return jsonify({
                'error': 'Both files must be selected',
                'status': 'error'
            }), 400
        
        # Read file contents into memory (no disk storage)
        jd_content_bytes = jd_file.read()
        resume_content_bytes = resume_file.read()
        
        # Determine file types from filenames
        def get_file_type(filename):
            if filename.lower().endswith('.pdf'):
                return 'pdf'
            elif filename.lower().endswith('.docx'):
                return 'docx'
            elif filename.lower().endswith('.txt'):
                return 'txt'
            else:
                return None
        
        jd_file_type = get_file_type(jd_file.filename)
        resume_file_type = get_file_type(resume_file.filename)
        
        # Validate file types
        if jd_file_type is None:
            return jsonify({
                'error': f'Unsupported job description file type. Supported: PDF, DOCX, TXT',
                'status': 'error'
            }), 400
        
        if resume_file_type is None:
            return jsonify({
                'error': f'Unsupported resume file type. Supported: PDF, DOCX, TXT',
                'status': 'error'
            }), 400
        
        # Process job description
        try:
            jd_text = parse_document(jd_content_bytes, jd_file_type)
            jd_skills = extract_skills(jd_text)
        except Exception as e:
            return jsonify({
                'error': f'Could not parse job description file: {str(e)}',
                'status': 'error'
            }), 400
        
        # Process resume
        try:
            resume_text = parse_document(resume_content_bytes, resume_file_type)
            resume_skills = extract_skills(resume_text)
        except Exception as e:
            return jsonify({
                'error': f'Could not parse resume file: {str(e)}',
                'status': 'error'
            }), 400
        
        # Calculate match score
        match_result = calculate_match_score(jd_skills, resume_skills)
        
        return jsonify({
            'match_result': match_result,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': f'Internal server error: {str(e)}',
            'status': 'error'
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    print(f"Starting Jobs Territory Chatbot API on port {port}")
    print(f"Debug mode: {debug}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)