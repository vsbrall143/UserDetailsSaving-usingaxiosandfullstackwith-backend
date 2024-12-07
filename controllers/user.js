const User=require('../models/User')

exports.getUsers= async (req, res, next) => {
  const users = await User.findAll();
  // console.log(users);
  res.status(200).json({allUsers: users});
 }

 exports.postUser = async(req,res,next)=>{
  const username=req.body.username;
  const email=req.body.email;
  const phone=req.body.phone;
  const data=await User.create({username: username, email: email, phone:phone});
  res.status(201).json({newUserDetails:data});
  
 }

 exports.deleteUser =  async (req, res, next) => {
  try {
    // Extract and validate the prodId
    const prodId = parseInt(req.params.prodId, 10);
    if (isNaN(prodId)) {
      return res.status(400).json({ message: 'Invalid Product ID.' });
    }

    // Attempt to delete the user
    const result = await User.destroy({
      where: { id: prodId },
    });

    if (result) {
      res.status(200).json({ message: 'User deleted successfully!' });
    } else {
      res.status(404).json({ message: 'User not found!' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An error occurred while deleting the user.' });
  }
}