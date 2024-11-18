CREATE DATABASE LABB;

CREATE TABLE
  planer (
    id serial PRIMARY KEY,
    beskrivning VARCHAR(255) NOT NULL
  );

INSERT INTO
  planer (beskrivning)
VALUES
  ('Tvätta');

INSERT INTO
  planer (beskrivning)
VALUES
  ('Dammsuga');

INSERT INTO
  planer (beskrivning)
VALUES
  ('Städa');
