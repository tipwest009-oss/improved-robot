# Random Joke Generator 😂

A fun and interactive web application that fetches random jokes from the Official Joke API.

## Features

✨ **Key Features:**
- Fetch random jokes from a public API
- Support for single-line and two-part jokes (setup/punchline)
- Automatic punchline reveal after 3 seconds for two-part jokes
- Share jokes using native share API or copy to clipboard
- Track number of jokes loaded
- Responsive design for mobile and desktop
- Beautiful gradient UI with smooth animations
- Error handling and loading states

## Technology Stack

- **HTML5** - Markup structure
- **CSS3** - Styling with animations and gradients
- **JavaScript (ES6+)** - Core functionality
- **Official Joke API** - Random joke data source

## API Used

This project uses the [Official Joke API](https://official-joke-api.appspot.com/)

**Endpoint:** `https://official-joke-api.appspot.com/random_joke`

**Response Format:**
```json
{
  "type": "general",
  "setup": "Why don't scientists trust atoms?",
  "delivery": "Because they make up everything!",
  "id": 1
}
```

Or for single-line jokes:
```json
{
  "type": "single",
  "joke": "Why did the scarecrow win an award?",
  "id": 2
}
```

## How to Use

1. **Open the application** - Open `index.html` in your web browser
2. **Get a joke** - Click the "Get New Joke" button
3. **View the punchline** - Wait 3 seconds for the punchline to appear (for two-part jokes)
4. **Share the joke** - Click "Share" to share via social media or copy to clipboard
5. **Track jokes** - See how many jokes you've loaded

## Project Structure

```
joke-generator/
├── index.html      # HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Features Explained

### 1. Joke Fetching
```javascript
const response = await fetch(API_URL);
const joke = await response.json();
```

### 2. Two-Part Joke Handling
- Setup and delivery are displayed with a 3-second delay
- Creates anticipation for the punchline

### 3. Share Functionality
- Uses Web Share API when available
- Fallback to clipboard copy for older browsers

### 4. Error Handling
- Try-catch blocks for API failures
- User-friendly error messages
- Loading states to prevent multiple simultaneous requests

### 5. Responsive Design
- Mobile-first approach
- Flexbox layout
- Media queries for different screen sizes

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Add joke category filtering
- [ ] Implement joke search functionality
- [ ] Add favorite jokes storage
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts (spacebar to get new joke)
- [ ] Sound effects and animations
- [ ] Multiple language support
- [ ] Joke rating system

## License

MIT License - Feel free to use and modify

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Resources

- [Official Joke API Documentation](https://official-joke-api.appspot.com/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)

---

Enjoy the laughs! 😄