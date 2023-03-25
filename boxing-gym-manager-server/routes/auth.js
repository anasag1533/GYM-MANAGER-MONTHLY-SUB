const express = require('express');

const router = express.Router();


const { signUp,signIn,getCount,userById,list,remove,listSearch,listSearchMember } = require('../controllers/auth')

const { userSignupValidator } = require('../validator')


router.post('/signup',signUp)

router.post('/signin',signIn)

router.post('/get/count',getCount)

router.get('/get/:id',userById)

router.get('/list',list)

router.delete('/delete/:id',remove)

router.get('/search',listSearch)



module.exports = router;