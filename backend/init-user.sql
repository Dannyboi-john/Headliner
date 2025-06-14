CREATE DATABASE IF NOT EXISTS headliner_db;

CREATE USER IF  NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'strongpassword123';

GRANT ALL PRIVILEGES ON headliner_db.* TO 'appuser'@'%';

FLUSH PRIVILEGES;