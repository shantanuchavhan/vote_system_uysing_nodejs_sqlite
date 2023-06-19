const db = require('../database');

exports.getAdminPage = (req, res) => {
  console.log("admin")
  const selectQuery = 'SELECT * FROM candidates';
  db.all(selectQuery, (error, rows) => {
    if (error) {
      console.error('Error retrieving candidate details:', error);
      return;
    }
    

    console.log(rows)

    res.render('admin', { candidates: rows,isLoggedIn:req.session.user_id });
  });
};
