const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'));


// USER MODEL

const UserSchema = new mongoose.Schema({

    name:String,

    email:String,

    password:String,

    role:{
        type:String,
        default:"user"
    }

});

const User = mongoose.model('User', UserSchema);


// CAMPAIGN MODEL

const CampaignSchema = new mongoose.Schema({

    title:String,

    description:String,

    goal:Number,

    raised:{
        type:Number,
        default:0
    },

    donations:[
        {
            donorName:String,
            amount:Number
        }
    ]

});

const Campaign = mongoose.model(
    'Campaign',
    CampaignSchema
);


// SIGNUP

app.post('/signup', async(req, res) => {

    const { name, email, password } = req.body;

    let role = "user";

    if(email === "admin@gmail.com"){

        role = "admin";
    }

    const user = await User.create({

        name,
        email,
        password,
        role

    });

    res.json(user);
});


// LOGIN

app.post('/login', async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({

        email,
        password

    });

    if(!user){

        return res.status(400).json({
            message:"Invalid Credentials"
        });
    }

    res.json(user);
});


// CREATE CAMPAIGN

app.post('/campaign', async(req, res) => {

    const data = await Campaign.create(req.body);

    res.json(data);
});


// GET CAMPAIGNS

app.get('/campaigns', async(req, res) => {

    const data = await Campaign.find();

    res.json(data);
});


// DONATE

app.put('/donate/:id', async(req, res) => {

    const campaign = await Campaign.findById(
        req.params.id
    );

    campaign.raised += req.body.amount;

    campaign.donations.push({

        donorName:req.body.donorName,

        amount:req.body.amount

    });

    await campaign.save();

    res.json(campaign);
});


app.listen(5000, () => {

    console.log('Server Running');

});