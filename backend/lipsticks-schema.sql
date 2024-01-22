CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  count_in_stock INTEGER CHECK (count_in_stock >= 0),
  price INTEGER,
  description TEXT NOT NULL,
  img_url TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  username TEXT NOT NULL
    REFERENCES users ON DELETE CASCADE,
  product_id INTEGER NOT NULL
    REFERENCES products ON DELETE CASCADE
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  Tag TEXT NOT NULL,
  product_id INTEGER NOT NULL
    REFERENCES products ON DELETE CASCADE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  shipping_address TEXT,
  total_price INTEGER,
  product_id INTEGER
    REFERENCES products ON DELETE CASCADE,
  username TEXT NOT NULL
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE saved (
  username TEXT
    REFERENCES users ON DELETE CASCADE,
  product_id INTEGER
    REFERENCES products ON DELETE CASCADE,
      PRIMARY KEY (username, product_id)
);