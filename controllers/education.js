import { Education } from "../models/education.js"
import { UserModel } from "../models/user.js"
import { educationSchema } from "../schemas/schema.js";



  // Add Education

  export const addEducation = async ( req, res, next ) => {
    try {
      const { error, value } =educationSchema.validate({  
        ...req.body,
        image: req.file.filename});
      // if (error) {
      //   return res.status(400).send(error.details[0].message);
      // }

    //then, find the user with the id that user passed when adding the education
    console.log('userId',req.session.user.id)
    const userSessionId = req.session.user.id
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }

    //create education with the value
    const education = await Education.create({...value, user:userSessionId});
    //if you find the user, push the education id you just created inside
    user.education.push(education._id);

    //and save the user now with the educationId
    await user.save();

    //return the education
    res.status(201).json({ education });
  } catch (error) {
    next(error);
  }
};



 // Get all Education
  export const getEducationList  = async (req, res, next) => {

try {
  //we are fetching education that belongs to a particular user
  const userSessionId = req.session.user.id
  const aleducation = await Education.find({ user: userSessionId });
  // if (aleducation.length == 0) {
  //   return res.status(404).send({message: "No education added"});
  // }
  res.status(200).json({ education: aleducation });
} catch (error) {
  next(error);
}
};




// Get an Educational record by ID
export const getEducation =  async (req, res,next) => {
  try {
      const getEducation =await Education.findById(req.params.id);
      res.status(200).json(getEducation);
  } catch (error) {
      next(error);
  }
};
  



  // Update Education

export const patchEducation = async (req, res, next) => {
  try {
    const { error, value } = educationSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id; 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }

    const Education = await Education.findByIdAndUpdate(req.params.id, value, { new: true });
      if (!Education) {
          return res.status(404).send({message: "Education not found"});
      }

    res.status(201).json({ Education });
  } catch (error) {
    next(error)
    // return res.status(500).json({error})
  }
};



  
  //Delete Education
 
  export const deletedEducation = async (req, res, next) => {    
  try {
     
    const userSessionId = req.session.user.id; 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }

    const education = await Education.findByIdAndDelete(req.params.id);
      if (!education) {
          return res.status(404).send({message: "Education not found"});
      }

      user.education.pull(req.params.id);
      await user.save();
    res.status(200).json({message: "Education deleted"});
  } catch (error) {
    next(error)
  }
};