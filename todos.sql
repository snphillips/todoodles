
-- To execute this file, type in the command line:
-- $ psql
-- \i todos.sql

-- To view rows (to ensure import was a success) type SELECT * FROM todos;
-- To quit: \q
-- To list databases: \l
-- To connect: \connect todoodles



-- db: todoodles


DROP TABLE todos;

CREATE TABLE todos(
  id serial,
  todoitem character varying(50),
  strikethrough boolean
);

INSERT INTO todos(todoitem, strikethrough)
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
('water plants', false);



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
