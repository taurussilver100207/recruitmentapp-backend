import express from 'express';
import { sendMail } from '../controllers/sendMail.js';
const emailRoute = express.Router();

emailRoute.post('/sendEmail', sendMail);

export default emailRoute;
