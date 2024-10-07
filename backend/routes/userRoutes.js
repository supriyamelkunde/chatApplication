import express from 'express';
import { register, login } from '../controller/userController.js'; // Make sure these functions are defined

const router = express.Router();

router.post('/register', register); // Define the register route
router.post('/login', login); // Define the login route

export default router; // Export the router
