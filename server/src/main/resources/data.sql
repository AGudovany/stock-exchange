INSERT INTO stock (name, description, current_price, last_update)
VALUES ('Stock 1', 'Stock Description 1', 181.96, curdate()),
       ('Stock 2', 'Stock Description 2', 87.19, curdate()),
       ('Stock 3', 'Stock Description 3', 158.62, curdate()),
       ('Stock 4', 'Stock Description 4', 122.6, curdate()),
       ('Stock 5', 'Stock Description 5', 96.32, curdate()),
       ('Stock 6', 'Stock Description 6', 17.51, curdate()),
       ('Stock 7', 'Stock Description 7', 110.66, curdate()),
       ('Stock 8', 'Stock Description 8', 152.06, curdate()),
       ('Stock 9', 'Stock Description 9', 12.23, curdate()),
       ('Stock 10', 'Stock Description 10', 195.74, curdate()),
       ('Stock 11', 'Stock Description 11', 16.53, curdate()),
       ('Stock 12', 'Stock Description 12', 41.06, curdate()),
       ('Stock 13', 'Stock Description 13', 152.22, curdate()),
       ('Stock 14', 'Stock Description 14', 153.86, curdate()),
       ('Stock 15', 'Stock Description 15', 147.98, curdate()),
       ('Stock 16', 'Stock Description 16', 130.51, curdate()),
       ('Stock 17', 'Stock Description 17', 143.13, curdate()),
       ('Stock 18', 'Stock Description 18', 177.99, curdate()),
       ('Stock 19', 'Stock Description 19', 85.04, curdate()),
       ('Stock 20', 'Stock Description 20', 114.24, curdate()),
       ('Stock 21', 'Stock Description 21', 115.07, curdate()),
       ('Stock 22', 'Stock Description 22', 196.2, curdate()),
       ('Stock 23', 'Stock Description 23', 194.99, curdate()),
       ('Stock 24', 'Stock Description 24', 91.26, curdate()),
       ('Stock 25', 'Stock Description 25', 85.31, curdate()),
       ('Stock 26', 'Stock Description 26', 161.99, curdate()),
       ('Stock 27', 'Stock Description 27', 27.8, curdate()),
       ('Stock 28', 'Stock Description 28', 118.68, curdate()),
       ('Stock 29', 'Stock Description 29', 187.29, curdate()),
       ('Stock 30', 'Stock Description 30', 195.28, curdate());

INSERT INTO stock_exchange (name, description, live_in_market)
VALUES ('Stock Exchange 1', 'Stock Exchange Description 1', true),
       ('Stock Exchange 2', 'Stock Exchange Description 2', false),
       ('Stock Exchange 3', 'Stock Exchange Description 3', true),
       ('Stock Exchange 4', 'Stock Exchange Description 4', false),
       ('Stock Exchange 5', 'Stock Exchange Description 5', true),
       ('Stock Exchange 6', 'Stock Exchange Description 6', false),
       ('Stock Exchange 7', 'Stock Exchange Description 7', false),
       ('Stock Exchange 8', 'Stock Exchange Description 8', true),
       ('Stock Exchange 9', 'Stock Exchange Description 9', false),
       ('Stock Exchange 10', 'Stock Exchange Description 10', false);

INSERT INTO exchange_to_stock (stock_exchange_id, stock_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (1, 6),
       (1, 7),
       (3, 12),
       (3, 13),
       (3, 14),
       (3, 15),
       (3, 16),
       (3, 17),
       (8, 12),
       (8, 13),
       (8, 14),
       (8, 15),
       (8, 16),
       (8, 17),
       (5, 22),
       (5, 23),
       (5, 24),
       (5, 25),
       (5, 26),
       (5, 27),
       (2, 22),
       (2, 23),
       (2, 24);

INSERT INTO users (username, password)
VALUES ('admin', 'admin'),
         ('user', 'user');