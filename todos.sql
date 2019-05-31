
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
  user_id integer,
  todoitem character varying(50),
  displaystrikethrough boolean
);

INSERT INTO todos(user_id, todoitem, displaystrikethrough)
VALUES
(0, 'feed kitty', false),
(0,'go for walk', false),
(0,'laundry', false),
(0,'get flu shot', false),
(0,'make appointment with dentist', false),
(0,'mail postcard', false),
(0,'pay taxes', false),
(0,'paint living room', false),
(0,'send thank you note', false),
(0,'water plants', false)


-- TODO: get this to work with cookies
-- DROP TABLE users;

-- CREATE TABLE users(
--   user_id serial
-- );

-- INSERT INTO users(user_id)
-- VALUES
