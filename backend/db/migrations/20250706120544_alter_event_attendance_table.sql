-- migrate:up
ALTER TABLE event_attendance
    MODIFY status ENUM('Going', 'Interested') DEFAULT NULL,
    ADD liked BOOLEAN DEFAULT FALSE,
    DROP INDEX unique_user_event_status,
    ADD UNIQUE KEY  unique_user_event (user_id, event_id);

-- migrate:down
ALTER TABLE event_attendance
    MODIFY status ENUM ('Going', 'Interested', 'Liked') NOT NULL,
    DROP COLUMN liked,
    DROP INDEX unique_user_event,
    ADD UNIQUE KEY unique_user_event_status (user_id, event_id, status);
