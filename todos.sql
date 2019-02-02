
-- db: todoodles


DROP TABLE todos;

CREATE TABLE todos(
  id serial,
  todoitem character varying(50)
);

INSERT INTO todos(todoitem)
VALUES
('feed kitty'),
('go for walk'),
('laundry'),
('get flu shot'),
('make appointment with dentist'),
('mail postcard'),
('pay taxes'),
('paint living room'),
('send thank you note'),
('water plants'),
