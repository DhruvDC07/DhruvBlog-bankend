let {userModel} = require('../model/user')
let {blogModel} = require('../model/blog')

let getallblog = async (req, res) => {
  try {
    let blogs = await blogModel.find().populate("user");
    if (!blogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
 // test 1 

let addblog = async(req,res)=>{
    const { title, description, user } = req.body;

    let existingUser;
    
    try {
      existingUser = await userModel.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      console.log("user not found");
      return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    try {
      const blog = await blogModel.create({
        title,
        description,
        user,
      });
      existingUser.blogs.push(blog);
      await existingUser.save();
      return res.status(200).json({ blog });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
};




//test synchronization
// hello world
let updateblog = async(req,res)=>{
    const { title, description } = req.body;
    const blogId = req.params.id;
    console.log(blogId);
    let blog;
    try {
      blog = await blogModel.findByIdAndUpdate(blogId, {
        title,
        description,
      });
    } catch (err) {
      return console.log(err);
    }
    if (!blog) {
      return res.status(500).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ blog });
    
}

let deletblog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await blogModel.findByIdAndRemove(id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

 
let getById = async(req,res)=>{
    const id = req.params.id;
    let blog;
    try {
      blog = await blogModel.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
      }
      return res.status(200).json({ blog });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
}

let getByUserId = async(req,res)=>{
    const userId = req.params.id;
    let userBlogs;
    try {
      userBlogs = await userModel.findById(userId).populate("blogs");
      if (!userBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
      }
      return res.status(200).json({ user: userBlogs });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
}



module.exports={
    getallblog,
    addblog,
    updateblog,
    deletblog,
    getById,
    getByUserId
} 
