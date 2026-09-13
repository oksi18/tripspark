DROP TABLE IF EXISTS place_interests;
DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS interests;

CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    budget_level INT NOT NULL CHECK (budget_level BETWEEN 1 AND 3),
    popularity INT NOT NULL CHECK (popularity BETWEEN 1 AND 100),
    lat DECIMAL(9,6) NOT NULL,
    lng DECIMAL(9,6) NOT NULL,
    avg_visit_minutes INT NOT NULL DEFAULT 60
);

CREATE TABLE place_interests (
    place_id INT REFERENCES places(id) ON DELETE CASCADE,
    interest_id INT REFERENCES interests(id) ON DELETE CASCADE,
    PRIMARY KEY (place_id, interest_id)
);