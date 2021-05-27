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

    static createPet(species, owner_id, age, name, description, image_url){
        const queryText = "INSERT INTO pets (species, owner_id, age, name, description, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, species, owner_id, age, name, description, image_url";
        return query(queryText, [species, owner_id, age, name, description, image_url]).then(results => results.rows[0])
    }

    static deletePet(id){
        const queryText = "DELETE FROM pets WHERE id = $1";
        return query(queryText, [id])
    }

    static updatePet(id, newObj){
        const { species, owner_id, age, name, description, image_url } = newObj;
        const queryText = "UPDATE pets SET species = $1, owner_id = $2, age = $3, name = $4, description = $5, image_url = $6 WHERE id = $7  RETURNING id, species, owner_id, age, name, description, image_url"
        return query(queryText, [species, owner_id, age, name, description, image_url, id]).then(results => results.rows[0] ).catch(console.log)
    }

    static needPet(){
        const queryText = "SELECT * FROM pets WHERE owner_id IS null";
        return query(queryText).then(results => results.rows)
    }

    static getUsersPets(id){
        const queryText = "SELECT * FROM pets WHERE owner_id = $1";
        return query(queryText, [id]).then(results => results.rows)
    }

    static claimPet(){
        
    }
 
}

module.exports = Pet