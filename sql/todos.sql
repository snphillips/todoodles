-- type is either:
-- today, thisweek, thismonth, sometime

-- db: todoodles

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
