import express from 'express'

const router = express.Router();


import {register,login,uploadSchedule,getLatestUploadImage} from '../controllers/owner'



router.post('/register',register);
router.post('/login',login);
router.post('/upload/schedule',uploadSchedule);
router.get('/upload/latest',getLatestUploadImage);

module.exports = router;