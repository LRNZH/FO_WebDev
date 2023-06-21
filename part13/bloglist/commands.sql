psql "postgres://<Username>:<password>@<Hostname>.oregon-postgres.render.com/learning_dxvp"


CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  likes INTEGER DEFAULT 0
);


INSERT INTO blogs (author, url, title, likes) VALUES
  ('Dan Abramov', 'https://example.com/blog1', 'On let vs const', 0),
  ('Laurenz Albe', 'https://example.com/blog2', 'Gaps in sequences in PostgreSQL', 0);



ALTER TABLE blogs
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;





