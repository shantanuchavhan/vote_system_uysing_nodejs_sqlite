
const db = require('../database');
const path = require('path');

exports.vote = (req, res) => {
  const user_id = req.session.user_id;
  const { candidate_id } = req.body;

  // Check if the user has already voted
  const selectQuery = 'SELECT is_voted FROM users WHERE user_id = ?';
  db.get(selectQuery, [user_id], (error, row) => {
    if (error) {
      console.error('Error retrieving user details:', error);
      return;
    }

    if (row && row.is_voted) {
      console.log('User has already voted');
      return res.send('You have already voted.');
    }

    // Update the vote count for the selected candidate
    db.run('UPDATE candidates SET vote_count = vote_count + 1 WHERE candidate_id = ?', [candidate_id], function (error) {
      if (error) {
        console.error('Error updating vote count:', error);
        return;
      }

      // Update the is_voted status for the user
      db.run('UPDATE users SET is_voted = 1 WHERE user_id = ?', [user_id], function (error) {
        if (error) {
          console.error('Error updating user vote status:', error);
          return;
        }

        console.log('Vote recorded successfully');
        res.sendFile(path.resolve('public/thankyou.html'));
      });
    });
  });
};

