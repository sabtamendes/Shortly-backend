CREATE TABLE visits(
    id SERIAL PRIMARY KEY,
    visit INTEGER NOT NULL DEFAULT 0,
    "urlId" INTEGER REFERENCES "urls"("id"),
    "userId" INTEGER REFERENCES "users"("id")
);