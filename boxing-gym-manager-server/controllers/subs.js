import Owner from '../models/owner'

const stripe = require('stripe')(process.env.STRIPE_SECRET)

export const prices = async(req,res) => {

    const prices = await stripe.prices.list();
    console.log(prices);
    res.json(prices.data.reverse());

}

export const createSubscription = async(req,res) => {

    //console.log(JSON.stringify(req.body.user))
    try
    {   
        const userId = req.body.user._id;
        const user = await Owner.findById(userId);

        const session = await stripe.checkout.sessions.create({
            mode:'subscription',
            payment_method_types:["card"],
            line_items:[{
                price:req.body.priceId,
                quantity:1
            }],
            customer : user.stripe_customer_id,
            success_url:process.env.STRIPE_SUCCESS_URL,
            cancel_url:process.env.STRIPE_CANCEL_URL
        });

        console.log(user);

        console.log('Checkout session ' , session);
        res.json(session.url);

    }
    catch (err)
    {
        console.log(err);
    }

}
export const subscriptionStatus = async (req,res) => {
    try
    {   
        console.log(JSON.stringify(req.body))
        const userId = req.body.user._id;
        const owner = await Owner.findById(userId);

        const subscriptions = await stripe.subscriptions.list({
            customer:owner.stripe_customer_id,
            status:'all',
            expand:["data.default_payment_method"]
        });

        const updated = await Owner.findByIdAndUpdate(
            owner._id,
            {
                subscriptions:subscriptions.data
            },
            {new:true}
        )
        res.json(updated);
    }
    catch(err)
    {
        console.log(err)
    }
}

export const subscriptions = async(req,res) => {
    try
    {   
        console.log(JSON.stringify(req.body))
        const userId = req.body.user._id;

        const user = await Owner.findById(userId);

        console.log("STRIPE CUSTOMER ID : " , user.stripe_customer_id)

        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripe_customer_id,
            status:"all",
            expand:["data.default_payment_method"]
        })

        res.json(subscriptions);
    }
    catch(err)
    {
        console.log(err);
    }
}


export const customerPortal = async(req,res) => {
    try
    {
        const userId = req.body.user._id;

        const user = await Owner.findById(userId);
        const portalSession = await stripe.billingPortal.sessions.create({
            customer:user.stripe_customer_id,
            return_url:process.env.STRIPE_SUCCESS_URL
        });
        res.json(portalSession.url)
    }
    catch(err)
    {
        console.log(err);
    }
}