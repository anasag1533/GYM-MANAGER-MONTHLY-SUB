const express = require('express');

const router = express.Router();

const {list,create,remove,update,requireSignin,membershipById,listSearch,findMembership} = require('../controllers/membership')


router.get('/list',list)

router.post('/create',create)

router.delete('/remove/:id',remove)

router.get('/update/:id',membershipById)

router.get('/search',listSearch)

router.post('/validate',findMembership);


module.exports = router;