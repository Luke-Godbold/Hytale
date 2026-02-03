CREATE TABLE Users (
    u_id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_name TEXT NOT NULL,
    email TEXT NOT NULL,
    passw TEXT NOT NULL
);

CREATE TABLE Guides (
    g_id INTEGER PRIMARY KEY AUTOINCREMENT,
    g_name TEXT NOT NULL,
    overview TEXT NOT NULL,
    img TEXT NOT NULL
);

CREATE TABLE Content (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    g_id INTEGER NOT NULL,
    c_type TEXT NOT NULL,
    info TEXT NOT NULL,
    num INTEGER NOT NULL,

    FOREIGN KEY (g_id) REFERENCES Guides(g_id)
);

CREATE TABLE Favourites (
    f_id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_id INTEGER NOT NULL,
    g_id INTEGER NOT NULL,

    FOREIGN KEY (u_id) REFERENCES Users(u_id),
    FOREIGN KEY (g_id) REFERENCES Guides(g_id)
);


INSERT INTO Guides (g_name, overview, img) VALUES ('Materials', 'Learn about how to find the different materials and their uses', 'Materials.png');
INSERT INTO Guides (g_name, overview, img) VALUES ('Structures', 'Learn about how to find the different structures and their uses', 'Structures.png');

INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'subTitle', 'Copper', 1);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'Copper is used to craft different tools, armor. It can also be used to craft and upgrade different workbenches.', 2);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'You can find copper in the world by mining copper ore deposits. These can be found in various biomes across the world. Esspecially in the upper levels of caves and exposed hillsides.', 3);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'Copper is one of the first metals you will find in the game and is used in a lot of the early game crafting recipes.', 4);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'image', 'Copper.png', 5);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'subTitle', 'Iron', 6);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'Iron is used to craft different tools, armor. It can also be used to craft and upgrade different workbenches.', 7);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'You can find iron in the world by mining iron ore deposits. These can be found in various biomes across the world. It is most concentrated in the desert biomes', 8);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'Iron is one of the first metals you will find in the game and is used in a lot of the early to mid game crafting recipes. It is a step up from copper in terms of quality and durability.', 9);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'image', 'Iron.png', 10);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'subTitle', 'Thorium', 11);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'Thorium is used to craft different tools, armor. It can also be used to craft and upgrade different workbenches.', 12);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'You can find thorium in the world by mining thorium ore deposits. These can be found in hot biomes such as the desert.', 13);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'text', 'Thorium is one of the materials used in the mid game crafting recipes a lot. It is a step up from iron in terms of quality and durability.', 14);
INSERT INTO Content (g_id, c_type, info, num) VALUES (1, 'image', 'Thorium.png', 15);


