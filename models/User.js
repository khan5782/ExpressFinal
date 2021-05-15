const {query} = require('../db/db')

class User {

    // this is actually doing the query
    static getUsers(){
        const queryText = "SELECT * FROM users ORDER BY id";
        return query(queryText).then(results => results.rows)
        //returns promise of usersArray
    }

    static getUser(id){
        const queryText = "SELECT * FROM users WHERE id = $1";
        return query(queryText, [id]).then(results => results.rows[0])
        //return a promise of a single user
    }

    static createUser(id, name, username, password){
        const queryText = "INSERT INTO users (id, name, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, username, password";
        return query(queryText, [id, name, username, password]).then(results => results.rows[0])
        //return a promise of a single user
    }

    static deleteUser(id){
        const queryText = "DELETE FROM users WHERE id = $1";
        return query(queryText, [id])
    }

    static updateUser(id, newObj){
        const {name, username, password} = newObj;
        const queryText = "UPDATE users SET name = $1, username = $2, password = $3 WHERE id = $4  RETURNING id, name, username, password"
        return query(queryText, [id, name, username, password]).then(results => results.rows[0] )
    }
}

module.exports = User