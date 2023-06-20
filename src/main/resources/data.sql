---------- USERS ------------

--harry.potter@hgwrts.com/pass
INSERT INTO "_user"
(id, email, firstname, lastname, "password", "role")
VALUES(1, 'harry', 'Harry', 'Potter', '$2a$10$P6G7ztCfBQ.zN0f4SQuSLexql1DicStxH2gb/MeyX7dEVmtmbTEaO', 'USER');
INSERT INTO "_user"
(id, email, firstname, lastname, "password", "role")
VALUES(2, 'ron', 'Ron', 'Weasley', '$2a$10$P6G7ztCfBQ.zN0f4SQuSLexql1DicStxH2gb/MeyX7dEVmtmbTEaO', 'USER');
INSERT INTO "_user"
(id, email, firstname, lastname, "password", "role")
VALUES(3, 'hermione', 'Hermione', 'Granger', '$2a$10$P6G7ztCfBQ.zN0f4SQuSLexql1DicStxH2gb/MeyX7dEVmtmbTEaO', 'USER');

SELECT setval('_user_seq', (SELECT max(id) FROM _user));

---------- Friends ------------
INSERT INTO "friend"
(id, friend_one_id, friend_two_id, status)
VALUES(1, 1, 2, 'ACCEPTED');
INSERT INTO "friend"
(id, friend_one_id, friend_two_id, status)
VALUES(2, 1, 3, 'ACCEPTED');
INSERT INTO "friend"
(id, friend_one_id, friend_two_id, status)
VALUES(3, 2, 3, 'PENDING');

SELECT setval('friend_id_seq', (SELECT max(id) FROM _user));

---------- PROJECTS ------------
INSERT INTO public.project (id,description,"name",owner_id,visibility) VALUES
                                                               (1,'L''italiano e'' fantastico!','Italiano',1, 'PRIVATE'),
                                                               (2,'Mastering javascript','JavaScript',1, 'PRIVATE'),
                                                               (3,'Mastering Java','Java',1, 'PRIVATE'),
                                                               (4,'Mastering GO','Go',1, 'PUBLIC');
SELECT setval('project_seq', (SELECT max(id) FROM project));

---------- Collections ------------
INSERT INTO public.collection (id,description,"name",project_id) VALUES
                                                                     (1,'Słówka z pierwszej lekcji','Lezione 1',1),
                                                                     (2,'Słówka z lekcji 2.','Lezione 2',1),
                                                                     (3,'Słówka z lekcji 3.','Lezione 3',1),
                                                                     (4,'Czasowniki','I verbi',1);
SELECT setval('collection_seq', (SELECT max(id) FROM collection));

---------- Flashcards ------------
INSERT INTO public.flash_card (id,back,front,collection_id) VALUES
                                                                (1,'essere','być',1),
                                                                (2,'avere','mieć',1),
                                                                (3,'potere','móc',1),
                                                                (4,'fare','robić',1),
                                                                (5,'dire','mówić',1),
                                                                (6,'venire','przyjść',1),
                                                                (7,'dovere','musieć',1),
                                                                (8,'dare','dawać',1),
                                                                (9,'andare','iść',1),
                                                                (10,'vedere','widzieć',1);
INSERT INTO public.flash_card (id,back,front,collection_id) VALUES
                                                                (11,'mieszkać','żyć',1),
                                                                (12,'capire','rozumieć',1),
                                                                (13,'arrivare','przybywać',1),
                                                                (14,'aspettare','czekać',1),
                                                                (15,'bere','pić',1),
                                                                (16,'chiedere','pytać',1),
                                                                (17,'cominciare','zaczynać',1),
                                                                (18,'comprare','kupować',2),
                                                                (19,'conoscere','znać',2),
                                                                (20,'finire','kończyć',2);
SELECT setval('flash_card_seq', (SELECT max(id) FROM flash_card));