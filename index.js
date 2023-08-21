const express = require('express');
const cors = require('cors');
const homeRoutes = require('./routes/home'); 
const aboutRoutes = require('./routes/about');
const videoRoutes = require('./routes/video');
const shopRoutes = require('./routes/shop');
const app = express();
const PORT = 8090;

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use('/', homeRoutes); 
app.use('/', aboutRoutes);
app.use('/', videoRoutes);
app.use('/', shopRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

