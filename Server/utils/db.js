import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db'
});

con.connect((err) => {
    if (err)
        console.log('Error in connecting to the database');
    else
        console.log('Connected to the database');
});

export default con;