const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'video.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);

function getVideoById(id) {
  return data.find((videoItem) => videoItem.id === id.toString());
}

// Route to get video by id
router.get('/video/:id', (req, res) => {
  const videoId = req.params.id;
  const video = getVideoById(videoId);

  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

module.exports = router;
