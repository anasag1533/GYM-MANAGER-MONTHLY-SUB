const express = require('express');

const router = express.Router();

const {list,create,remove,update,getCount} = require('../controllers/notification')


router.get('/list',list);

router.post('/create',create);

router.delete('/remove/:id',remove);

router.put('/update',update);

router.get('/get/count',getCount);



module.exports = router;