import { Router } from "express";
import { allEducation, addEducation, patchEducation, deletedEducation, getEducation } from "../controllers/education.js";
import { checkUserSession } from "../middleware/auth.js";


// Create a Router
const educationRouter = Router();

// get an Education record
educationRouter.get('/users/education/:id',checkUserSession, allEducation);


// Add  all Education record
educationRouter.post('/users/education', checkUserSession, addEducation);

//update/ patch 
educationRouter.patch('/users/education/:id',checkUserSession, patchEducation);

// Delete
educationRouter.delete('/users/education/:id', checkUserSession, deletedEducation);

// a method that will Get a all Education records
educationRouter.get('/users/education',checkUserSession, getEducation);



// Export router
export default educationRouter;