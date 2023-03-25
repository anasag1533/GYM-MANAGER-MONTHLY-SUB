import express from 'express'

const router = express.Router();



import {
    prices,
    createSubscription,
    subscriptionStatus,
    subscriptions,
    customerPortal
} from '../controllers/subs'

import {requireSignin} from '../middlewares'

router.get('/prices',prices)
router.post('/create-subscription',requireSignin, createSubscription);
router.post('/subscription-status',requireSignin,subscriptionStatus);
router.post('/subscriptions',requireSignin,subscriptions);
router.post('/customer-portal',requireSignin,customerPortal)


module.exports = router;