const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
router.use(bodyParser.json());

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'rootroot',
  database: 'maddy_shop'
});

// Route to fetch shop items
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

// Route to add an item to the shopping cart
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

// Route to fetch items from the shopping cart
router.get('/cart', (req, res) => {
  connection.query(
    'SELECT cart_items.id, shop_items.name, shop_items.price, cart_items.quantity FROM cart_items INNER JOIN shop_items ON cart_items.item_id = shop_items.id',
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Route to delete all items from the shopping cart
router.delete('/cart', (req, res) => {
  connection.query('DELETE FROM cart_items', (err, result) => {
    if (err) {
      console.error('Error deleting items from cart:', err);
      return res.status(500).json({ error: 'Error deleting items from cart' });
    }
    res.json({ message: 'All items removed from cart' });
  });
});

module.exports = router;
