const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'shop.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);


function getshopById(id) {
  return data.find((shopItem) => shopItem.id === id.toString());
}

// Route to get item by id
router.get('/shop/:id', (req, res) => {
  const shopId = req.params.id;
  const shop = getshopById(shopId);

  if (shop) {
    res.json(shop);
  } else {
    res.status(404).json({ error: 'Info not found' });
  }
});

module.exports = router;