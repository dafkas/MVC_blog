const db = require('./db.js);

exports.getAll = function(done){
    db.get().query('SELECT * FROM users', function(err, rows){
        console.log(rows);
    });
}