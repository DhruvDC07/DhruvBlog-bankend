const express = require('express');
const app = express();
const { urlencoded, json } = require('express');
app.use(express.json())
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors=require('cors')
app.use(cors())
const { initDB } = require('./mongoDB.js');
const { login, signup, logout } = require('./controller/user');
const {
  getallblog,
  addblog,
  updateblog,
  deletblog,
  getById,
  getByUserId,
} = require('./controller/blog');

// Load environment variables
dotenv.config();

// Set up body parser and cookie parser middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

// Initialize the database connection
initDB();

// Set up routes for authentication
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);

// Set up routes for blog management
app.get('/', getallblog);
app.post('/add', addblog); 
app.put('/update/:id', updateblog);
app.get('/:id', getById);
app.delete('/:id', deletblog);
app.get('/user/:id', getByUserId);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
