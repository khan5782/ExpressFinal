const {query} = require('../db/db')

class Pet {

    // this is actually doing the query
    
    static getPets(){
        const queryText = "SELECT * FROM pets ORDER BY id";
        return query(queryText).then(results => results.rows)
    }

    static getPet(id){
        const queryText = "SELECT * FROM pets WHERE id = $1";
        return query(queryText, [id]).then(results => results.rows[0])
    }

    static createPet(species, owner_id, age, name){
        const queryText = "INSERT INTO pets (species, owner_id, age, name) VALUES ($1, $2, $3, $4) RETURNING id, species, owner_id, age, name";
        return query(queryText, [species, owner_id, age, name]).then(results => results.rows[0])
    }

    static deletePet(id){
        const queryText = "DELETE FROM pets WHERE id = $1";
        return query(queryText, [id])
    }

    static updatePet(id, newObj){
        const { species, owner_id, age, name } = newObj;
        const queryText = "UPDATE pets SET species = $1, owner_id = $2, age = $3, name = $4 WHERE id = $5  RETURNING id, species, owner_id, age, name"
        return query(queryText, [species, owner_id, age, name, id]).then(results => results.rows[0] ).catch(console.log)
    }

    static needPet(){
        const queryText = "SELECT * FROM pets WHERE owner_id IS null";
        return query(queryText).then(results => results.rows)
    }

}

module.exports = Pet