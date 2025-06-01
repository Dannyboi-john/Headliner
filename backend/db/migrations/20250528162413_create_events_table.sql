-- migrate:up
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_location VARCHAR(255),
    start_time DATETIME,
    end_time DATETIME,
    event_description TEXT,
    image_url TEXT,
    attendance_list JSON
);

-- migrate:down
DROP TABLE events;
