// const session = require('express-session')

const login = (req, res) => {
  if (req.session.user) {
    res.redirect('/')
  } else if (req.session.true) {
    req.session.true = false
    res.render('user/home', { msg: req.session.invalid })
  } else {
    res.render('user/home')
  }
}

const logindata = (req, res) => {
  const email = 'nikhilrakeshh@gmail.com'
  const password = 123456
  if (email == req.body.email && password == req.body.password) {
    req.session.user = req.body.email
    res.redirect('/')
  } else {
    if (email != req.body.email && password != req.body.password) {
      req.session.invalid = 'incorrect password & email'
    } else if (email != req.body.email) {
      req.session.invalid = 'incorrect email'
    } else if (password != req.body.password) {
      req.session.invalid = 'incorrect password'
    }
    req.session.true = true
    res.redirect('/login')
 }}


// const logindata = (req, res) => {
//   if (users.length > 0) {
//     const user = users.find(user => user.email === req.body.email && user.password == req.body.password);
//     console.log(user);
//     req.session.user = req.body.email
//     res.redirect('/')
//   } else {
//     if (users.email != req.body.email &&  users.password  != req.body.password) {
//       req.session.invalid = 'incorrect password & email'
//     } else if (users.email != req.body.email) {
//       req.session.invalid = 'incorrect email'
//     } else if ( users.password  != req.body.password) {
//       req.session.invalid = 'incorrect password'
//     }
//     req.session.true = true
//     res.redirect('/login')
//  }}

const profile = (req, res) => {
  if (req.session.user) {
    const email = req.session.user
    res.render('user/nextpage', { email })
  } else {
    res.redirect('/login')
  }
}

const signup = (req,res)=>{
  res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.render('user/signup')

}


const logout = (req, res) => {
  console.log('destroy');
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
}



const users = [];

const signupdata = (req,res)=>{
 
  const email = req.body.semail
  const name = req.body.name
  const password = req.body.spassword
  const newUser = { name, email, password };
  users.push(newUser);
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.redirect('/login')

}



module.exports = {
  login,
  logindata,
  logout,
  profile,
  signup,
  signupdata,

}