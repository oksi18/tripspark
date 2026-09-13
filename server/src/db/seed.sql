-- Interests
INSERT INTO interests (name) VALUES
    ('history'),
    ('food'),
    ('nature'),
    ('architecture'),
    ('entertainment'),
    ('art'),
    ('religion');

-- Places: Lviv
INSERT INTO places (name, city, description, category, budget_level, popularity, lat, lng, avg_visit_minutes) VALUES
    ('Lviv Old Town Market Square', 'Lviv', 'Historic central square surrounded by colorful merchant houses and cafes.', 'architecture', 1, 95, 49.841952, 24.031592, 60),
    ('Lviv High Castle Hill', 'Lviv', 'Hilltop park with panoramic views over the old town.', 'nature', 1, 88, 49.845400, 24.041500, 45),
    ('Lviv Opera House', 'Lviv', 'Grand 19th-century opera and ballet theatre in Neo-Renaissance style.', 'architecture', 2, 85, 49.842900, 24.023700, 90),
    ('Latin Cathedral of Lviv', 'Lviv', 'Gothic cathedral with baroque interior, one of the oldest churches in the city.', 'religion', 1, 70, 49.841500, 24.032800, 40),
    ('Lviv Pharmacy Museum', 'Lviv', 'Working pharmacy museum inside a 300-year-old building.', 'history', 1, 55, 49.841700, 24.030900, 40),
    ('Lychakiv Cemetery', 'Lviv', 'Historic cemetery known for elaborate sculptures and notable graves.', 'history', 1, 60, 49.828600, 24.062700, 75),
    ('Svit Kavy (Coffee Manufacture)', 'Lviv', 'Iconic Lviv coffeehouse famous for its aromatic blends.', 'food', 1, 78, 49.841300, 24.031200, 30),
    ('Kryivka Restaurant', 'Lviv', 'Themed underground restaurant styled after a WWII resistance bunker.', 'food', 2, 82, 49.842300, 24.032200, 75),
    ('Lviv Chocolate Factory', 'Lviv', 'Popular chocolate cafe with handmade sweets and hot chocolate.', 'food', 1, 74, 49.841800, 24.030700, 30),
    ('Shevchenkivskyi Hai Museum', 'Lviv', 'Open-air museum of traditional wooden architecture and rural life.', 'nature', 1, 50, 49.833600, 24.005800, 90),
    ('Potocki Palace', 'Lviv', 'Neoclassical palace with art collections and elegant interiors.', 'art', 2, 58, 49.839700, 24.025900, 60),
    ('Lviv National Art Gallery', 'Lviv', 'Major art museum with Ukrainian and European collections.', 'art', 1, 62, 49.840200, 24.024400, 75),
    ('Dim Lehend Cafe', 'Lviv', 'Quirky legend-themed cafe with puzzles and secret rooms.', 'entertainment', 1, 65, 49.842000, 24.031800, 45),
    ('Iron Water Pipe Spring', 'Lviv', 'Small historic spring said to bring good luck to visitors.', 'history', 1, 40, 49.841900, 24.032500, 15),
    ('Stryiskyi Park', 'Lviv', 'Large landscaped park popular for walking and relaxing.', 'nature', 1, 68, 49.822800, 24.020900, 60),

    -- Kraków
    ('Main Market Square (Rynek Główny)', 'Krakow', 'One of the largest medieval town squares in Europe.', 'architecture', 1, 96, 50.061680, 19.937280, 60),
    ('Wawel Royal Castle', 'Krakow', 'Historic royal castle complex overlooking the Vistula river.', 'history', 2, 92, 50.054300, 19.935300, 90),
    ('St. Mary''s Basilica', 'Krakow', 'Gothic church famous for its wooden altarpiece and bugle call.', 'religion', 1, 85, 50.061800, 19.939300, 40),
    ('Kazimierz Jewish Quarter', 'Krakow', 'Historic district with synagogues, cafes, and street art.', 'history', 1, 80, 50.051500, 19.945500, 90),
    ('Cloth Hall (Sukiennice)', 'Krakow', 'Renaissance trading hall in the main square, now souvenir market.', 'architecture', 1, 75, 50.061700, 19.937000, 30),
    ('Schindler''s Factory Museum', 'Krakow', 'Museum on WWII Krakow under Nazi occupation.', 'history', 2, 78, 50.049900, 19.955900, 90),
    ('Vistula Boulevards', 'Krakow', 'Riverside walking paths with views of Wawel Castle.', 'nature', 1, 66, 50.052900, 19.933800, 45),
    ('Krakow Cloth Hall Food Court', 'Krakow', 'Traditional Polish food stalls and pierogi spots.', 'food', 1, 70, 50.061600, 19.936900, 40),
    ('Wieliczka Salt Mine Entrance', 'Krakow', 'Historic salt mine with underground chapels and lakes (edge of city).', 'nature', 2, 88, 49.983200, 20.054600, 120),
    ('National Museum Krakow', 'Krakow', 'Major art collection spanning Polish and European art.', 'art', 1, 55, 50.063700, 19.921400, 75);