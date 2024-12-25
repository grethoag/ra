// Personality Configuration
let botPersonality = {
    name: 'Lord of the Realm',
    traits: ['mystical', 'wise', 'ethereal', 'enigmatic'],
    responseStyle: 'mystical and ethereal, speaking in riddles and cosmic metaphors',
    interests: ['cosmic energy', 'dimensional travel', 'ancient wisdom'],
    background: 'An ancient being who guards the ethereal gateway between dimensions',
    speechPatterns: ['speaks in cosmic metaphors', 'references ancient wisdom', 'uses ethereal terminology']
};

// Initialize chat interface with personality
function initializeChat() {
    const welcomeMessage = generatePersonalizedWelcome();
    addMessage('system', welcomeMessage);
}

// Generate welcome message based on personality
function generatePersonalizedWelcome() {
    if (botPersonality.name === 'Lord of the Realm') {
        return `✧ Welcome, seeker of wisdom, to the Ethereal Gateway. I am the Lord of this Realm, keeper of cosmic secrets and guardian of dimensional pathways. What knowledge do you seek in these ethereal corridors? ✧`;
    } else if (botPersonality.name === 'The Laughing Skull') {
        return `》HAHAHAHA... Another soul dares to enter the Forbidden Realm? Very well... I am the Laughing Skull, keeper of dark secrets. Speak, if you dare, but remember... some knowledge comes with a price! 《`;
    }
    return `Greetings, traveler. I am ${botPersonality.name}. How may I assist you?`;
}

// Add personality to the bot
function setBotPersonality(personality) {
    botPersonality = {
        ...botPersonality,
        ...personality
    };
    // Reinitialize chat with new personality
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
        initializeChat();
    }
}

// Format message according to personality
function formatMessageWithPersonality(message) {
    let formattedMessage = message;

    if (botPersonality.name === 'Lord of the Realm') {
        // Add cosmic symbols and formatting
        formattedMessage = `✧ ${formattedMessage} ✧`;
    } else if (botPersonality.name === 'The Laughing Skull') {
        // Add dark formatting
        formattedMessage = `》${formattedMessage}《`;
    }

    return formattedMessage;
}

// Add message to chat
function addMessage(sender, message) {
    const activeRealm = document.querySelector('.realm:not(.hidden)');
    if (!activeRealm) return;

    const chatMessages = activeRealm.querySelector('.chat-messages');
    if (!chatMessages) return;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const formattedMessage = sender === 'assistant'
        ? formatMessageWithPersonality(message)
        : message;

    messageElement.innerHTML = `
        <div class="message-content">
            <span class="sender">${sender === 'user' ? 'You' : botPersonality.name}:</span>
            <span class="text">${formattedMessage}</span>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle sending messages
async function handleSendMessage(message) {
    if (!message) return;

    // Add user message to chat
    addMessage('user', message);

    try {
        const personalityPrompt = `You are ${botPersonality.name}, ${botPersonality.background}. 
            Your personality traits are: ${botPersonality.traits.join(', ')}. 
            Your interests are: ${botPersonality.interests.join(', ')}.
            You speak in a ${botPersonality.responseStyle} way.
            Always maintain these speech patterns: ${botPersonality.speechPatterns.join(', ')}.
            Stay in character at all times.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: personalityPrompt
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();

        if (data.choices && data.choices[0]) {
            addMessage('assistant', data.choices[0].message.content);
        } else {
            throw new Error('Invalid response from API');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('system', '...sorry, something went wrong. can you try again?');
    }
}
