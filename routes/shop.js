const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'rootroot',
  database: 'maddy_shop'
});

// Get all shop items
router.get('/shop', (req, res) => {
    connection.query('SELECT * FROM shop_items', (err, results) => {
      if (err) {
        console.error('Error fetching shop items:', err);
        return res.status(500).json({ error: 'Error fetching shop items' });
      }
      console.log('Fetched shop items:', results);
      res.json(results);
    });
  });

// Add item to cart
router.post('/cart', (req, res) => {
  const { item_id, quantity } = req.body;
  connection.query(
    'INSERT INTO cart_items (item_id, quantity) VALUES (?, ?)',
    [item_id, quantity],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Item added to cart' });
    }
  );
});

// Get cart items
router.get('/cart', (req, res) => {
  connection.query(
    'SELECT cart_items.id, shop_items.name, shop_items.price, cart_items.quantity FROM cart_items INNER JOIN shop_items ON cart_items.item_id = shop_items.id',
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

module.exports = router;
