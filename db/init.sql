DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    username TEXT UNIQUE,
    password TEXT
);

DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    species TEXT,
    owner_id INT,
    age INT,
	name TEXT
);

INSERT INTO users(name, username, password) VALUES('Jhon Doe', 'doe123', 'doe615');
INSERT INTO users(name, username, password) VALUES('Mark Dup', 'markdup615', 'dup123');
INSERT INTO users(name, username, password) VALUES('Cory Fox', 'foxcory', 'fox123');

INSERT INTO pets(species, owner_id, age, name) VALUES( 'bird', 1, 3, 'Fido');
INSERT INTO pets(species, owner_id, age, name) VALUES('lion', 2, 1, 'Max');
INSERT INTO pets(species, owner_id, age, name) VALUES('fox', 1, 2, 'Bob');
INSERT INTO pets(species, owner_id, age, name) VALUES('cat', null, 1, 'Kitty');
INSERT INTO pets(species, owner_id, age, name) VALUES('whale', null, 2, 'whally');
INSERT INTO pets(species, owner_id, age, name) VALUES('dog', null, 1, 'doggy');
INSERT INTO pets(species, owner_id, age, name) VALUES('snake', null, 3, 'snakey');