-- ============================
-- TABLA PRINCIPAL: KHIPU
-- ============================
CREATE TABLE khipu (
    id SERIAL PRIMARY KEY,
    code TEXT,
    investigator TEXT,
    museum TEXT,
    museum_number TEXT,
    provenance TEXT,
    creation_date DATE,
    excel_write_date DATE,
    notes TEXT,
    raw_filename TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- PRIMARY CORD (cuerda principal)
-- ============================
CREATE TABLE primary_cord (
    id SERIAL PRIMARY KEY,
    khipu_id INTEGER REFERENCES khipu(id) ON DELETE CASCADE,
    structure TEXT,
    thickness REAL,
    length REAL,
    color TEXT,
    fiber TEXT,
    beginning TEXT,
    termination TEXT,
    twist TEXT,
    notes TEXT
);

-- ============================
-- CLUSTERS (agrupaciones dentro del khipu)
-- ============================
CREATE TABLE cluster (
    id SERIAL PRIMARY KEY,
    khipu_id INTEGER REFERENCES khipu(id) ON DELETE CASCADE,
    start_pos REAL,       -- posición de inicio dentro del khipu
    description TEXT
);

-- ============================
-- CORDS (cuerdas colgantes)
-- ============================
CREATE TABLE cord (
    id SERIAL PRIMARY KEY,
    khipu_id INTEGER REFERENCES khipu(id) ON DELETE CASCADE,
    primary_cord_id INTEGER REFERENCES primary_cord(id) ON DELETE SET NULL,

    cord_name TEXT,       -- ej: P1, AS1, S2, etc.
    twist TEXT,
    attachment TEXT,
    knots_raw TEXT,
    length REAL,
    termination TEXT,
    thickness REAL,
    color TEXT,
    value NUMERIC,        -- valor numérico total calculado
    position_desc TEXT    -- e.g., "Left; 15 cm"
);

CREATE INDEX idx_cord_name ON cord(cord_name);


-- ============================
-- KNOTS (nudos individuales)
-- ============================
CREATE TABLE knot (
    id SERIAL PRIMARY KEY,
    cord_id INTEGER REFERENCES cord(id) ON DELETE CASCADE,

    knot_type TEXT,       -- tipos de nudo (L, S, E, etc.)
    knot_count INTEGER,        -- cuántos nudos iguales juntos
    knot_offset REAL,          -- posición del nudo en la cuerda
    direction TEXT,       -- 'U' up / 'B' bottom
    numeric_value NUMERIC -- valor matemático del nudo
);
