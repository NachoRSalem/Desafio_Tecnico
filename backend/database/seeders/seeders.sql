/*DATOS PARA POBLAR LA BASE*/
/*ROLES*/
INSERT INTO desafiotecnico.roles (tipo) VALUES('Administrador');
INSERT INTO desafiotecnico.roles (tipo) VALUES('Usuario');

/*USUARIOS*/

INSERT INTO desafiotecnico.usuarios (fullName, country, telefono, email, password, rol_tipo) VALUES('Nacho', 'Argentina', '1145896235', 'nacho@gmail.com', '', 'Administrador');
INSERT INTO desafiotecnico.usuarios (fullName, country, telefono, email, password, rol_tipo) VALUES('Usuario', 'Argentina', '123456789', 'usuario@outlook.com', '', 'Usuario');