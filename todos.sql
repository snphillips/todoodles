-- type is either:
-- today, thisweek, thismonth, sometime

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
