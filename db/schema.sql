CREATE DATABASE IF NOT EXISTS beoLife
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_unicode_ci;

USE beoLife;

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
	lastname VARCHAR(40) NOT NULL,
	username VARCHAR(40) NOT NULL UNIQUE,
	email VARCHAR(120) NOT NULL UNIQUE,
	avatar_url VARCHAR(255) NULL,
	password_hash VARCHAR(255) NOT NULL,

	CHECK (CHAR_LENGTH(TRIM(username)) BETWEEN 3 AND 40),
	CHECK (CHAR_LENGTH(TRIM(email)) >0)
);

CREATE TABLE IF NOT EXISTS saved_events(
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	event_external_id VARCHAR(255) NOT NULL,
	event_title VARCHAR(255) NOT NULL,
	event_category VARCHAR(100),
	event_date DATETIME NULL,
	event_location VARCHAR(255),
	event_link TEXT,
	event_image_url TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	UNIQUE(user_id, event_external_id)
);

