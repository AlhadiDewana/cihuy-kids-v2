const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('build'));

// API Routes
app.get('/api/content', (req, res) => {
  // Example premium content data
  const premiumContent = [
    {
      id: 1,
      title: 'Adventure Story',
      type: 'story',
      imageUrl: '/images/adventure.jpg'
    },
    // Add more content items
  ];
  
  res.json(premiumContent);
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});