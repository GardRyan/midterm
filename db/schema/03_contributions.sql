DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  story_step SMALLINT NOT NULL,
  content TEXT,
  picked BOOLEAN NOT NULL DEFAULT FALSE,
  contributer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_date DATE NOT NULL,
  picked_date DATE NOT NULL
);