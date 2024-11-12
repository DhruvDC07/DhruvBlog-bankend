const { userModel } = require('../model/user');
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    //test how its going   kjhuygtfc ,lkjhgfd
    
    let existingUser;
    try {
      existingUser = await userModel.findOne({ email });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Server Error' });
    }
    
    if (existingUser) {
      console.log("user already");
      return res.status(400).json({ message: 'User Already Exists! Login Instead' });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    try {
      await userModel.create({ name, email, password: hashedPassword });
      console.log('User added successfully!');
      res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
      console.log('Error occurred in sign up', error);
      res.status(400).json({ error: 'Server Error' });
    }
  };
  
  

const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server Error' });
  }
  if (!existingUser) {
    console.log("no user find");
    return res.status(404).json({ message: "Couldn't Find User By This Email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login Successful", user: existingUser });
};

const logout = async (req, res) => {
  console.log(req.cookies);
  res.cookie('jwt', '');
  res.status(200).send('Logout successful'); 
  console.log('Logout done from the backend side');
};

module.exports = {
  login,
  signup,
  logout
};
