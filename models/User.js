const {query} = require('../db/db')

class User {

    // this is actually doing the query

    static getUsers(){
        const queryText = "SELECT * FROM users ORDER BY id";
        return query(queryText).then(results => results.rows)
    }

    static getUser(id){
        const queryText = "SELECT * FROM users WHERE id = $1";
        return query(queryText, [id]).then(results => results.rows[0])
    }

    static createUser (name, username, password){
        const queryText = "INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING id, name, username, password";
        return query(queryText, [name, username, password]).then(results => results.rows[0])
    }

    static deleteUser(id){
        const queryText = "DELETE FROM users WHERE id = $1";
        return query(queryText, [id])
    }

    static updateUser(id, userData){
        const {name, username, password} = userData;
        const queryText = "UPDATE users SET name = $1, username = $2, password = $3 WHERE id = $4  RETURNING id, name, username, password"
        return query(queryText, [name, username, password, id]).then(results => results.rows[0] )
    }

    static getUsersPets(id){
        const queryText = "SELECT * FROM pets WHERE owner_id = $1";
        return query(queryText, [id]).then(results => results.rows)
    }

    static getByUsername(username){
        const queryText = "SELECT * FROM users WHERE username = $1";
        return query(queryText, [username]).then(results => results.rows[0])
    }
        
}

module.exports = User