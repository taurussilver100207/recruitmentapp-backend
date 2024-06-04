import express from 'express';
import { sendMail, getEmailPreview } from '../controllers/sendMail.js';

const emailRoute = express.Router();

emailRoute.post('/sendEmail', sendMail);
emailRoute.post('/getEmailPreview', getEmailPreview);

export default emailRoute;
