var mongoose = require('mongoose');
const validator = require('validator');

var gemSchema = new mongoose.Schema({
    name : {
        type : String
    },
    price : {
        type: Number
    },
    description : {
        type : String
    },
    canPurchase :{
        type : Boolean
    },
    reviews : [{
        stars : {
            type : Number,
           //required : true
        },
        body : {
            type : String,
            minlength : 1,
            //required : true
        },
        email:{
            type : String,
            //required : true,
            trim : true,
            minlength : 1,
            unique : true,
            validate:{
                validator : validator.isEmail,
                message : '{VALUE} is not a valid email.'
            }
        }
    }]
});

var gems = mongoose.model("gems",gemSchema);
module.exports = {gems};