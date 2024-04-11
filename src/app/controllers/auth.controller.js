const User = require('../models/user.model');

class AuthController {
    register(req,res,next){

    }
    login(req,res,next) {
       res.send(req.body);
    }
    showLoginForm(req,res,next){
        res.render('auth/Login/login')
    }
}

module.exports = new AuthController();