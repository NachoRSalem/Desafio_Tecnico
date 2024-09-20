-- SCRIPT SQL PARA LA CREACION DE LA BASE DE DATOS

DROP DATABASE IF EXISTS desafiotecnico;

CREATE DATABASE IF NOT EXISTS desafiotecnico 
	CHARACTER SET utf8mb4 
	COLLATE utf8mb4_general_ci;


USE desafiotecnico;



CREATE TABLE IF NOT EXISTS roles (
    tipo VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	fullName VARCHAR(255) NOT NULL,
	country VARCHAR(255) NOT NULL,
	telefono VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    rol_tipo VARCHAR(255) NOT NULL,
    KEY `usuarios_rol_fk` (`rol_tipo`),
    CONSTRAINT `usuarios_rol_fk` FOREIGN KEY (`rol_tipo`) REFERENCES `roles` (`tipo`)
);

