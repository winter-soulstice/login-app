import express from 'express';
import Controller from '../controller/controller';


const router = express.Router();

router.post('/register', Controller.registerUser);
router.post('/login', Controller.loginUser);


module.exports = router;
