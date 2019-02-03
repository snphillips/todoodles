
-- To execute this file, type in the command line:
-- $ psql
-- \connect todoodles
-- \i todos.sql

-- To view rows (to ensure import was a success) type SELECT * FROM todos;
-- To quit: \q
-- To list databases: \l


-- db: todoodles


DROP TABLE todos;

CREATE TABLE todos(
  id serial,
  todoitem character varying(50),
  displaystrikethrough boolean
);

INSERT INTO todos(todoitem, displaystrikethrough)
VALUES
('feed kitty', false),
('go for walk', false),
('laundry', false),
('get flu shot', false),
('make appointment with dentist', false),
('mail postcard', false),
('pay taxes', false),
('paint living room', false),
('send thank you note', false),
('water plants', false)



-- below is old table. Can delete when you are satisfied
-- DROP TABLE todos;

-- CREATE TABLE todos(
--   id serial,
--   todoitem character varying(50)
-- );

-- INSERT INTO todos(todoitem)
-- VALUES
-- ('feed kitty'),
-- ('go for walk'),
-- ('laundry'),
-- ('get flu shot'),
-- ('make appointment with dentist'),
-- ('mail postcard'),
-- ('pay taxes'),
-- ('paint living room'),
-- ('send thank you note'),
-- ('water plants'),
