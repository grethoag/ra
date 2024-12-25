document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.content');
    const etherealRealm = document.querySelector('.ethereal-realm');
    const voidRealm = document.querySelector('.void-realm');
    const forbiddenRealm = document.querySelector('.forbidden-realm');
    const portals = document.querySelectorAll('.portal');
    const timestampElement = document.getElementById('timestamp');
    const returnButtons = document.querySelectorAll('.return-button');
    const copyButton = document.querySelector('.copy-button');
    const copyText = document.querySelector('.copy-text');
    
    const FORBIDDEN_PASSWORD = 'realm123';
    
    // Update cosmic timestamp
    function updateTimestamp() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timestampElement.textContent = `${hours}:${minutes}:${seconds} | DIMENSION-${Math.floor(Math.random() * 999)}`;
    }

    setInterval(updateTimestamp, 1000);
    updateTimestamp();

  /*  // Copy button functionality
    copyButton.addEventListener('click', () => {
        const text = copyText.textContent;
        if (text && text !== 'Copied!') {
            navigator.clipboard.writeText(text).then(() => {
                const originalText = text;
                copyText.textContent = 'Copied!';
                setTimeout(() => {
                    copyText.textContent = originalText;
                }, 2000);
            });
        }
    }); */

    // Handle portal interactions
    portals.forEach(portal => {
        portal.addEventListener('click', () => {
            const realm = portal.dataset.realm;
            
            if (realm === 'ethereal') {
                transitionToEtherealRealm();
            } else if (realm === 'void') {
                transitionToVoidRealm();
            } else if (realm === 'forbidden') {
                transitionToForbiddenRealm();
            }
        });
    });

    // Handle return button clicks
    returnButtons.forEach(button => {
        button.addEventListener('click', returnToMain);
    });

    // Ethereal Gateway
    function transitionToEtherealRealm() {
        mainContent.classList.add('hidden');
        etherealRealm.classList.remove('hidden');
        etherealRealm.querySelector('video').play();
        
        // Set Lord of the Realm personality
        setBotPersonality({
            name: 'Lord of the Realm',
            traits: ['mystical', 'wise', 'ethereal', 'enigmatic'],
            responseStyle: 'mystical and ethereal, speaking in riddles and cosmic metaphors',
            interests: ['cosmic energy', 'dimensional travel', 'ancient wisdom'],
            background: 'An ancient being who guards the ethereal gateway between dimensions',
            speechPatterns: ['speaks in cosmic metaphors', 'references ancient wisdom', 'uses ethereal terminology']
        });
        
        // Initialize chat
        initializeChat();
    }

    // Void Passage
    function transitionToVoidRealm() {
        mainContent.classList.add('hidden');
        voidRealm.classList.remove('hidden');
        voidRealm.querySelector('video').play();
        
        const warning = voidRealm.querySelector('.typing-text');
        warning.textContent = '';
        
        const text = "YOU CANNOT LOOK TOO LONG OR YOU WILL LOSE YOURSELF";
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                warning.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    warning.style.animation = 'fadeOut 1s forwards';
                    setTimeout(returnToMain, 1000);
                }, 2000);
            }
        }
        
        typeWriter();
    }

    // Forbidden Realm
    function transitionToForbiddenRealm() {
        mainContent.classList.add('hidden');
        forbiddenRealm.classList.remove('hidden');
        forbiddenRealm.querySelector('video').play();
        
        const passwordPrompt = forbiddenRealm.querySelector('.password-prompt');
        const passwordInput = forbiddenRealm.querySelector('.realm-password');
        const passwordError = forbiddenRealm.querySelector('.password-error');
        const forbiddenContent = forbiddenRealm.querySelector('.forbidden-content');
        
        passwordPrompt.classList.remove('hidden');
        forbiddenContent.classList.add('hidden');
        passwordError.classList.add('hidden');
        passwordInput.value = '';
        
        // Handle password input Enter key
        passwordInput.addEventListener('keydown', handlePasswordKeydown);
        
        setTimeout(() => {
            passwordInput.focus();
        }, 100);
    }

    function handlePasswordKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkPassword();
        }
    }

    function checkPassword() {
        const passwordInput = forbiddenRealm.querySelector('.realm-password');
        const passwordPrompt = forbiddenRealm.querySelector('.password-prompt');
        const passwordError = forbiddenRealm.querySelector('.password-error');
        const forbiddenContent = forbiddenRealm.querySelector('.forbidden-content');
        
        if (passwordInput.value === FORBIDDEN_PASSWORD) {
            passwordPrompt.classList.add('hidden');
            forbiddenContent.classList.remove('hidden');
            
            // Set Laughing Skull personality
            setBotPersonality({
                name: 'The Laughing Skull',
                traits: ['chaotic', 'malevolent', 'twisted', 'darkly humorous'],
                responseStyle: 'dark and twisted, with a hint of chaotic humor',
                interests: ['chaos', 'forbidden knowledge', 'dark secrets'],
                background: 'A malevolent entity that dwells in the forbidden realm, keeper of dark secrets',
                speechPatterns: ['speaks with dark humor', 'makes ominous references', 'uses twisted metaphors']
            });
            
            // Initialize evil chat
            initializeChat();
            
            // Remove the event listener
            passwordInput.removeEventListener('keydown', handlePasswordKeydown);
        } else {
            passwordError.classList.remove('hidden');
            passwordInput.value = '';
            setTimeout(() => {
                passwordInput.focus();
            }, 100);
        }
    }

    // Handle password form submission
    const passwordForm = document.getElementById('password-form');
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkPassword();
    });

    // Return to main page
    function returnToMain() {
        const activeRealm = document.querySelector('.realm:not(.hidden)');
        if (activeRealm) {
            activeRealm.classList.add('hidden');
            const video = activeRealm.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            const warningText = activeRealm.querySelector('.typing-text');
            if (warningText) {
                warningText.textContent = '';
                warningText.style.animation = '';
            }
            // Clear chat messages
            const chatMessages = document.querySelectorAll('.chat-messages');
            chatMessages.forEach(container => {
                container.innerHTML = '';
            });
        }
        mainContent.classList.remove('hidden');
    }

    // Add escape key functionality
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            returnToMain();
        }
    });

    // Initialize chat event listeners
    const chatInput = document.getElementById('chatInput');
    const evilChatInput = document.getElementById('evilChatInput');
    const sendButton = document.getElementById('sendButton');
    const evilSendButton = document.getElementById('evilSendButton');

    function handleSend(input) {
        if (input.value.trim()) {
            handleSendMessage(input.value.trim());
            input.value = '';
        }
    }

    if (chatInput && sendButton) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(chatInput);
            }
        });
        sendButton.addEventListener('click', () => handleSend(chatInput));
    }

    if (evilChatInput && evilSendButton) {
        evilChatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(evilChatInput);
            }
        });
        evilSendButton.addEventListener('click', () => handleSend(evilChatInput));
    }
});
