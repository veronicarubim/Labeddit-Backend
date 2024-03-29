-- Active: 1682806895075@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL, 
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    post_id TEXT NOT NULL, 
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes_comment (
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO comments (id, post_id, user_id, content)
VALUES 
("c001", "p1", "2", "Parabéns pelo artesanato!"),
("c002", "p1", "3", "miau miau miau");

INSERT INTO users (id, name, email, password, role)
VALUES 
("1", "marta", "marta@gmail.com", "nymeria123", "NORMAL"),
("2", "maria", "maria@gmail.com", "joelho", "NORMAL"),
("3", "jaskier", "jaskier@gmail.com", "miaumiau", "ADMIN"),
("4", "bk", "bk@gmail.com", "whopper", "NORMAL");

INSERT INTO posts (id, creator_id, content)
VALUES 
("p1", "1", "Adoro fazer artesanato");

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
("1", "p1", 1),
("2", "p1", 1),
("3", "p1", 1),
("4", "p1", 0);

SELECT * FROM users; 

SELECT * FROM posts; 

SELECT * FROM likes_dislikes;

SELECT * FROM comments; 

SELECT 
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes, 
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;

/* */

DROP TABLE users; 

DROP TABLE posts; 

DROP TABLE likes_dislikes;

DROP TABLE comments;

DROP TABLE likes_dislikes_comment;

/*  */

DELETE FROM likes_dislikes;

DELETE FROM posts; 

DELETE FROM users; 

DELETE FROM comments; 

DELETE FROM comments
WHERE id = "4bcda35c-f947-4e4c-844b-17651a781e24";

SELECT
    comments.id,
    comments.user_id,
    comments.content,
    comments.likes,
    comments.dislikes,
    comments.created_at,
    users.name AS creator_name
FROM comments
JOIN users
ON comments.user_id = users.id
JOIN posts
ON comments.post_id = posts.id
WHERE
   post_id = "p1";
