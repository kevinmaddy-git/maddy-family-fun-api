const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'home.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);

// Function to get home section by its id
function getHomeById(id) {
  return data.find((homeItem) => homeItem.id === id.toString());
}

// Route to get home section by id
router.get('/home/:id', (req, res) => {
  const homeId = req.params.id;
  const home = getHomeById(homeId);

  if (home) {
    res.json(home);
  } else {
    res.status(404).json({ error: 'Info not found' });
  }
});

module.exports = router;
