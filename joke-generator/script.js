// Joke Generator Application
// Uses the Official Joke API (https://official-joke-api.appspot.com/)

const API_URL = 'https://official-joke-api.appspot.com/random_joke';

const elements = {
    getJokeBtn: document.getElementById('getJokeBtn'),
    shareBtn: document.getElementById('shareBtn'),
    jokeText: document.getElementById('jokeText'),
    jokeType: document.getElementById('jokeType'),
    loader: document.getElementById('loader'),
    errorMessage: document.getElementById('errorMessage'),
    jokeCount: document.getElementById('jokeCount')
};

let jokeCounter = 0;
let currentJoke = null;

// Initialize event listeners
elements.getJokeBtn.addEventListener('click', fetchJoke);
elements.shareBtn.addEventListener('click', shareJoke);

/**
 * Fetch a random joke from the API
 */
async function fetchJoke() {
    try {
        // Show loading state
        setLoadingState(true);
        clearError();
        elements.shareBtn.disabled = true;
        
        // Fetch joke from API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const joke = await response.json();
        currentJoke = joke;
        
        // Display the joke
        displayJoke(joke);
        
        // Increment counter
        jokeCounter++;
        elements.jokeCount.textContent = jokeCounter;
        
        // Enable share button
        elements.shareBtn.disabled = false;
        
    } catch (error) {
        console.error('Error fetching joke:', error);
        showError('Failed to load joke. Please try again!');
        currentJoke = null;
        elements.shareBtn.disabled = true;
    } finally {
        setLoadingState(false);
    }
}

/**
 * Display the joke on the page
 * @param {Object} joke - Joke object from API
 */
function displayJoke(joke) {
    if (joke.type === 'single') {
        // Single-line joke
        elements.jokeType.textContent = 'Joke';
        elements.jokeText.textContent = joke.joke;
    } else {
        // Two-part joke (setup/delivery)
        elements.jokeType.textContent = 'Setup';
        elements.jokeText.textContent = joke.setup;
        
        // Show punchline after delay
        setTimeout(() => {
            elements.jokeType.textContent = 'Punchline';
            elements.jokeText.textContent = joke.delivery;
        }, 3000);
    }
}

/**
 * Share the current joke
 */
function shareJoke() {
    if (!currentJoke) return;
    
    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else {
        jokeText = `${currentJoke.setup}\n${currentJoke.delivery}`;
    }
    
    const shareMessage = `😂 Check out this joke!\n\n${jokeText}\n\nGenerated with Joke Generator`;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Check out this joke!',
            text: shareMessage
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        copyToClipboard(shareMessage);
    }
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccess('Joke copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showError('Failed to copy to clipboard');
    });
}

/**
 * Set loading state
 * @param {boolean} isLoading - Loading state
 */
function setLoadingState(isLoading) {
    if (isLoading) {
        elements.loader.classList.add('active');
        elements.getJokeBtn.disabled = true;
        elements.jokeText.textContent = 'Loading...';
        elements.jokeType.textContent = 'Please wait';
    } else {
        elements.loader.classList.remove('active');
        elements.getJokeBtn.disabled = false;
    }
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.add('show');
}

/**
 * Show success message
 * @param {string} message - Success message
 */
function showSuccess(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.add('show');
    elements.errorMessage.style.background = 'rgba(39, 174, 96, 0.1)';
    elements.errorMessage.style.color = '#27ae60';
    
    setTimeout(() => {
        elements.errorMessage.classList.remove('show');
        elements.errorMessage.style.background = '';
        elements.errorMessage.style.color = '';
    }, 3000);
}

/**
 * Clear error message
 */
function clearError() {
    elements.errorMessage.classList.remove('show');
}

// Load initial joke on page load
window.addEventListener('load', () => {
    // You can optionally auto-load a joke
    // fetchJoke();
});