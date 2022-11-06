const dotenv = require('dotenv')
dotenv.config({path:'config.env'})
const axios = require('axios')

exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get(process.env.RELEASE_ENV+'api/users')
        .then(function(response){
            res.render('index', { users : response.data , siteUrl : process.env.RELEASE_ENV})
        })
        .catch(err =>{
            res.send(err)
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user', { siteUrl : process.env.RELEASE_ENV})
}

exports.update_user = (req, res) =>{
    axios.get(process.env.RELEASE_ENV+'api/users', { params : { _id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data, siteUrl : process.env.RELEASE_ENV})
        })
        .catch(err =>{
            res.send(err);
        })
}