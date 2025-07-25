# Jobs Territory Chatbot - Project Structure

## Directory Organization

```
jobsterritory_chatbot/
├── src/
│   ├── backend/
│   │   ├── main.py              # Flask API server
│   │   ├── chatbot_logic.py     # Core chatbot logic
│   │   ├── knowledge_base.py    # Knowledge base management
│   │   └── utils.py             # Text processing utilities
│   └── frontend/
│       ├── chatbot.css          # Widget styling
│       └── chatbot.js           # Frontend logic
├── data/
│   └── jobsterritory_content.json  # Knowledge base data
├── tests/
│   ├── test_chatbot_logic.py    # Logic tests
│   └── test_knowledge_base.py   # Knowledge base tests
├── public/
│   └── index.html               # Integration example
├── .bolt/
│   └── steering/                # Project documentation
├── requirements.txt             # Python dependencies
└── README.md                    # Setup instructions
```

## Component Responsibilities

### Backend Components

#### main.py
- Flask application setup
- API endpoint definitions
- CORS configuration
- Error handling

#### chatbot_logic.py
- Main chatbot class
- Query processing
- Response generation
- Conversation management

#### knowledge_base.py
- JSON data loading
- Content searching
- Category management
- Fallback suggestions

#### utils.py
- Text normalization
- Keyword extraction
- Scoring algorithms
- Synonym handling

### Frontend Components

#### chatbot.js
- Widget initialization
- User interface management
- API communication
- Event handling

#### chatbot.css
- Visual styling
- Animations
- Responsive design
- Accessibility features

### Data Structure

#### jobsterritory_content.json
- Hierarchical content organization
- Keyword-answer mappings
- Category-based grouping
- Comprehensive service information

## Integration Points

### API Endpoints
- POST /chat - Main conversation endpoint
- GET /chat/history - Conversation history
- POST /chat/clear - Clear history
- GET /chat/suggestions - Topic suggestions

### Frontend Integration
- Single JavaScript file inclusion
- CSS stylesheet linking
- HTML container injection
- Event listener attachment

## Testing Strategy

### Unit Tests
- Chatbot logic validation
- Knowledge base functionality
- Text processing utilities
- API endpoint testing

### Integration Tests
- Frontend-backend communication
- Widget functionality
- Cross-browser compatibility
- Mobile responsiveness