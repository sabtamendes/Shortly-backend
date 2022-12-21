CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    "userId" INTEGER REFERENCES "users"("id")
);