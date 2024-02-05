-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: eatingnamnam
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `avatar`
--

DROP TABLE IF EXISTS `avatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `avatar` (
    `id` int NOT NULL AUTO_INCREMENT, `image_url` varchar(255) NOT NULL, PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `avatar`
--

/*!40000 ALTER TABLE `avatar` DISABLE KEYS */
;

INSERT INTO
    `avatar`
VALUES (1, 'avatarDefault.png'),
    (
        2, '6ee5f281-5a04-4f85-a57f-544b402667ad-panda.png'
    ),
    (
        3, 'c595c772-2541-4071-9141-31e6e962e4b9-cat.png  '
    );
/*!40000 ALTER TABLE `avatar` ENABLE KEYS */
;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `category` (
    `id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `category`
--

/*!40000 ALTER TABLE `category` DISABLE KEYS */
;

INSERT INTO
    `category`
VALUES (1, 'price'),
    (2, 'country'),
    (3, 'regime'),
    (4, 'difficulty'),
    (5, 'duration'),
    (6, 'type');
/*!40000 ALTER TABLE `category` ENABLE KEYS */
;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `comment` (
    `id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `recipe_id` int NOT NULL, `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`), KEY `fk_user_comment` (`user_id`), KEY `fk_recipe_comment` (`recipe_id`), CONSTRAINT `fk_recipe_comment` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_user_comment` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `comment`
--

/*!40000 ALTER TABLE `comment` DISABLE KEYS */
;

CREATE TABLE recipe (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, name VARCHAR(80) COLLATE utf8mb4_unicode_ci NOT NULL, summary VARCHAR(255) NOT NULL, created_date DATETIME NOT NULL DEFAULT NOW(), updated_date DATETIME NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP, photo_url VARCHAR(255) NULL, nb_serving INT NOT NULL, validate_recipe BOOL NOT NULL, CONSTRAINT fk_user_recipe FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

INSERT INTO
    `comment`
VALUES (
        1, 1, 6, 'C\'était plutôt bon, mais ça ne vaut pas les cookies de Guillaume', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        2, 7, 7, 'J\'ai mis plus de pommes et plus de tarte', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        3, 7, 1, 'De nouveau pas déçu de cette recette', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        4, 2, 3, 'Les pâtes avec des lardons, je dis oui.', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        5, 3, 2, 'C\'est pas très vegan tout ça😭', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        6, 4, 2, 'J\'aime le poulet. J\'aime le curry. J\'aime le poulet au curry.🧑‍🍳', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        7, 3, 4, 'Chez nous, tous les lundis, c\'est riz frit.', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        8, 2, 6, ' J\'aime mieux le yaourt', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        9, 5, 8, 'Cette recette de saumon a plu à mon oncle, et mon oncle il est difficile, alors si ça lui a plu c\'est que cette recette, elle devait être bonne. J\'aime bien mon oncle, il est gentil.', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        10, 6, 5, 'C\'\'était plutôt bon, avec les cookies de Guillaume en dessert bien sûr !', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        11, 7, 6, 'I never cooked something this delicious ! 😍😍😍', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        12, 2, 10, 'Le quinoa c\'est bof quand même, non ?', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        13, 3, 10, 'J\'aime les plats vegan et j\'avais besoin de le dire', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        14, 4, 8, 'Absolument horrible, ne jamais faire cette recette, mon four a explosé, mon chat à disparu depuis suite à ça. Ou mon chien, je sais plus. L\'un des deux en tout cas.', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        15, 6, 9, 'J\'ai trouvé le même chez Carrefour déjà tout fait, j\'ai bien aimé', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    ),
    (
        16, 3, 9, 'C\'était bon, mais je mettrai de la courgette à la place du beurre la prochaine fois.', '2024-01-30 15:31:46', '2024-01-30 15:31:46'
    );
/*!40000 ALTER TABLE `comment` ENABLE KEYS */
;

--
-- Table structure for table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE recipe_ingredient (
    recipe_id INT NOT NULL, ingredient_id INT NOT NULL, quantity INT NOT NULL, unit_id INT NOT NULL, PRIMARY KEY (
        recipe_id, ingredient_id, unit_id
    ), CONSTRAINT fk_recipe_recipe_ingredient FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE, CONSTRAINT fk_ingredient_recipe_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredient (id), CONSTRAINT fk_unit FOREIGN KEY (unit_id) REFERENCES unit (id)
);

CREATE TABLE `favoris` (
    `user_id` int NOT NULL, `recipe_id` int NOT NULL, PRIMARY KEY (`user_id`, `recipe_id`), KEY `fk_recipe_favoris` (`recipe_id`), CONSTRAINT `fk_recipe_favoris` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_user_favoris` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `favoris`
--

/*!40000 ALTER TABLE `favoris` DISABLE KEYS */
;

INSERT INTO
    `favoris`
VALUES (1, 1),
    (6, 1),
    (1, 2),
    (2, 2),
    (7, 2),
    (2, 3),
    (1, 5),
    (2, 5),
    (7, 5),
    (1, 6),
    (3, 6),
    (4, 6),
    (3, 7),
    (3, 8),
    (1, 9),
    (4, 9);
/*!40000 ALTER TABLE `favoris` ENABLE KEYS */
;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `ingredient` (
    `id` int NOT NULL AUTO_INCREMENT, `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 101 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `ingredient`
--

/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */
;

INSERT INTO
    `ingredient`
VALUES (1, 'Sel'),
    (2, 'Poivre'),
    (3, 'Huile d''olive'),
    (4, 'Ail'),
    (5, 'Oignon'),
    (6, 'Tomate'),
    (7, 'Basilic'),
    (8, 'Persil'),
    (9, 'Thym'),
    (10, 'Origan'),
    (11, 'Cumin'),
    (12, 'Coriandre'),
    (13, 'Paprika'),
    (14, 'Moutarde'),
    (15, 'Vinaigre balsamique'),
    (16, 'Sucre'),
    (17, 'Miel'),
    (18, 'Citron'),
    (19, 'Gingembre'),
    (20, 'Cannelle'),
    (21, 'Clou de girofle'),
    (22, 'Noix de muscade'),
    (23, 'Vanille'),
    (24, 'Laurier'),
    (25, 'Aneth'),
    (26, 'Curry'),
    (27, 'Piment'),
    (28, 'Sauge'),
    (29, 'Romarin'),
    (30, 'Fenouil'),
    (31, 'Câpres'),
    (32, 'Olives'),
    (33, 'Parmesan'),
    (34, 'Mozzarella'),
    (35, 'Gorgonzola'),
    (36, 'Feta'),
    (37, 'Cheddar'),
    (38, 'Gruyère'),
    (39, 'Camembert'),
    (40, 'Roquefort'),
    (41, 'Saumon'),
    (42, 'Thon'),
    (43, 'Crevettes'),
    (44, 'Moules'),
    (45, 'Poulet'),
    (46, 'Bœuf'),
    (47, 'Porc'),
    (48, 'Agneau'),
    (49, 'Canard'),
    (50, 'Œufs'),
    (51, 'Farine'),
    (52, 'Levure'),
    (53, 'Beurre'),
    (54, 'Crème fraîche'),
    (55, 'Yaourt'),
    (56, 'Fromage blanc'),
    (57, 'Lait'),
    (58, 'Crème liquide'),
    (59, 'Tomate concentrée'),
    (60, 'Ketchup'),
    (61, 'Mayonnaise'),
    (62, 'Moutarde de Dijon'),
    (63, 'Sauce soja'),
    (64, 'Vinaigre de vin'),
    (65, 'Sauce Worcestershire'),
    (66, 'Pesto'),
    (67, 'Sauce barbecue'),
    (68, 'Sauce chili'),
    (69, 'Sauce teriyaki'),
    (70, 'Riz'),
    (71, 'Pâtes'),
    (72, 'Quinoa'),
    (73, 'Couscous'),
    (74, 'Blé'),
    (75, 'Maïs'),
    (76, 'Haricots'),
    (77, 'Pommes de terre'),
    (78, 'Carottes'),
    (79, 'Brocoli'),
    (80, 'Épinards'),
    (81, 'Champignons'),
    (82, 'Poivrons'),
    (83, 'Aubergines'),
    (84, 'Courgettes'),
    (85, 'Radis'),
    (86, 'Céleri'),
    (87, 'Avocat'),
    (88, 'Laitue'),
    (89, 'Échalote'),
    (90, 'Pomme'),
    (91, 'Banane'),
    (92, 'Fraise'),
    (93, 'Orange'),
    (94, 'Citron vert'),
    (95, 'Pêche'),
    (96, 'Mangue'),
    (97, 'Ananas'),
    (98, 'Framboise'),
    (99, 'Myrtille'),
    (100, 'Noix de coco'),
    (101, 'Poivre noir'),
    (102, 'Poivre blanc'),
    (103, 'Poivre de Cayenne'),
    (104, 'Curcuma'),
    (105, 'Cardamome'),
    (106, 'Cumin moulu'),
    (107, 'Gingembre frais'),
    (108, 'Moutarde de moutarde'),
    (109, 'Vinaigre de cidre'),
    (110, 'Vinaigre de vin blanc'),
    (111, 'Vinaigre de riz'),
    (112, 'Sirop d''érable'),
    (113, 'Sucre brun'),
    (114, 'Sucre glace'),
    (115, 'Sirop de maïs'),
    (116, 'Sirop d''agave'),
    (117, 'Sirop de grenadine'),
    (118, 'Mélasse'),
    (119, 'Piment de la Jamaïque'),
    (120, 'Baies de genièvre'),
    (121, 'Graines de fenugrec'),
    (122, 'Graines de sésame'),
    (123, 'Huile de sésame'),
    (124, 'Huile de canola'),
    (125, 'Huile de tournesol'),
    (126, 'Huile de coco'),
    (127, 'Huile de noix'),
    (
        128, 'Huile de pépins de raisin'
    ),
    (129, 'Vin rouge'),
    (130, 'Vin blanc'),
    (131, 'Vin rosé'),
    (132, 'Vin de cuisson'),
    (133, 'Bouillon de légumes'),
    (134, 'Bouillon de poulet'),
    (135, 'Bouillon de bœuf'),
    (136, 'Bouillon de poisson'),
    (137, 'Gelée de fruits'),
    (138, 'Compote de pommes'),
    (139, 'Purée de tomates'),
    (
        140, 'Sauce tomate aux herbes'
    ),
    (141, 'Sauce aux piments doux'),
    (142, 'Sauce hoisin'),
    (143, 'Pâte de curry rouge'),
    (144, 'Pâte de curry vert'),
    (145, 'Wasabi'),
    (146, 'Moutarde à l''ancienne'),
    (147, 'Pâte miso'),
    (148, 'Graines de chia'),
    (149, 'Flocons d''avoine'),
    (150, 'Graines de lin'),
    (151, 'Chocolat noir'),
    (152, 'Chocolat au lait'),
    (153, 'Ail en poudre'),
    (154, 'Oignon en poudre'),
    (155, 'Curry en poudre'),
    (
        156, 'Piment de cayenne en poudre'
    ),
    (157, 'Paprika fumé'),
    (158, 'Safran'),
    (
        159, 'Feuilles de laurier séchées'
    ),
    (160, 'Herbes de Provence'),
    (161, 'Menthe fraîche'),
    (162, 'Coriandre fraîche'),
    (163, 'Basilic thaï'),
    (164, 'Câpres en saumure'),
    (165, 'Pignons de pin'),
    (166, 'Noix de cajou'),
    (167, 'Amandes effilées'),
    (168, 'Noisettes concassées'),
    (
        169, 'Flocons de noix de coco'
    ),
    (170, 'Pain de mie'),
    (171, 'Pain complet'),
    (172, 'Pain ciabatta'),
    (173, 'Baguette'),
    (174, 'Pain pita'),
    (175, 'Tortillas'),
    (176, 'Croûtons'),
    (177, 'Panko'),
    (178, 'Quinoa rouge'),
    (179, 'Orge perlé'),
    (180, 'Lentilles vertes'),
    (181, 'Lentilles corail'),
    (182, 'Haricots noirs'),
    (183, 'Haricots rouges'),
    (184, 'Haricots blancs'),
    (185, 'Haricots pinto'),
    (186, 'Chou-fleur'),
    (187, 'Chou kale'),
    (188, 'Chou rouge'),
    (189, 'Chou blanc'),
    (190, 'Chou de Bruxelles'),
    (191, 'Patate douce'),
    (192, 'Navet'),
    (193, 'Rutabaga'),
    (194, 'Panais'),
    (195, 'Courge butternut'),
    (196, 'Courge musquée'),
    (197, 'Radis noir'),
    (198, 'Champignons shiitake'),
    (199, 'Champignons portobello'),
    (200, 'Pois mange-tout'),
    (201, 'Asperges'),
    (202, 'Poireau'),
    (203, 'Courge spaghetti'),
    (204, 'Mangue séchée'),
    (205, 'Cranberries séchées'),
    (206, 'Germes de luzerne'),
    (207, 'Graines de tournesol'),
    (208, 'Pignons de cèdre'),
    (209, 'Graines de citrouille'),
    (210, 'Graines de grenade'),
    (211, 'Chia'),
    (212, 'Baies de goji'),
    (213, 'Pruneaux'),
    (214, 'Abricots secs'),
    (215, 'Dattes'),
    (216, 'Raisins secs'),
    (217, 'Cerises séchées'),
    (218, 'Pommes séchées'),
    (219, 'Aubergines grillées'),
    (220, 'Artichauts en conserve'),
    (221, 'Cœurs de palmier'),
    (
        222, 'Feuilles de vigne en conserve'
    ),
    (223, 'Câpres séchées'),
    (224, 'Anchois'),
    (225, 'Truffes'),
    (226, 'Foie gras'),
    (227, 'Crabe en conserve'),
    (228, 'Palourdes en conserve'),
    (229, 'Grenouilles'),
    (230, 'Escargots'),
    (231, 'Poulpe'),
    (232, 'Calamars'),
    (233, 'Rouleaux de printemps'),
    (234, 'Feuilles de riz'),
    (235, 'Feuilles de nori'),
    (236, 'Tofu ferme'),
    (237, 'Tofu soyeux'),
    (238, 'Tempeh'),
    (239, 'Seitan'),
    (240, 'Miso blanc'),
    (241, 'Miso rouge'),
    (242, 'Algues séchées'),
    (243, 'Houmous'),
    (244, 'Sauce tahini'),
    (245, 'Ghee'),
    (246, 'Eau');
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */
;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `recipe` (
    `id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, `summary` varchar(255) NOT NULL, `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `photo_url` varchar(255) DEFAULT NULL, `nb_serving` int NOT NULL, `validate_recipe` tinyint(1) NOT NULL, PRIMARY KEY (`id`), KEY `fk_user_recipe` (`user_id`), CONSTRAINT `fk_user_recipe` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `recipe`
--

/*!40000 ALTER TABLE `recipe` DISABLE KEYS */
;

INSERT INTO
    `recipe`
VALUES (
        1, 1, 'Salade Méditerranéenne', 'Une délicieuse salade méditerranéenne avec des tomates, du concombre, des olives et du fromage feta.', '2023-12-12 00:00:00', NULL, '/images/Recette 1.jpg', 4, 0
    ),
    (
        2, 2, 'Poulet au Curry', 'Un plat de poulet savoureux avec une sauce curry crémeuse et des légumes colorés.', '2023-12-11 00:00:00', NULL, '/images/Recette 2.jpg', 3, 0
    ),
    (
        3, 3, 'Pâtes à la Carbonara', 'Des pâtes crémeuses avec une sauce carbonara riche à base de bacon, de crème et de parmesan.', '2023-12-10 00:00:00', NULL, '/images/Recette 3.jpg', 2, 0
    ),
    (
        4, 4, 'Riz Frit aux Légumes', 'Un délicieux riz frit aux légumes avec des petits pois, des carottes et des œufs.', '2023-12-09 00:00:00', '2024-01-30 16:01:57', '/images/Recette 4.jpg', 4, 1
    ),
    (
        5, 5, 'Pizza Margherita', 'Une pizza classique avec une sauce tomate, de la mozzarella fraîche et des feuilles de basilic.', '2023-12-08 00:00:00', NULL, '/images/Recette 5.jpg', 3, 1
    ),
    (
        6, 6, 'Smoothie aux Fruits Rouges', 'Un smoothie rafraîchissant avec des fraises, des framboises et des myrtilles.', '2023-12-07 00:00:00', '2024-01-30 16:01:56', '/images/Recette 6.jpg', 2, 1
    ),
    (
        7, 7, 'Tarte aux Pommes', 'Une tarte sucrée aux pommes avec une délicieuse croûte dorée.', '2023-12-06 00:00:00', NULL, '/images/Recette 7.jpg', 8, 1
    ),
    (
        8, 7, 'Saumon Grillé', 'Saumon grillé avec une marinade au citron et aux herbes, servi avec des légumes rôtis.', '2023-12-05 00:00:00', NULL, '/images/Recette 8.jpg', 2, 1
    ),
    (
        9, 4, 'Gâteau au Chocolat', 'Un délicieux gâteau au chocolat moelleux avec un glaçage fondant.', '2023-12-04 00:00:00', NULL, '/images/Recette 9.jpg', 10, 1
    ),
    (
        10, 3, 'Salade de Quinoa aux Légumes', 'Une salade saine de quinoa avec des légumes frais et une vinaigrette légère.', '2023-12-03 00:00:00', NULL, '/images/Recette 10.jpg', 6, 1
    ),
    (
        11, 3, 'Bruschetta à la tomate', 'Bruschetta à la tomate', '2024-01-30 15:39:24', '2024-01-30 15:39:41', '/images/68748832-c416-426e-aaff-02b358f1e5de-pexels-maria-orlova-4969892.jpg', 4, 1
    ),
    (
        12, 3, 'Guacamole', 'C\'est frais, c\'est bon, c\'est l\'été !', '2024-01-30 15:43:24', '2024-01-30 15:43:37', '/images/ff9a86fe-6203-46cf-88b5-ffb9d109d14e-pexels-rdne-stock-project-5737569.jpg', 6, 1
    ),
    (
        13, 3, 'Poulet rôti aux herbes', 'Le poulet comme chez mamie le dimanche', '2024-01-30 15:47:37', '2024-01-30 16:01:54', '/images/faf2b5c7-7516-4dfe-9480-db629f30d898-pexels-hexuye-ye-12786973.jpg', 4, 1
    ),
    (
        14, 3, 'Limonade', 'La boisson de l\'été pour se rafraichir', '2024-01-30 15:53:28', '2024-01-30 16:01:53', '/images/81f22b35-6557-49fb-b297-fac79b924d17-pexels-designbyja-2109099.jpg', 4, 1
    ),
    (
        15, 3, 'Smoothie aux fruits', 'Pour vivre jusqu\'à 100 ans.', '2024-01-30 15:57:49', '2024-01-30 16:01:51', '/images/cb415e93-5eec-40e8-b6d9-a056403ae08d-banana-smoothie-recipes-759606-hero-01-d2abaa79f3204030a0ec0a8940456acc.jpg', 4, 1
    ),
    (
        16, 3, 'Butter Chiken', 'Pour voyager avec vos papilles ', '2024-01-30 16:01:27', '2024-01-30 16:01:49', '/images/29fc20bd-80cb-4e17-8adc-59ff0c414fed-butter-chicken-2-sur-2.jpg', 6, 1
    );
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */
;

--
-- Table structure for table `recipe_ingredient`
--

DROP TABLE IF EXISTS `recipe_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `recipe_ingredient` (
    `recipe_id` int NOT NULL, `ingredient_id` int NOT NULL, `quantity` int NOT NULL, `unit_id` int NOT NULL, PRIMARY KEY (
        `recipe_id`, `ingredient_id`, `unit_id`
    ), KEY `fk_ingredient_recipe_ingredient` (`ingredient_id`), KEY `fk_unit` (`unit_id`), CONSTRAINT `fk_ingredient_recipe_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`), CONSTRAINT `fk_recipe_recipe_ingredient` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_unit` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `recipe_ingredient`
--

/*!40000 ALTER TABLE `recipe_ingredient` DISABLE KEYS */
;

INSERT INTO
    `recipe_ingredient`
VALUES (1, 1, 1, 6),
    (1, 6, 2, 7),
    (1, 7, 1, 5),
    (1, 32, 10, 7),
    (1, 33, 100, 1),
    (2, 6, 2, 7),
    (2, 8, 1, 4),
    (2, 45, 500, 1),
    (2, 50, 4, 7),
    (2, 56, 200, 1),
    (3, 13, 50, 1),
    (3, 33, 50, 1),
    (3, 50, 3, 7),
    (3, 54, 150, 2),
    (3, 71, 300, 1),
    (4, 6, 1, 7),
    (4, 57, 50, 2),
    (4, 70, 200, 1),
    (4, 73, 150, 1),
    (4, 77, 1, 5),
    (5, 23, 3, 8),
    (5, 32, 10, 7),
    (5, 33, 200, 1),
    (5, 51, 300, 1),
    (5, 71, 1, 7),
    (6, 57, 200, 2),
    (6, 92, 1, 5),
    (6, 98, 50, 1),
    (6, 99, 50, 1),
    (6, 100, 50, 1),
    (7, 6, 3, 7),
    (7, 16, 100, 1),
    (7, 65, 1, 3),
    (7, 77, 1, 4),
    (7, 90, 4, 7),
    (8, 1, 1, 6),
    (8, 2, 1, 6),
    (8, 3, 1, 3),
    (8, 9, 5, 8),
    (8, 18, 1, 7),
    (8, 24, 5, 8),
    (8, 41, 800, 1),
    (9, 9, 3, 7),
    (9, 16, 150, 1),
    (9, 51, 200, 1),
    (9, 52, 200, 1),
    (9, 53, 150, 1),
    (10, 11, 1, 3),
    (10, 72, 1, 5),
    (10, 78, 1, 1),
    (10, 79, 100, 1),
    (10, 82, 1, 2),
    (11, 4, 1, 6),
    (11, 6, 2, 7),
    (11, 7, 15, 1),
    (11, 32, 6, 7),
    (12, 1, 1, 6),
    (12, 6, 1, 7),
    (12, 12, 3, 8),
    (12, 18, 1, 2),
    (12, 87, 2, 7),
    (13, 3, 3, 2),
    (13, 9, 5, 1),
    (13, 18, 5, 2),
    (13, 29, 5, 1),
    (13, 45, 1, 7),
    (14, 16, 20, 1),
    (14, 94, 2, 7),
    (15, 17, 3, 4),
    (15, 55, 1, 7),
    (15, 91, 3, 7),
    (15, 96, 1, 7),
    (15, 97, 1, 7),
    (16, 6, 4, 7),
    (16, 12, 3, 8),
    (16, 26, 5, 1),
    (16, 45, 1, 7),
    (16, 53, 200, 1);
/*!40000 ALTER TABLE `recipe_ingredient` ENABLE KEYS */
;

--
-- Table structure for table `recipe_tags`
--

DROP TABLE IF EXISTS `recipe_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `recipe_tags` (
    `recipe_id` int NOT NULL, `tags_id` int NOT NULL, PRIMARY KEY (`recipe_id`, `tags_id`), KEY `fk_tags_recipe_tags` (`tags_id`), CONSTRAINT `fk_recipe_recipe_tags` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_tags_recipe_tags` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `recipe_tags`
--

/*!40000 ALTER TABLE `recipe_tags` DISABLE KEYS */
;

INSERT INTO
    `recipe_tags`
VALUES (3, 1),
    (4, 1),
    (7, 1),
    (9, 1),
    (11, 1),
    (12, 1),
    (14, 1),
    (1, 2),
    (2, 2),
    (5, 2),
    (8, 2),
    (10, 2),
    (13, 2),
    (15, 2),
    (16, 2),
    (6, 3),
    (3, 4),
    (5, 4),
    (11, 4),
    (12, 4),
    (1, 5),
    (7, 5),
    (8, 5),
    (9, 5),
    (10, 5),
    (13, 5),
    (14, 5),
    (2, 6),
    (16, 6),
    (15, 7),
    (1, 8),
    (4, 8),
    (5, 8),
    (11, 8),
    (12, 8),
    (14, 8),
    (15, 8),
    (6, 9),
    (10, 9),
    (2, 10),
    (13, 10),
    (16, 10),
    (6, 11),
    (14, 11),
    (15, 11),
    (2, 12),
    (4, 12),
    (7, 12),
    (9, 12),
    (14, 12),
    (15, 12),
    (1, 13),
    (2, 13),
    (3, 13),
    (4, 13),
    (5, 13),
    (6, 13),
    (7, 13),
    (9, 13),
    (15, 13),
    (6, 14),
    (7, 14),
    (8, 14),
    (9, 14),
    (1, 15),
    (2, 15),
    (3, 15),
    (4, 15),
    (7, 15),
    (8, 15),
    (9, 15),
    (11, 15),
    (12, 15),
    (13, 15),
    (14, 15),
    (15, 15),
    (5, 16),
    (6, 16),
    (10, 16),
    (16, 16),
    (1, 18),
    (8, 18),
    (12, 18),
    (14, 18),
    (3, 19),
    (4, 19),
    (11, 19),
    (13, 19),
    (15, 19),
    (2, 20),
    (6, 20),
    (7, 20),
    (9, 20),
    (16, 20),
    (5, 22),
    (10, 22),
    (11, 24),
    (12, 24),
    (1, 25),
    (2, 25),
    (3, 25),
    (4, 25),
    (8, 25),
    (10, 25),
    (13, 25),
    (16, 25),
    (7, 26),
    (9, 26),
    (6, 27),
    (14, 27),
    (15, 27);
/*!40000 ALTER TABLE `recipe_tags` ENABLE KEYS */
;

--
-- Table structure for table `step`
--

DROP TABLE IF EXISTS `step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `step` (
    `id` int NOT NULL AUTO_INCREMENT, `recipe_id` int NOT NULL, `step_number` int NOT NULL, `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 86 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `step`
--

/*!40000 ALTER TABLE `step` DISABLE KEYS */
;

INSERT INTO
    `step`
VALUES (
        1, 1, 1, 'Lavez et coupez les tomates fraîches.'
    ),
    (
        2, 1, 2, 'Coupez le concombre et l\'oignon rouge en dés.'
    ),
    (
        3, 1, 3, 'Coupez les olives de Kalamata et le fromage feta.'
    ),
    (
        4, 1, 4, 'Mélangez tous les légumes et le fromage dans un grand bol.'
    ),
    (
        5, 1, 5, 'Arrosez la salade d\'huile d\'olive.'
    ),
    (
        6, 1, 6, 'Saupoudrez d\'origan séché et d\'une pincée de sel.'
    ),
    (
        7, 1, 7, 'Mélangez délicatement la salade pour combiner tous les ingrédients.'
    ),
    (
        8, 1, 8, 'Servez frais et régalez-vous !'
    ),
    (
        9, 2, 1, 'Coupez le poulet en morceaux.'
    ),
    (
        10, 2, 2, 'Coupez les oignons, les tomates et le gingembre.'
    ),
    (
        11, 2, 3, 'Chauffez de l\'huile dans une poêle et faites sauter les oignons coupés jusqu\'à ce qu\'ils soient dorés.'
    ),
    (
        12, 2, 4, 'Ajoutez les tomates et le gingembre coupés, faites cuire jusqu\'à ce que les tomates soient tendres.'
    ),
    (
        13, 2, 5, 'Ajoutez les morceaux de poulet et faites cuire jusqu\'à ce qu\'ils soient dorés de tous les côtés.'
    ),
    (
        14, 2, 6, 'Ajoutez le curry, le cumin, la coriandre et le sel selon votre goût.'
    ),
    (
        15, 2, 7, 'Versez le lait de coco et laissez mijoter jusqu\'à ce que le poulet soit bien cuit.'
    ),
    (
        16, 2, 8, 'Décorez avec du coriandre frais et servez sur du riz.'
    ),
    (
        17, 3, 1, 'Portez de l\'eau à ébullition et faites cuire les pâtes selon les instructions du paquet.'
    ),
    (
        18, 3, 2, 'Dans une poêle séparée, faites cuire le pancetta en dés jusqu\'à ce qu\'il soit croustillant.'
    ),
    (
        19, 3, 3, 'Fouettez ensemble les œufs, le parmesan râpé et le poivre dans un bol.'
    ),
    (
        20, 3, 4, 'Égouttez les pâtes cuites et ajoutez-les à la poêle avec le pancetta croustillant.'
    ),
    (
        21, 3, 5, 'Retirez la poêle du feu et remuez rapidement le mélange d\'œufs et de fromage.'
    ),
    (
        22, 3, 6, 'Continuez à remuer jusqu\'à ce que la sauce épaississe et enrobe les pâtes.'
    ),
    (
        23, 3, 7, 'Servez immédiatement, garni de parmesan supplémentaire et de poivre noir.'
    ),
    (
        24, 4, 1, 'Cuisez le riz selon les instructions du paquet et laissez-le refroidir.'
    ),
    (
        25, 4, 2, 'Coupez les carottes, les poivrons et les haricots verts en petits morceaux.'
    ),
    (
        26, 4, 3, 'Chauffez de l\'huile dans un wok ou une grande poêle à feu moyen.'
    ),
    (
        27, 4, 4, 'Ajoutez les légumes coupés et faites-les sauter jusqu\'à ce qu\'ils soient légèrement tendres.'
    ),
    (
        28, 4, 5, 'Poussez les légumes sur le côté du wok et cassez les œufs dans l\'espace vide.'
    ),
    (
        29, 4, 6, 'Brouillez les œufs et mélangez-les avec les légumes.'
    ),
    (
        30, 4, 7, 'Ajoutez le riz cuit et refroidi dans le wok, en rompant les grumeaux.'
    ),
    (
        31, 4, 8, 'Assaisonnez avec de la sauce soja, de l\'huile de sésame et du sel selon votre goût.'
    ),
    (
        32, 4, 9, 'Continuez à faire sauter jusqu\'à ce que le riz soit réchauffé et uniformément enrobé de sauce.'
    ),
    (
        33, 4, 10, 'Garnissez de ciboulette hachée et servez chaud.'
    ),
    (
        34, 5, 1, 'Préchauffez le four à 475°F (245°C).'
    ),
    (
        35, 5, 2, 'Étalez la pâte à pizza sur une surface farinée.'
    ),
    (
        36, 5, 3, 'Étalez la sauce tomate sur la pâte, en laissant une bordure pour la croûte.'
    ),
    (
        37, 5, 4, 'Ajoutez la mozzarella fraîche et les feuilles de basilic par-dessus.'
    ),
    (
        38, 5, 5, 'Faites cuire au four préchauffé jusqu\'à ce que la croûte soit dorée et le fromage soit bouillonnant.'
    ),
    (
        39, 5, 6, 'Retirez du four, découpez et servez.'
    ),
    (
        40, 6, 1, 'Mélangez des baies mélangées, du yaourt et du miel dans un blender.'
    ),
    (
        41, 6, 2, 'Mixez jusqu\'à obtention d\'un mélange lisse et crémeux.'
    ),
    (
        42, 6, 3, 'Versez le smoothie dans des verres et garnissez de baies supplémentaires.'
    ),
    (
        43, 7, 1, 'Préchauffez le four à 425°F (220°C).'
    ),
    (
        44, 7, 2, 'Pelez, évidez et coupez les pommes en tranches.'
    ),
    (
        45, 7, 3, 'Mélangez les pommes avec du sucre, de la cannelle et du jus de citron.'
    ),
    (
        46, 7, 4, 'Étalez la pâte à tarte et garnissez un moule à tarte.'
    ),
    (
        47, 7, 5, 'Remplissez la croûte avec le mélange de pommes.'
    ),
    (
        48, 7, 6, 'Couvrez d\'une deuxième croûte et scellez les bords.'
    ),
    (
        49, 7, 7, 'Faites des fentes dans la croûte supérieure pour permettre à la vapeur de s\'échapper.'
    ),
    (
        50, 7, 8, 'Faites cuire jusqu\'à ce que la croûte soit dorée et la garniture bouillonnante.'
    ),
    (
        51, 8, 1, 'Préchauffez le grill à feu moyen-élevé.'
    ),
    (
        52, 8, 2, 'Assaisonnez les filets de saumon avec du sel, du poivre et du jus de citron.'
    ),
    (
        53, 8, 3, 'Grillez le saumon pendant 4-5 minutes de chaque côté ou jusqu\'à ce qu\'il se défasse facilement à la fourchette.'
    ),
    (
        54, 9, 1, 'Préchauffez le four à 350°F (175°C).'
    ),
    (
        55, 9, 2, 'Graissez et farinez les moules à gâteau.'
    ),
    (
        56, 9, 3, 'Dans un bol, mélangez la farine, le cacao, le bicarbonate de soude et le sel.'
    ),
    (
        57, 9, 4, 'Dans un autre bol, battez les œufs, le sucre et l\'extrait de vanille.'
    ),
    (
        58, 9, 5, 'Ajoutez les ingrédients secs aux ingrédients humides et mélangez bien.'
    ),
    (
        59, 9, 6, 'Versez la pâte dans les moules préparés et faites cuire jusqu\'à ce qu\'un cure-dent en ressorte propre.'
    ),
    (
        60, 10, 1, 'Rincez le quinoa et faites-le cuire selon les instructions du paquet.'
    ),
    (
        61, 10, 2, 'Coupez une variété de légumes frais tels que concombre, poivrons et tomates cerises.'
    ),
    (
        62, 10, 3, 'Dans un grand bol, mélangez le quinoa cuit et les légumes coupés.'
    ),
    (
        63, 10, 4, 'Arrosez d\'huile d\'olive et de vinaigre balsamique, et mélangez pour bien enrober.'
    ),
    (
        64, 10, 5, 'Assaisonnez avec du sel, du poivre et vos herbes préférées.'
    ),
    (
        65, 11, 1, 'Faites grillier votre tartine de pain à souhait.'
    ),
    (
        66, 11, 2, 'Etaler la sauce tomate avec amour.'
    ),
    (
        67, 11, 3, 'Rajouter les autres ingrédients par dessus.'
    ),
    (
        68, 11, 4, 'Passer vos Bruschetta au grill.'
    ),
    (69, 11, 5, 'Déguster'),
    (
        70, 12, 1, 'Ecraser l\'avocat et les tomates.'
    ),
    (
        71, 12, 2, 'Ajouter le jus de citron, la coriande et la pincée de sel.'
    ),
    (
        72, 12, 3, 'Bien mélanger et laisser au frais avant de servir.'
    ),
    (
        73, 13, 1, 'Réaliser une belle marinade avec l\'huile, le thym, le romarin et le citron.'
    ),
    (
        74, 13, 2, 'A l\'aide d\'un pinceau, étaler la marinade sur le poulet.'
    ),
    (
        75, 13, 3, 'Faire cuire le poulet de 30 min à 45 min (selon la taille du poulet) à 220 degrée.'
    ),
    (
        76, 14, 1, 'Faites rouler le citron sur un plan de travail avec un pression dessus pour ensuite le presser.'
    ),
    (
        77, 14, 2, 'Mettre tous les ingrédients dans une bouteille.'
    ),
    (
        78, 14, 3, 'Mettre au frais et déguster.'
    ),
    (
        79, 14, 4, '(optionnel : si vous aimez la menthe, n\'hésitez pas à en ajouter une ou deux feuille)'
    ),
    (
        80, 15, 1, 'Mettre tous les ingrédients au mixer.'
    ),
    (
        81, 15, 2, 'Mixer jusqu\'à obtention d\'une texture idéal.'
    ),
    (
        82, 15, 3, 'Mettre au frais et déguster.'
    ),
    (
        83, 16, 1, 'Faire revenir le blanc de poulet avec le beurre.'
    ),
    (
        84, 16, 2, 'Ajouter les tomates et les épices.'
    ),
    (
        85, 16, 3, 'Déguster avec du riz.'
    );
/*!40000 ALTER TABLE `step` ENABLE KEYS */
;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `tags` (
    `id` int NOT NULL AUTO_INCREMENT, `category_id` int NOT NULL, `image_url` varchar(255) DEFAULT NULL, `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, PRIMARY KEY (`id`), KEY `fk_category` (`category_id`), CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `tags`
--

/*!40000 ALTER TABLE `tags` DISABLE KEYS */
;

INSERT INTO
    `tags`
VALUES (
        1, 1, '/images/1euros.png', '€'
    ),
    (
        2, 1, '/images/2euros.png', '€€'
    ),
    (
        3, 1, '/images/3euros.png', '€€€'
    ),
    (4, 2, '', 'Italien'),
    (5, 2, '', 'Français'),
    (6, 2, '', 'Indien'),
    (7, 2, '', 'Américain'),
    (8, 3, '', 'Végétarien'),
    (9, 3, '', 'Vegan'),
    (10, 3, '', 'Viandard'),
    (11, 3, '', 'Sans Gluten'),
    (12, 3, '', 'Sans lactose'),
    (13, 3, '', 'Sans porc'),
    (14, 3, '', 'Pescétarien'),
    (
        15, 4, '/images/chef15.png', 'Facile'
    ),
    (
        16, 4, '/images/chef16.png', 'Moyen'
    ),
    (
        17, 4, '/images/chef17.png', 'Difficile'
    ),
    (18, 5, '', '15 min'),
    (19, 5, '', '30 min'),
    (20, 5, '', '45 min'),
    (21, 5, '', '1h'),
    (22, 5, '', '1h30'),
    (23, 5, '', '2h+'),
    (24, 6, '', 'Entrée'),
    (25, 6, '', 'Plat'),
    (26, 6, '', 'Dessert'),
    (27, 6, '', 'Boisson'),
    (28, 6, '', 'Apéritif');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */
;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `unit` (
    `id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `unit`
--

/*!40000 ALTER TABLE `unit` DISABLE KEYS */
;

INSERT INTO
    `unit`
VALUES (1, 'g'),
    (2, 'mL'),
    (3, 'càs'),
    (4, 'càc'),
    (5, 'tasse(s)'),
    (6, 'pincée(s)'),
    (7, 'unité'),
    (8, 'feuille(s)');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */
;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT, `pseudo` varchar(20) NOT NULL, `email` varchar(255) NOT NULL, `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `hashed_password` varchar(255) NOT NULL, `is_admin` tinyint(1) NOT NULL DEFAULT '0', `avatar_id` int NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `fk_user_avatar` (`avatar_id`), CONSTRAINT `fk_user_avatar` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */
;

INSERT INTO
    `user`
VALUES (
        1, 'Nadine', 'user1@email.com', '2023-01-01 00:00:00', NULL, '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q', 1, 1
    ),
    (
        2, 'Hélène', 'user2@email.com', '2023-01-02 00:00:00', NULL, '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q', 1, 1
    ),
    (
        3, 'Irwin', 'admin1@email.com', '2023-01-03 00:00:00', NULL, '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q', 1, 1
    ),
    (
        4, 'Titouan', 'user3@email.com', '2023-01-04 00:00:00', NULL, '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q', 1, 1
    ),
    (
        5, 'Guillaume', 'user4@email.com', '2023-01-05 00:00:00', NULL, '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q', 1, 1
    ),
    (
        6, 'Lucas', 'admin2@email.com', '2023-01-06 00:00:00', NULL, '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q', 0, 1
    ),
    (
        7, 'Lucasz', 'user5@email.com', '2023-01-07 00:00:00', NULL, '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q', 0, 1
    );
/*!40000 ALTER TABLE `user` ENABLE KEYS */
;

--
-- Table structure for table `user_ingredient`
--

DROP TABLE IF EXISTS `user_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `user_ingredient` (
    `user_id` int NOT NULL, `ingredient_id` int NOT NULL, PRIMARY KEY (`user_id`, `ingredient_id`), KEY `fk_ingredient_user_ingredient` (`ingredient_id`), CONSTRAINT `fk_ingredient_user_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`), CONSTRAINT `fk_user_user_ingredient` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `user_ingredient`
--

/*!40000 ALTER TABLE `user_ingredient` DISABLE KEYS */
;

INSERT INTO
    `user_ingredient`
VALUES (1, 1),
    (6, 1),
    (1, 2),
    (2, 2),
    (7, 2),
    (2, 3),
    (1, 5),
    (2, 5),
    (7, 5),
    (1, 6),
    (3, 6),
    (4, 6),
    (3, 7),
    (3, 8),
    (1, 9),
    (4, 9);
/*!40000 ALTER TABLE `user_ingredient` ENABLE KEYS */
;

--
-- Table structure for table `user_tags`
--

DROP TABLE IF EXISTS `user_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `user_tags` (
    `user_id` int NOT NULL, `tags_id` int NOT NULL, PRIMARY KEY (`user_id`, `tags_id`), KEY `fk_tags_user_tags` (`tags_id`), CONSTRAINT `fk_tags_user_tags` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`), CONSTRAINT `fk_user_user_tags` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `user_tags`
--

/*!40000 ALTER TABLE `user_tags` DISABLE KEYS */
;

INSERT INTO
    `user_tags`
VALUES (1, 1),
    (1, 2),
    (2, 2),
    (4, 2),
    (1, 3),
    (2, 3),
    (3, 3),
    (3, 4),
    (1, 5),
    (2, 5),
    (1, 6),
    (3, 6),
    (4, 6);
/*!40000 ALTER TABLE `user_tags` ENABLE KEYS */
;

--
-- Dumping routines for database 'eatingnamnam'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-01-30 16:45:22