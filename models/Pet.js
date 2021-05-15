const {query} = require('../db/db')

class Pet {
    // this is actually doing the query
    static getPets(){
        const queryText = "SELECT * FROM pets ORDER BY id";
        return query(queryText).then(results => results.rows)
        //returns promise of usersArray
    }

    static getPet(id){
        const queryText = "SELECT * FROM pets WHERE id = $1";
        return query(queryText, [id]).then(results => results.rows[0])
        //return a promise of a single user
    }

    static createPet(id, species, owner_id, age, name){
        const queryText = "INSERT INTO users (id, species, owner_id, age, name) VALUES ($1, $2, $3, $4, $5) RETURNING id, species, owner_id, age, name";
        return query(queryText, [id, species, owner_id, age, name]).then(results => results.rows[0])
        //return a promise of a single user
    }

    static deletePet(id){
        const queryText = "DELETE FROM pets WHERE id = $1";
        return query(queryText, [id])
    }

    static updatePet(id, newObj){
        const { species, owner_id, age, name } = newObj;
        const queryText = "UPDATE pets SET species = $1, owner_id = $2, age = $3, name=$4 WHERE id = $5  RETURNING id, species, owner_id, age, name"
        return query(queryText, [id, name, username, password]).then(results => results.rows[0] )
    }

}

module.exports = Pet