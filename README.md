# Jobs Territory Chatbot

A comprehensive rule-based chatbot system for Jobs Territory that provides information about recruitment services, hiring processes, and company details without relying on external AI APIs.

## 🚀 Features

- **Rule-Based Intelligence**: No external AI APIs required
- **Comprehensive Knowledge Base**: Covers all Jobs Territory services
- **Modern UI**: Floating chat widget with smooth animations
- **Mobile Responsive**: Works perfectly on all devices
- **Easy Integration**: Simple HTML/CSS/JS embedding
- **Conversation Memory**: Maintains context across interactions
- **Fallback Handling**: Graceful responses for unknown queries

## 📋 Prerequisites

- Python 3.8 or higher
- Modern web browser
- Basic knowledge of HTML/CSS/JavaScript

## 🛠️ Installation

1. **Clone or download the project files**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server**:
   ```bash
   cd src/backend
   python main.py
   ```
   The API server will start on `http://localhost:5001`

4. **Open the frontend**:
   Open `public/index.html` in your web browser or serve it through a web server.

## 🎯 Quick Start

### Testing the Chatbot

1. Open `public/index.html` in your browser
2. Click the floating chat button in the bottom-right corner
3. Try these sample queries:
   - "Hello" - Test greeting
   - "Tell me about RaaS" - Service information
   - "What is your pricing?" - Pricing details
   - "How can I contact you?" - Contact information
   - "What industries do you serve?" - Industry information

### Integration into Existing Website

Add these lines to your HTML file before the closing `</body>` tag:

```html
<!-- Chatbot Styles -->
<link rel="stylesheet" href="path/to/src/frontend/chatbot.css">

<!-- Chatbot Script -->
<script src="path/to/src/frontend/chatbot.js"></script>
```

That's it! The chatbot will automatically initialize and appear as a floating widget.

## 📁 Project Structure

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
└── requirements.txt             # Python dependencies
```

## 🔧 Configuration

### Backend Configuration

The backend server can be configured through environment variables:

```bash
export PORT=5001          # API server port
export DEBUG=True         # Enable debug mode
```

### Frontend Configuration

Modify the API URL in `src/frontend/chatbot.js`:

```javascript
constructor() {
    this.apiUrl = 'http://localhost:5001';  // Change this to your API URL
    // ... rest of constructor
}
```

## 📚 Knowledge Base

The chatbot's knowledge is stored in `data/jobsterritory_content.json`. The structure is:

```json
{
  "category": {
    "subcategory": {
      "keywords": ["keyword1", "keyword2"],
      "answer": "Detailed answer about the topic"
    }
  }
}
```

### Adding New Content

1. Edit `data/jobsterritory_content.json`
2. Add new categories or update existing ones
3. Restart the backend server
4. Test the new content

### Content Categories

- **services**: RaaS, Pay Per Hire, C-Suite Hiring, etc.
- **hiring_process**: Process steps, timelines
- **industries**: Technology, E-commerce, Manufacturing, etc.
- **company_info**: About, locations, contact
- **pricing**: Service costs and models
- **job_seekers**: Career services
- **success_stories**: Case studies and testimonials
- **international**: Global hiring services

## 🧪 Testing

### Run Backend Tests

```bash
cd tests
python test_chatbot_logic.py
python test_knowledge_base.py
```

### Manual Testing

1. Start the backend server
2. Open `public/index.html`
3. Test various queries:
   - Greetings: "Hello", "Hi there"
   - Services: "Tell me about RaaS", "What is Pay Per Hire?"
   - Process: "How does hiring work?", "What is your timeline?"
   - Contact: "How can I reach you?", "What is your phone number?"
   - Industries: "Do you work with tech companies?", "What about healthcare?"

## 🎨 Customization

### Styling

Modify `src/frontend/chatbot.css` to match your brand:

```css
.jt-chat-button {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
}

.jt-chat-header {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Behavior

Customize chatbot behavior in `src/backend/chatbot_logic.py`:

```python
class JobsTerritoryBot:
    def __init__(self):
        self.max_history = 10  # Increase conversation memory
        # ... other customizations
```

## 🚀 Deployment

### Production Deployment

1. **Backend**: Deploy the Flask app using Gunicorn, uWSGI, or similar
2. **Frontend**: Serve static files through a web server (Nginx, Apache)
3. **SSL**: Enable HTTPS for secure communication
4. **Domain**: Update API URL in frontend to production domain

### Example Production Setup

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
cd src/backend
gunicorn -w 4 -b 0.0.0.0:5001 main:app
```

## 🔍 API Endpoints

### POST /chat
Send a message to the chatbot.

**Request:**
```json
{
  "message": "Tell me about RaaS"
}
```

**Response:**
```json
{
  "response": "Recruitment as a Service (RaaS) is...",
  "confidence": 0.9,
  "category": "services.raas",
  "suggestions": ["pricing", "timeline", "contact"],
  "status": "success"
}
```

### GET /chat/history
Get conversation history.

### POST /chat/clear
Clear conversation history.

### GET /chat/suggestions
Get topic suggestions.

## 🐛 Troubleshooting

### Common Issues

1. **Chatbot not appearing**: Check console for JavaScript errors
2. **API connection failed**: Ensure backend server is running on correct port
3. **Responses not working**: Verify knowledge base JSON is valid
4. **Styling issues**: Check CSS file path and browser compatibility

### Debug Mode

Enable debug logging in the backend:

```python
app.run(host='0.0.0.0', port=5001, debug=True)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions:
- Email: hello@jobsterritory.com
- Phone: +91 98765 43210
- Website: www.jobsterritory.com

## 🎉 Acknowledgments

- Built with modern web technologies
- Designed for Jobs Territory's specific needs
- Optimized for performance and user experience