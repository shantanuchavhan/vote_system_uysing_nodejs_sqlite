const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Create the users table and vote candidate table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    mobileno INTEGER NOT NULL UNIQUE,
    is_voted INTEGER DEFAULT 0
  )`, (error) => {
    if (error) {
      console.error('Error creating user table:', error.message);
    } else {
      console.log('User table created successfully');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS candidates (
    candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_name TEXT UNIQUE,
    vote_count INTEGER DEFAULT 0
  )`, () => {
    console.log('Candidate table has been created');
  });

  db.run('PRAGMA foreign_keys = ON;');

  db.run(`CREATE TABLE IF NOT EXISTS users_votes (
    candidate_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  )`);
  
  // Insert sample data into the candidates table
  const candidates = [
    { candidate_name: 'Candidate 1' },
    { candidate_name: 'Candidate 2' },
    { candidate_name: 'Candidate 3' },
    { candidate_name: 'Candidate 4' }
  ];
  
  const insertQuery = 'INSERT INTO candidates (candidate_name) VALUES (?)';
  
  candidates.forEach(candidate => {
    db.run(insertQuery, [candidate.candidate_name], function (error) {
      if (error) {
        console.error('Error inserting candidate:', error);
      } else {
        console.log(`Candidate "${candidate.name}" inserted with ID ${this.lastID}`);
      }
    });
  });
});

module.exports = db;
