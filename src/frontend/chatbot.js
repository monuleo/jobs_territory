class JobsTerritoryBot {
    constructor() {
        this.apiUrl = 'http://localhost:5001';
        this.isOpen = false;
        this.isTyping = false;
        this.messageHistory = [];
        
        this.init();
    }
    
    init() {
        this.createChatWidget();
        this.attachEventListeners();
        this.loadWelcomeMessage();
    }
    
    createChatWidget() {
        // Create main container
        const container = document.createElement('div');
        container.className = 'jt-chatbot-container';
        container.innerHTML = `
            <!-- Chat Button -->
            <button class="jt-chat-button" id="jt-chat-toggle" aria-label="Open Jobs Territory Chat">
                <svg class="jt-chat-icon" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <div class="jt-notification-badge" id="jt-notification" style="display: none;">1</div>
            </button>
            
            <!-- Chat Window -->
            <div class="jt-chat-window" id="jt-chat-window">
                <!-- Header -->
                <div class="jt-chat-header">
                    <div class="jt-chat-header-info">
                        <div class="jt-chat-avatar">JT</div>
                        <div>
                            <h3 class="jt-chat-title">Jobs Territory</h3>
                            <p class="jt-chat-subtitle">Ask me anything about our services</p>
                        </div>
                    </div>
                    <button class="jt-chat-close" id="jt-chat-close" aria-label="Close chat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>
                
                <!-- Messages -->
                <div class="jt-chat-messages" id="jt-chat-messages">
                    <div class="jt-welcome-message">
                        <h4 class="jt-welcome-title">Welcome to Jobs Territory!</h4>
                        <p class="jt-welcome-subtitle">I'm here to help you with information about our recruitment services.</p>
                        <div class="jt-quick-actions">
                            <button class="jt-quick-action" data-message="Tell me about your services">
                                🔧 Our Services
                            </button>
                            <button class="jt-quick-action" data-message="What is the hiring process?">
                                📋 Hiring Process
                            </button>
                            <button class="jt-quick-action" data-message="What are your pricing options?">
                                💰 Pricing Information
                            </button>
                            <button class="jt-quick-action" data-message="How can I contact you?">
                                📞 Contact Us
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Suggestions -->
                <div class="jt-suggestions" id="jt-suggestions"></div>
                
                <!-- Input -->
                <div class="jt-chat-input-container">
                    <div class="jt-chat-input-wrapper">
                        <textarea 
                            class="jt-chat-input" 
                            id="jt-chat-input" 
                            placeholder="Ask me about our services..."
                            rows="1"
                        ></textarea>
                        <button class="jt-send-button" id="jt-send-button" aria-label="Send message">
                            <svg class="jt-send-icon" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
    }
    
    attachEventListeners() {
        // Toggle chat
        document.getElementById('jt-chat-toggle').addEventListener('click', () => {
            this.toggleChat();
        });
        
        // Close chat
        document.getElementById('jt-chat-close').addEventListener('click', () => {
            this.closeChat();
        });
        
        // Send message
        document.getElementById('jt-send-button').addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Input handling
        const input = document.getElementById('jt-chat-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        input.addEventListener('input', () => {
            this.autoResizeTextarea(input);
        });
        
        // Quick actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('jt-quick-action')) {
                const message = e.target.getAttribute('data-message');
                this.sendQuickMessage(message);
            }
        });
        
        // Suggestion chips
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('jt-suggestion-chip')) {
                const message = e.target.textContent;
                this.sendQuickMessage(message);
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            const container = document.querySelector('.jt-chatbot-container');
            if (this.isOpen && !container.contains(e.target)) {
                this.closeChat();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        const window = document.getElementById('jt-chat-window');
        const button = document.getElementById('jt-chat-toggle');
        const notification = document.getElementById('jt-notification');
        
        window.classList.add('active');
        button.classList.add('active');
        notification.style.display = 'none';
        
        this.isOpen = true;
        
        // Focus input
        setTimeout(() => {
            document.getElementById('jt-chat-input').focus();
        }, 300);
    }
    
    closeChat() {
        const window = document.getElementById('jt-chat-window');
        const button = document.getElementById('jt-chat-toggle');
        
        window.classList.remove('active');
        button.classList.remove('active');
        
        this.isOpen = false;
    }
    
    loadWelcomeMessage() {
        // Show notification badge after 3 seconds if chat hasn't been opened
        setTimeout(() => {
            if (!this.isOpen) {
                document.getElementById('jt-notification').style.display = 'flex';
            }
        }, 3000);
    }
    
    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }
    
    sendMessage() {
        const input = document.getElementById('jt-chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        input.style.height = 'auto';
        
        this.sendToBot(message);
    }
    
    sendQuickMessage(message) {
        this.addUserMessage(message);
        this.sendToBot(message);
        
        // Hide welcome message
        const welcome = document.querySelector('.jt-welcome-message');
        if (welcome) {
            welcome.style.display = 'none';
        }
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('jt-chat-messages');
        
        const messageElement = document.createElement('div');
        messageElement.className = 'jt-message user';
        messageElement.innerHTML = `
            <div class="jt-message-avatar">You</div>
            <div class="jt-message-content">${this.escapeHtml(message)}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Hide welcome message
        const welcome = document.querySelector('.jt-welcome-message');
        if (welcome) {
            welcome.style.display = 'none';
        }
    }
    
    addBotMessage(message, suggestions = []) {
        const messagesContainer = document.getElementById('jt-chat-messages');
        
        const messageElement = document.createElement('div');
        messageElement.className = 'jt-message bot';
        messageElement.innerHTML = `
            <div class="jt-message-avatar">JT</div>
            <div class="jt-message-content">${this.escapeHtml(message)}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add suggestions
        this.showSuggestions(suggestions);
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('jt-chat-messages');
        
        const typingElement = document.createElement('div');
        typingElement.className = 'jt-message bot';
        typingElement.id = 'jt-typing-indicator';
        typingElement.innerHTML = `
            <div class="jt-message-avatar">JT</div>
            <div class="jt-typing-indicator">
                <div class="jt-typing-dots">
                    <div class="jt-typing-dot"></div>
                    <div class="jt-typing-dot"></div>
                    <div class="jt-typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
        this.isTyping = true;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('jt-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }
    
    showSuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('jt-suggestions');
        suggestionsContainer.innerHTML = '';
        
        if (suggestions && suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                const chip = document.createElement('button');
                chip.className = 'jt-suggestion-chip';
                chip.textContent = suggestion;
                suggestionsContainer.appendChild(chip);
            });
        }
    }
    
    async sendToBot(message) {
        this.showTypingIndicator();
        
        try {
            const response = await fetch(`${this.apiUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Simulate typing delay
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addBotMessage(data.response, data.suggestions);
            }, 1000 + Math.random() * 1000); // 1-2 second delay
            
        } catch (error) {
            console.error('Error sending message to bot:', error);
            
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addBotMessage(
                    "I apologize, but I'm having trouble connecting to our servers right now. " +
                    "Please try again in a moment, or contact us directly at hello@jobsterritory.com " +
                    "or +91 98765 43210 for immediate assistance."
                );
            }, 1000);
        }
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('jt-chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the chatbot when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if the chatbot is already initialized
    if (!window.jobsTerritoryBot) {
        window.jobsTerritoryBot = new JobsTerritoryBot();
        console.log('Jobs Territory Chatbot initialized successfully');
    }
});

// Also initialize if the script is loaded after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.jobsTerritoryBot) {
            window.jobsTerritoryBot = new JobsTerritoryBot();
            console.log('Jobs Territory Chatbot initialized successfully');
        }
    });
} else {
    // DOM is already loaded
    if (!window.jobsTerritoryBot) {
        window.jobsTerritoryBot = new JobsTerritoryBot();
        console.log('Jobs Territory Chatbot initialized successfully');
    }
}