const express = require('express');

const app = express();

require('dotenv/config')

const port  = process.env.PORT;

const morgan = require('morgan');

const bodyParser = require('body-parser');

const  cookieParser = require('cookie-parser');

const {body,validationResult} = require('express-validator');

const cors = require('cors')

const mongoose = require('mongoose');

const authRoutes = require('./routes/auth')

const membershipRoutes = require('./routes/memberships')

const notificationRoutes = require('./routes/notifications')

const ownerRoutes = require('./routes/owner');

const subsRoutes = require('./routes/subs');


app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/uploads',express.static('uploads'));

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));

app.use('/api/user',authRoutes);

app.use('/api/membership',membershipRoutes);

app.use('/api/notification',notificationRoutes);

app.use('/api/owner',ownerRoutes);

app.use('/api',subsRoutes);

app.listen(port,()=>{
    console.log('server live at port ' + port)
})

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE,{dbName:'gym-manager-database'})
.then(()=> console.log('Connected to the database'));


