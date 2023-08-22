const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'about.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);

// Route to get list of people
router.get('/about', (req, res) => {
  res.json(data);
});

function getAboutById(id) {
  return data.find((aboutItem) => aboutItem.id === id.toString());
}

// Route to get person by id
router.get('/about/:id', (req, res) => {
  const aboutId = req.params.id;
  const about = getAboutById(aboutId);

  if (about) {
    res.json(about);
  } else {
    res.status(404).json({ error: 'Info not found' });
  }
});

module.exports = router;
