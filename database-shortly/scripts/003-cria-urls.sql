CREATE TABLE urls(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "userId" INTEGER REFERENCES "users"("id"),
    "createdAt" DATE NOT NULL
);