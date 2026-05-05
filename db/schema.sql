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
	role VARCHAR(20) NOT NULL DEFAULT 'user',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	CHECK (CHAR_LENGTH(TRIM(username)) BETWEEN 3 AND 40),
	CHECK (CHAR_LENGTH(TRIM(email)) >0),
	CHECK (role IN ('user', 'admin'))
);

CREATE TABLE IF NOT EXISTS saved_events(
	  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,

  event_external_id VARCHAR(255) NOT NULL,
  event_title VARCHAR(255) NOT NULL,
  event_category VARCHAR(100) NULL,
  event_date VARCHAR(50) NULL,
  event_time VARCHAR(30) NULL,
  event_venue VARCHAR(255) NULL,
  event_city VARCHAR(120) NULL,
  event_country VARCHAR(120) NULL,
  event_image_url TEXT NULL,
  event_link TEXT NULL,
  event_price_min DECIMAL(10, 2) NULL,
  event_price_max DECIMAL(10, 2) NULL,
  event_currency VARCHAR(20) NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, event_external_id)
);


CREATE INDEX idx_saved_events_user_id ON saved_events(user_id);
CREATE INDEX idx_saved_events_external_id ON saved_events(event_external_id);

