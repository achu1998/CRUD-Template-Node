var Userdb = require('../model/model')
const fs = require('fs');

// create and save new user
exports.create = (req,res, next)=>{
    // validate request
    const files = req.files;

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }
    
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"})
        return
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })
    
    if(typeof files !== "undefined") {
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)
    
            return encode_image = img.toString('base64')
        })
    
        let result = imgArray.map((src, index) => {
    
            // create object to store data in the collection
            user.filename = files[index].originalname,
            user.contentType = files[index].mimetype,
            user.imageBase64 = src

        });

    }


    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/')
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            })
        })

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(Object.keys(req.query).length !== 0){
        const query = req.query

        Userdb.find(query)
            .then(data =>{
                if(Object.keys(data).length === 0){
                    res.status(404).send({ message : "Not found user "})
                }else{
                    res.send(data[0])
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user"})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    let param = req.body
    const files = global["files"]

    if(typeof files !== "undefined") {
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)
    
            return encode_image = img.toString('base64')
        })
    
        let result = imgArray.map((src, index) => {
    
            // create object to store data in the collection
            param["filename"] = files[index].originalname,
            param["contentType"] = files[index].mimetype,
            param["imageBase64"] = src

        });
        delete global["files"]
    }
    
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, param, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

exports.uploadImage = (req,res,next)=>{
    const files = req.files;
    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }
    global["files"] = files
}