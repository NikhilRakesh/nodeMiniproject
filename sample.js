
const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};

function noCache(req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next(); 
}

app.use(noCache);

app.get('/login', (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/');
  }
  res.render('login', { message: '' });
});

app.post('/login', noCache, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('login', { message: 'Enter all fields' });
  }

  if (email === predefinedEmail && password === predefinedPassword) {
    req.session.isLoggedIn = true;
    return res.redirect('/dashboard'); // Redirect after successful login
  } else if (email !== predefinedEmail && password !== predefinedPassword) {
    return res.render('login', { message: 'Incorrect email and password' });
  } else if (email !== predefinedEmail) {
    return res.render('login', { message: 'Incorrect email' });
  } else {
    return res.render('login', { message: 'Invalid Password' });
  }
});

app.get('/dashboard', noCache, isLoggedIn, (req, res) => {
  res.render('dashboard'); // Modify this according to your actual dashboard route
});

app.get('/logout', noCache, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000...`);
});