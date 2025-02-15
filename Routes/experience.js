import { Router } from "express";
import { allExperience, getExperience, addExperience, patchExperience, deletedExperience } from "../controllers/experience.js";
import { checkUserSession } from "../middleware/auth.js";

// Create a Router
const experienceRouter = Router();

// get an experience record
experienceRouter.get('/users/experiences', checkUserSession, allExperience);


// Add  an experience record
experienceRouter.post('/users/experiences', checkUserSession, addExperience);

//update/ patch 
experienceRouter.patch('/users/experiences/:id', checkUserSession, patchExperience);

// Delete
experienceRouter.delete('/users/experiences/:id', checkUserSession, deletedExperience);

// a method that will Get an experience by ID
experienceRouter.get('/users/experiences/:id', getExperience);



// Export router
export default experienceRouter;