
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register 
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if(existingUser){
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Check the user count before creating a new user:
  const userCount = (await User.countDocuments({})) === 0;

  // Create a new user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: userCount ? "admin" : "user";
  })

  res.status(201).json({
    success: true,
    message: "User created successfully"
  });
  
}


// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // compare password:
  if( user && (await bcrypt.compare(password, user.password))){
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d"}
    )

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })    
    
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

}




