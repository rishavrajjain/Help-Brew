const mongoose = require('mongoose');


const resourceSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    contactNo:{
        type:String,
    },
    location:{
        type:String
    },
    owner:{
        type:String
    },
    details:{
        type:String
    },
    tags:[],
    available:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const Resource = new mongoose.model('Resource',resourceSchema);
module.exports = Resource;