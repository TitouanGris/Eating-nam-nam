SET NAMES 'utf8mb4';

DROP TABLE IF EXISTS `user_ingredient`;

DROP TABLE IF EXISTS comment;

DROP TABLE IF EXISTS favoris;

DROP TABLE IF EXISTS `user_tags`;

DROP TABLE IF EXISTS `recipe_tags`;

DROP TABLE IF EXISTS tags;

DROP TABLE IF EXISTS category;

DROP TABLE IF EXISTS step;

DROP TABLE IF EXISTS `recipe_ingredient`;

DROP TABLE IF EXISTS unit;

DROP TABLE IF EXISTS ingredient;

DROP TABLE IF EXISTS recipe;

DROP TABLE IF EXISTS user;

CREATE TABLE
    user (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        pseudo VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_date DATETIME NOT NULL DEFAULT NOW(),
        updated_date DATETIME NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
        password VARCHAR(20) NOT NULL,
        is_admin BOOL NOT NULL
    );

CREATE TABLE
    recipe (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_id INT NOT NULL,
        name VARCHAR(80) COLLATE utf8mb4_unicode_ci NOT NULL,
        summary VARCHAR(255) NOT NULL,
        created_date DATETIME NOT NULL DEFAULT NOW(),
        updated_date DATETIME NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
        photo_url VARCHAR(255) NULL,
        nb_serving INT NOT NULL,
        validate_recipe BOOL NOT NULL,
        CONSTRAINT fk_user_recipe FOREIGN KEY (user_id) REFERENCES user(id)
    );

CREATE TABLE
    ingredient (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(80) COLLATE utf8mb4_unicode_ci NOT NULL
    );

CREATE TABLE
    unit (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    recipe_ingredient (
        recipe_id INT NOT NULL,
        ingredient_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_id INT NOT NULL,
        PRIMARY KEY (
            recipe_id,
            ingredient_id,
            unit_id
        ),
        CONSTRAINT fk_recipe_recipe_ingredient FOREIGN KEY (recipe_id) REFERENCES recipe(id),
        CONSTRAINT fk_ingredient_recipe_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
        CONSTRAINT fk_unit FOREIGN KEY (unit_id) REFERENCES unit(id)
    );

CREATE TABLE
    step (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        recipe_id INT NOT NULL,
        step_number INT NOT NULL,
        description VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL
    );

CREATE TABLE
    category (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    tags (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        category_id INT NOT NULL,
        image_url VARCHAR(255) NULL,
        name VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
        CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id)
    );

CREATE TABLE
    recipe_tags (
        recipe_id INT NOT NULL,
        tags_id INT NOT NULL,
        PRIMARY KEY (recipe_id, tags_id),
        CONSTRAINT fk_recipe_recipe_tags FOREIGN KEY (recipe_id) REFERENCES recipe(id),
        CONSTRAINT fk_tags_recipe_tags FOREIGN KEY (tags_id) REFERENCES tags(id)
    );

CREATE TABLE
    user_tags (
        user_id INT NOT NULL,
        tags_id INT NOT NULL,
        PRIMARY KEY (user_id, tags_id),
        CONSTRAINT fk_user_user_tags FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_tags_user_tags FOREIGN KEY (tags_id) REFERENCES tags(id)
    );

CREATE TABLE
    favoris (
        user_id INT NOT NULL,
        recipe_id INT NOT NULL,
        PRIMARY KEY (user_id, recipe_id),
        CONSTRAINT fk_user_favoris FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_recipe_favoris FOREIGN KEY (recipe_id) REFERENCES recipe(id)
    );

CREATE TABLE
    comment (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        user_id INT NOT NULL,
        recipe_id INT NOT NULL,
        message TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
        created_date DATETIME NOT NULL DEFAULT NOW(),
        updated_date DATETIME NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_user_comment FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_recipe_comment FOREIGN KEY (recipe_id) REFERENCES recipe(id)
    );

CREATE TABLE
    user_ingredient (
        user_id INT NOT NULL,
        ingredient_id INT NOT NULL,
        PRIMARY KEY (user_id, ingredient_id),
        CONSTRAINT fk_user_user_ingredient FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fk_ingredient_user_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
    );
/* ------------------ ICI LES INSERT ------------------- */
INSERT INTO
    user (
        pseudo,
        email,
        created_date,
        updated_date,
        password,
        is_admin
    )
VALUES (
        'Nadine',
        'user1@email.com',
        '2023-01-01',
        NULL,
        'Motel',
        TRUE
    ), (
        'Hélène',
        'user2@email.com',
        '2023-01-02',
        NULL,
        'Vernet',
        TRUE
    ), (
        'Irwin',
        'admin1@email.com',
        '2023-01-03',
        NULL,
        'Soliman',
        TRUE
    ), (
        'Titouan',
        'user3@email.com',
        '2023-01-04',
        NULL,
        'Gris',
        TRUE
    ), (
        'Guillaume',
        'user4@email.com',
        '2023-01-05',
        NULL,
        'Lebeau',
        TRUE
    ), (
        'Lucas',
        'admin2@email.com',
        '2023-01-06',
        NULL,
        'Faugeron',
        FALSE
    ), (
        'Lucasz',
        'user5@email.com',
        '2023-01-07',
        NULL,
        'Grzegorzewski',
        FALSE
    );

INSERT INTO
    recipe (
        user_id,
        name,
        summary,
        created_date,
        updated_date,
        photo_url,
        nb_serving,
        validate_recipe
    )
VALUES (
        1,
        'Salade Méditerranéenne',
        'Une délicieuse salade méditerranéenne avec des tomates, du concombre, des olives et du fromage feta.',
        '2023-12-12',
        NULL,
        '/images/Recette 1.jpg',
        4,
        true
    ), (
        2,
        'Poulet au Curry',
        'Un plat de poulet savoureux avec une sauce curry crémeuse et des légumes colorés.',
        '2023-12-11',
        NULL,
        '/images/Recette 2.jpg',
        3,
        true
    ), (
        3,
        'Pâtes à la Carbonara',
        'Des pâtes crémeuses avec une sauce carbonara riche à base de bacon, de crème et de parmesan.',
        '2023-12-10',
        NULL,
        '/images/Recette 3.jpg',
        2,
        true
    ), (
        4,
        'Riz Frit aux Légumes',
        'Un délicieux riz frit aux légumes avec des petits pois, des carottes et des œufs.',
        '2023-12-09',
        NULL,
        '/images/Recette 4.jpg',
        4,
        true
    ), (
        5,
        'Pizza Margherita',
        'Une pizza classique avec une sauce tomate, de la mozzarella fraîche et des feuilles de basilic.',
        '2023-12-08',
        NULL,
        '/images/Recette 5.jpg',
        3,
        true
    ), (
        6,
        'Smoothie aux Fruits Rouges',
        'Un smoothie rafraîchissant avec des fraises, des framboises et des myrtilles.',
        '2023-12-07',
        NULL,
        '/images/Recette 6.jpg',
        2,
        true
    ), (
        7,
        'Tarte aux Pommes',
        'Une tarte sucrée aux pommes avec une délicieuse croûte dorée.',
        '2023-12-06',
        NULL,
        '/images/Recette 7.jpg',
        8,
        true
    ), (
        7,
        'Saumon Grillé',
        'Saumon grillé avec une marinade au citron et aux herbes, servi avec des légumes rôtis.',
        '2023-12-05',
        NULL,
        '/images/Recette 8.jpg',
        2,
        true
    ), (
        4,
        'Gâteau au Chocolat',
        'Un délicieux gâteau au chocolat moelleux avec un glaçage fondant.',
        '2023-12-04',
        NULL,
        '/images/Recette 9.jpg',
        10,
        true
    ), (
        3,
        'Salade de Quinoa aux Légumes',
        'Une salade saine de quinoa avec des légumes frais et une vinaigrette légère.',
        '2023-12-03',
        NULL,
        '/images/Recette 10.jpg',
        6,
        true
    );

INSERT INTO ingredient (name)
VALUES ('Sel'), ('Poivre'), ('Huile d''olive'), ('Ail'), ('Oignon'), ('Tomate'), ('Basilic'), ('Persil'), ('Thym'), ('Origan'), ('Cumin'), ('Coriandre'), ('Paprika'), ('Moutarde'), ('Vinaigre balsamique'), ('Sucre'), ('Miel'), ('Citron'), ('Gingembre'), ('Cannelle'), ('Clou de girofle'), ('Noix de muscade'), ('Vanille'), ('Laurier'), ('Aneth'), ('Curry'), ('Piment'), ('Sauge'), ('Romarin'), ('Fenouil'), ('Câpres'), ('Olives'), ('Parmesan'), ('Mozzarella'), ('Gorgonzola'), ('Feta'), ('Cheddar'), ('Gruyère'), ('Camembert'), ('Roquefort'), ('Saumon'), ('Thon'), ('Crevettes'), ('Moules'), ('Poulet'), ('Bœuf'), ('Porc'), ('Agneau'), ('Canard'), ('Œufs'), ('Farine'), ('Levure'), ('Beurre'), ('Crème fraîche'), ('Yaourt'), ('Fromage blanc'), ('Lait'), ('Crème liquide'), ('Tomate concentrée'), ('Ketchup'), ('Mayonnaise'), ('Moutarde de Dijon'), ('Sauce soja'), ('Vinaigre de vin'), ('Sauce Worcestershire'), ('Pesto'), ('Sauce barbecue'), ('Sauce chili'), ('Sauce teriyaki'), ('Riz'), ('Pâtes'), ('Quinoa'), ('Couscous'), ('Blé'), ('Maïs'), ('Haricots'), ('Pommes de terre'), ('Carottes'), ('Brocoli'), ('Épinards'), ('Champignons'), ('Poivrons'), ('Aubergines'), ('Courgettes'), ('Radis'), ('Céleri'), ('Avocat'), ('Laitue'), ('Échalote'), ('Pomme'), ('Banane'), ('Fraise'), ('Orange'), ('Citron vert'), ('Pêche'), ('Mangue'), ('Ananas'), ('Framboise'), ('Myrtille'), ('Noix de coco');

INSERT INTO unit (name)
VALUES ("g"), ("mL"), ("càs"), ("càc"), ("tasse"), ("pincée"), ("unité"), ("feuille");
-- id : g : 1; mL : 2; càs : 3; càc :4; tasse : 5; pincée : 6; unité : 7; feuille: 8;
-- Pour la recette 'Salade Méditerranéenne'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (1, 1, 1, 6), (1, 6, 2, 7), (1, 32, 10, 7), (1, 33, 100, 1), (1, 7, 1, 5);
-- Pour la recette 'Poulet au Curry'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (2, 45, 500, 1), (2, 50, 4, 7), (2, 6, 2, 7), (2, 56, 200, 1), (2, 8, 1, 4);
-- Pour la recette 'Pâtes à la Carbonara'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (3, 71, 300, 1), (3, 54, 150, 2), (3, 33, 50, 1), (3, 13, 50, 1), (3, 50, 3, 7);
-- Pour la recette 'Riz Frit aux Légumes'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (4, 70, 200, 1), (4, 77, 1, 5), (4, 6, 1, 7), (4, 73, 150, 1), (4, 57, 50, 2);
-- Pour la recette 'Pizza Margherita'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (5, 51, 300, 1), (5, 71, 1, 7), (5, 33, 200, 1), (5, 32, 10, 7), (5, 23, 3, 8);
-- Pour la recette 'Smoothie aux Fruits Rouges'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (6, 92, 1, 5), (6, 98, 50, 1), (6, 99, 50, 1), (6, 100, 50, 1), (6, 57, 200, 2);
-- Pour la recette 'Tarte aux Pommes'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (7, 77, 1, 4), (7, 90, 4, 7), (7, 16, 100, 1), (7, 6, 3, 7), (7, 65, 1, 3);
-- Pour la recette 'Gâteau au Chocolat'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (9, 51, 200, 1), (9, 53, 150, 1), (9, 16, 150, 1), (9, 9, 3, 7), (9, 52, 200, 1);
-- Pour la recette 'Salade de Quinoa aux Légumes'
INSERT INTO
    recipe_ingredient (
        recipe_id,
        ingredient_id,
        quantity,
        unit_id
    )
VALUES (10, 72, 1, 5), (10, 78, 1, 1), (10, 82, 1, 2), (10, 79, 100, 1), (10, 11, 1, 3);

INSERT INTO
    step (
        recipe_id,
        step_number,
        description
    )
VALUES (
        1,
        1,
        'Lavez et coupez les tomates fraîches.'
    ), (
        1,
        2,
        'Coupez le concombre et l''oignon rouge en dés.'
    ), (
        1,
        3,
        'Coupez les olives de Kalamata et le fromage feta.'
    ), (
        1,
        4,
        'Mélangez tous les légumes et le fromage dans un grand bol.'
    ), (
        1,
        5,
        'Arrosez la salade d''huile d''olive.'
    ), (
        1,
        6,
        'Saupoudrez d''origan séché et d''une pincée de sel.'
    ), (
        1,
        7,
        'Mélangez délicatement la salade pour combiner tous les ingrédients.'
    ), (
        1,
        8,
        'Servez frais et régalez-vous !'
    ), (
        2,
        1,
        'Coupez le poulet en morceaux.'
    ), (
        2,
        2,
        'Coupez les oignons, les tomates et le gingembre.'
    ), (
        2,
        3,
        'Chauffez de l''huile dans une poêle et faites sauter les oignons coupés jusqu''à ce qu''ils soient dorés.'
    ), (
        2,
        4,
        'Ajoutez les tomates et le gingembre coupés, faites cuire jusqu''à ce que les tomates soient tendres.'
    ), (
        2,
        5,
        'Ajoutez les morceaux de poulet et faites cuire jusqu''à ce qu''ils soient dorés de tous les côtés.'
    ), (
        2,
        6,
        'Ajoutez le curry, le cumin, la coriandre et le sel selon votre goût.'
    ), (
        2,
        7,
        'Versez le lait de coco et laissez mijoter jusqu''à ce que le poulet soit bien cuit.'
    ), (
        2,
        8,
        'Décorez avec du coriandre frais et servez sur du riz.'
    ), (
        3,
        1,
        'Portez de l''eau à ébullition et faites cuire les pâtes selon les instructions du paquet.'
    ), (
        3,
        2,
        'Dans une poêle séparée, faites cuire le pancetta en dés jusqu''à ce qu''il soit croustillant.'
    ), (
        3,
        3,
        'Fouettez ensemble les œufs, le parmesan râpé et le poivre dans un bol.'
    ), (
        3,
        4,
        'Égouttez les pâtes cuites et ajoutez-les à la poêle avec le pancetta croustillant.'
    ), (
        3,
        5,
        'Retirez la poêle du feu et remuez rapidement le mélange d''œufs et de fromage.'
    ), (
        3,
        6,
        'Continuez à remuer jusqu''à ce que la sauce épaississe et enrobe les pâtes.'
    ), (
        3,
        7,
        'Servez immédiatement, garni de parmesan supplémentaire et de poivre noir.'
    ), (
        4,
        1,
        'Cuisez le riz selon les instructions du paquet et laissez-le refroidir.'
    ), (
        4,
        2,
        'Coupez les carottes, les poivrons et les haricots verts en petits morceaux.'
    ), (
        4,
        3,
        'Chauffez de l''huile dans un wok ou une grande poêle à feu moyen.'
    ), (
        4,
        4,
        'Ajoutez les légumes coupés et faites-les sauter jusqu''à ce qu''ils soient légèrement tendres.'
    ), (
        4,
        5,
        'Poussez les légumes sur le côté du wok et cassez les œufs dans l''espace vide.'
    ), (
        4,
        6,
        'Brouillez les œufs et mélangez-les avec les légumes.'
    ), (
        4,
        7,
        'Ajoutez le riz cuit et refroidi dans le wok, en rompant les grumeaux.'
    ), (
        4,
        8,
        'Assaisonnez avec de la sauce soja, de l''huile de sésame et du sel selon votre goût.'
    ), (
        4,
        9,
        'Continuez à faire sauter jusqu''à ce que le riz soit réchauffé et uniformément enrobé de sauce.'
    ), (
        4,
        10,
        'Garnissez de ciboulette hachée et servez chaud.'
    ), (
        5,
        1,
        'Préchauffez le four à 475°F (245°C).'
    ), (
        5,
        2,
        'Étalez la pâte à pizza sur une surface farinée.'
    ), (
        5,
        3,
        'Étalez la sauce tomate sur la pâte, en laissant une bordure pour la croûte.'
    ), (
        5,
        4,
        'Ajoutez la mozzarella fraîche et les feuilles de basilic par-dessus.'
    ), (
        5,
        5,
        'Faites cuire au four préchauffé jusqu''à ce que la croûte soit dorée et le fromage soit bouillonnant.'
    ), (
        5,
        6,
        'Retirez du four, découpez et servez.'
    ), (
        6,
        1,
        'Mélangez des baies mélangées, du yaourt et du miel dans un blender.'
    ), (
        6,
        2,
        'Mixez jusqu''à obtention d''un mélange lisse et crémeux.'
    ), (
        6,
        3,
        'Versez le smoothie dans des verres et garnissez de baies supplémentaires.'
    ), (
        7,
        1,
        'Préchauffez le four à 425°F (220°C).'
    ), (
        7,
        2,
        'Pelez, évidez et coupez les pommes en tranches.'
    ), (
        7,
        3,
        'Mélangez les pommes avec du sucre, de la cannelle et du jus de citron.'
    ), (
        7,
        4,
        'Étalez la pâte à tarte et garnissez un moule à tarte.'
    ), (
        7,
        5,
        'Remplissez la croûte avec le mélange de pommes.'
    ), (
        7,
        6,
        'Couvrez d''une deuxième croûte et scellez les bords.'
    ), (
        7,
        7,
        'Faites des fentes dans la croûte supérieure pour permettre à la vapeur de s''échapper.'
    ), (
        7,
        8,
        'Faites cuire jusqu''à ce que la croûte soit dorée et la garniture bouillonnante.'
    ), (
        8,
        1,
        'Préchauffez le grill à feu moyen-élevé.'
    ), (
        8,
        2,
        'Assaisonnez les filets de saumon avec du sel, du poivre et du jus de citron.'
    ), (
        8,
        3,
        'Grillez le saumon pendant 4-5 minutes de chaque côté ou jusqu''à ce qu''il se défasse facilement à la fourchette.'
    ), (
        9,
        1,
        'Préchauffez le four à 350°F (175°C).'
    ), (
        9,
        2,
        'Graissez et farinez les moules à gâteau.'
    ), (
        9,
        3,
        'Dans un bol, mélangez la farine, le cacao, le bicarbonate de soude et le sel.'
    ), (
        9,
        4,
        'Dans un autre bol, battez les œufs, le sucre et l''extrait de vanille.'
    ), (
        9,
        5,
        'Ajoutez les ingrédients secs aux ingrédients humides et mélangez bien.'
    ), (
        9,
        6,
        'Versez la pâte dans les moules préparés et faites cuire jusqu''à ce qu''un cure-dent en ressorte propre.'
    ), (
        10,
        1,
        'Rincez le quinoa et faites-le cuire selon les instructions du paquet.'
    ), (
        10,
        2,
        'Coupez une variété de légumes frais tels que concombre, poivrons et tomates cerises.'
    ), (
        10,
        3,
        'Dans un grand bol, mélangez le quinoa cuit et les légumes coupés.'
    ), (
        10,
        4,
        'Arrosez d''huile d''olive et de vinaigre balsamique, et mélangez pour bien enrober.'
    ), (
        10,
        5,
        'Assaisonnez avec du sel, du poivre et vos herbes préférées.'
    );
-- Ajoutez autant de lignes que nécessaire
INSERT INTO category (name)
VALUES ('price'), ('country'), ('regime'), ('difficulty'), ('duration'), ('type');

INSERT INTO tags (category_id, image_url, name) VALUES

(1, '/images/1euros.png', '€'), (1, '/images/2euros.png', '€€'), (1, '/images/3euros.png', '€€€'), (2, '', 'Italien'), (2, '', 'Français'), (2, '', 'Indien'), (2, '', 'Américain'), (3, '', 'Végétarien'), (3, '', 'Vegan'), (3, '', 'Viandard'), (3, '', 'Sans Gluten'), (
    3,
    '',
    'Sans Produits Laitiers'
), (3, '', 'Sans Porc'), (3, '', 'Pescétarien'), (
    4,
    '/images/strong-1.png',
    'Facile'
), (
    4,
    '/images/strong-2.png',
    'Moyen'
), (
    4,
    '/images/strong-3.png',
    'Difficile'
), (5, '', '15 min'), (5, '', '30 min'), (5, '', '45 min'), (5, '', '1h'), (5, '', '1h30'), (5, '', '2h+'), (6, '', 'entrée'), (6, '', 'plat'), (6, '', 'dessert'), (6, '', 'boisson'), (6, '', 'apéritif');

Insert INTO
    recipe_tags (recipe_id, tags_id)
VALUES (1, 1), (1, 4), (1, 9), (1, 16), (1, 20), (1, 24), (2, 2), (2, 5), (2, 10), (2, 17), (2, 21), (2, 25), (3, 3), (3, 6), (3, 13), (3, 15), (3, 19), (3, 25), (4, 1), (4, 4), (4, 9), (4, 17), (4, 21), (4, 25), (5, 2), (5, 5), (5, 12), (5, 17), (5, 23), (5, 26), (6, 3), (6, 4), (6, 11), (6, 16), (6, 18), (6, 26), (7, 1), (7, 6), (7, 9), (7, 15), (7, 19), (7, 25), (8, 2), (8, 5), (8, 10), (8, 17), (8, 21), (8, 26), (9, 1), (9, 6), (9, 11), (9, 15), (9, 20), (9, 24), (10, 3), (10, 5), (10, 9), (10, 16), (10, 22), (10, 25);

INSERT INTO
    user_tags (user_id, tags_id)
VALUES (1, 1), (1, 2), (1, 3), (1, 5), (1, 6), (2, 2), (2, 3), (2, 5), (3, 3), (3, 4), (3, 6), (4, 6), (4, 2);

INSERT INTO
    favoris (user_id, recipe_id)
VALUES (1, 1), (1, 2), (1, 5), (1, 6), (1, 9), (2, 2), (2, 3), (2, 5), (3, 7), (3, 8), (3, 6), (4, 6), (4, 9), (6, 1), (7, 5), (7, 2);

INSERT INTO
    comment (user_id, recipe_id, message)
VALUES (1, 6, 'Délicieux plat!'), (
        1,
        7,
        'On veut les cookies de Guillaume !'
    ), (
        2,
        1,
        'De nouveaux pas déçus de cette recette'
    ), (
        2,
        3,
        'je déteste les mogettes'
    ), (
        3,
        6,
        'A quand des recettes vegans ?????? 😭'
    ), (
        4,
        2,
        'Hello les loulous !🧑‍🍳'
    ), (
        5,
        8,
        'On veut les cookies de Guillaume !'
    ), (
        7,
        5,
        "j'aime pas les quantités d'ingrédients avec des chiffres après la virgule"
    ), (
        7,
        6,
        'I never cooked something this delicious ! 😍😍😍'
    ), (
        7,
        6,
        'Absolument horrible, ne jamais faire cette recette, mon four à exploser, mon chat à disparu depuis suite à ça'
    );

INSERT INTO
    user_ingredient (user_id, ingredient_id)
VALUES (1, 1), (1, 2), (1, 5), (1, 6), (1, 9), (2, 2), (2, 3), (2, 5), (3, 7), (3, 8), (3, 6), (4, 6), (4, 9), (6, 1), (7, 5), (7, 2);