const db = require('../database');
var path = require('path');


exports.getSignupPage = (req, res) => {
    
    
    res.sendFile(path.resolve('public/signup.html'));
  };
  

exports.signup = (req, res) => {
  console.log(req.body,"signup")
  const { username, password, email, mobileno } = req.body;

  const insertQuery = 'INSERT INTO users (username,password,email,mobileno) VALUES (?, ?, ?,?)';
  const values = [username, password, email, mobileno];

  db.run(insertQuery, values, function (error) {
    if (error) {
      console.error('Error storing user details:', error);
      return console.log("insert");
    }

    console.log("user detail submitted");
    res.sendFile(path.resolve('public/login.html'));
  });
};

exports.getLoginPage = (req, res) => {
    res.sendFile(path.resolve('public/login.html'));
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const selectQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [email, password];
  console.log(req.body.email)

  db.get(selectQuery, values, (error, row) => {
    if (error) {
      console.error('Error retrieving user details:', error);
      return;
    }

    if (!row) {
      console.log('Invalid email or password');
      return;
    }

   

    // const token = jwt.sign({ user_id: row.user_id }, 'shantanu', { expiresIn: '1h' });
    const user_id=row.user_id
    console.log(user_id,"userid")
    
    req.session.user_id = user_id;


    console.log('Login successful');
  
    renderHome(res,user_id)
  });
};

function renderHome(res,user_id){
  const selectQuery = 'SELECT * FROM candidates';
  db.all(selectQuery, (error, rows) => {
    if (error) {
      console.error('Error retrieving candidate details:', error);
      return;
    }
    console.log(rows)

    res.render('home', { candidates: rows, is_voted: false,user:user_id});
  });
}


exports.getHomePage = (req, res) => {
  const user_id=req.session.user_id
  renderHome(res,user_id)
};


exports.logout=('/logout', (req, res) => {
  // Clear the user from the session
  req.session.user = null;

  // Redirect the user to the home page or any other desired page
  res.redirect('/login');
});

