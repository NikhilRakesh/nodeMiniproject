var express = require('express');
var router = express.Router();
const usercontroller=require('../controller/usercontroller');
const noCacheMiddleware = (req, res, next) => {
    console.log('cache 2');
      res.setHeader('Cache-Control', 'no-store,private');
      next();
    };

/* GET users listing. */

router.get('/login',noCacheMiddleware,usercontroller.login)
router.post('/login',usercontroller.logindata)
router.get('/logout',usercontroller.logout)
router.get('/',usercontroller.profile)
router.get('/signup',noCacheMiddleware,usercontroller.signup)
router.post('/signup',noCacheMiddleware,usercontroller.signupdata)





module.exports = router;
