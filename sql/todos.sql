-- type is either:
-- today, thisweek, thismonth, sometime

-- db: todoodles
<<<<<<< HEAD
DROP TABLE todos;

CREATE TABLE todos(
  id serial,
  todoitem character varying(50)
);

INSERT INTO todos(todoitem)
VALUES
('feed kitty'),
('go for walk'),
('mail postcard'),
('water plants'),
('laundry'),
('get flu shot'),
('send thank you note'),
('go for walk'),
('mail postcard'),
('pay taxes'),
('paint living room'),
('make appointment with dentist');
=======

CREATE TABLE todos(
  id serial,
  type character varying(50),
  todoitem character varying(50)
);

INSERT INTO todos(type, todoitem)
VALUES
('today', 'brush teeth'),
('today', 'go for walk'),
('today', 'mail postcard'),
('thisweek', 'water plants'),
('thisweek', 'laundry'),
('thisweek', 'get flu shot'),
('thismonth', 'send thank you note'),
('thismonth', 'go for walk'),
('thismonth', 'mail postcard'),
('sometime', 'pay taxes'),
('sometime', 'paint living room'),
('sometime', 'make appointment with dentist');
>>>>>>> eb63b901538b268391f22abbf145241e66dfdcb5
