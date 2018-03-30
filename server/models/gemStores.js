var mongoose = require('mongoose');
const validator = require('validator');

var gemStoreSchema = new mongoose.Schema({
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
    images : {
        type : String
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
        author:{
            type : String,
            //required : true,
            trim : true,
            minlength : 1,
            //unique : true,
            validate:{
                validator : validator.isEmail,
                message : '{VALUE} is not a valid email.'
            }
        }
    }]
});

var gemStores = mongoose.model("gemStore",gemStoreSchema);
module.exports = {gemStores};