-- migrate:up
ALTER TABLE events DROP COLUMN attendance_list;

-- migrate:down
ALTER TABLE events ADD COLUMN attendance_list JSON;
