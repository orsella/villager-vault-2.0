create table villagers2(
  id serial primary key,
  name varchar(255),
  species varchar(255),
  personality varchar(255),
  day integer,
  month varchar(255)
);

create table comments(
  id serial primary key,
  name varchar(255),
  comment text,
  villager_id integer references villagers2(id)
);