import {Router, Request, Response} from 'express';
import {LOGIN,REGISTER} from "../controllers/userController" 

const router = Router();

router.post('/login', LOGIN)

router.post('/register', REGISTER)

export default router;