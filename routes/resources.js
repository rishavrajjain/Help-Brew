const express = require('express');
const router = express.Router();

const Resource = require('../models/resource');
const User = require('../models/user');
const auth = require('../middleware/auth');


router.get('/resources',async(req,res)=>{
    const skip= +(req.query.skip || '0')//Parsing it to a number
    const limit = +(req.query.limit || '0')

    try{
        const resources = await Resource.find({},'title createdAt contactNo location tags available').limit(limit).skip(skip).sort({
            'createdAt':-1
        })
        const totalResources = await Resource.count({});
        res.status(200).json({
            data:resources,
            count:totalResources
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.get('/resource/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const resource = await Resource.findOne({_id:id});
        res.status(200).json({
            data:resource
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.post('/resource/add',auth,async(req,res)=>{
    try{
        const resource = new Resource(req.body);
        resource.tags = resource.tags[0].split(",");
        resource.owner = req.user._id.toString();
        await resource.save();
        req.user.resources.push(resource._id.toString());
        res.status(200).json({
            data:resource
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.patch('/resource/:id',auth,async(req,res)=>{
    const id = req.params.id;
    try{
        const resource = await Resource.findOne({_id:id});
       

        resource.title = req.body.title;
        resource.details = req.body.details;
        resource.contactNo = req.body.contactNo;
        resource.location = req.body.location;
        resource.tags = req.body.tags;
        resource.available = req.body.available;
        await resource.save();

        res.status(200).json({
            data:resource
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})

router.delete('/resource/:id',auth,async(req,res)=>{
    const id = req.params.id;
    try{
        const resource = await Resource.findOne({_id:id});
 

        if(!resource){
            res.status(404).json({
                data:{
                    message:'Resource not found'
                }
            })
        }

        await Resource.findByIdAndDelete({_id:id});

        res.status(200).json({
            data:{
                message:'Resource Deleted'
            }
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
    }
})



router.get('/search',async(req,res)=>{
    const skip= +(req.query.skip || '0')//Parsing it to a number
    const limit = +(req.query.limit || '0')
    const tag = req.query.tag;
    console.log(tag)
    
    try {
        const resources = await Resource.find({tags:tag.toString()},'title createdAt contactNo location tags available').skip(skip).limit(limit).sort({
          'createdAt':-1
        })
    
        res.status(200).json({
          data:resources
        })
      } catch (err) {
        console.log(err);
        res.status(500).json({
            data:{
                message:'Something went wrong.Please try again'
            }
        })
      }
})



module.exports = router;