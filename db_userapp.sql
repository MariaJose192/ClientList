-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS db_userapp;

-- Usar la base de datos creada
USE db_userapp;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(150),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

-- Insertar datos de ejemplo
INSERT INTO users (name, lastname, email, username, password, image, address, phone)
VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'juanp', '123456', NULL, 'Calle Falsa 123, Madrid', '612345678'),
('Ana', 'García', 'ana.garcia@example.com', 'anag', 'abcdef', NULL, 'Av. Siempre Viva 742, Barcelona', '634567890'),
('Luis', 'Martínez', 'luis.martinez@example.com', 'luism', 'qwerty', NULL, 'Calle Luna 45, Sevilla', '622334455'),
('Marta', 'Fernández', 'marta.fernandez@example.com', 'martaf', 'zxcvbn', NULL, 'Av. Sol 100, Valencia', '677889900'),
('Pedro', 'López', 'pedro.lopez@example.com', 'pedrol', 'pass123', NULL, 'Calle Río 25, Zaragoza', '699112233'),
('Laura', 'Sánchez', 'laura.sanchez@example.com', 'lauras', 'mypass', NULL, 'Av. Montaña 56, Bilbao', '655443322'),
('Carlos', 'Torres', 'carlos.torres@example.com', 'carlost', 'admin2025', NULL, 'Calle Mar 11, Málaga', '688221100'),
('Elena', 'Díaz', 'elena.diaz@example.com', 'elenad', 'elena2025', NULL, 'Av. Parque 22, Murcia', '611223344'),
('Diego', 'Hernández', 'diego.hernandez@example.com', 'diegoh', 'h3rnandez', NULL, 'Calle Pino 78, Palma', '644556677'),
('Sofía', 'Morales', 'sofia.morales@example.com', 'sofiam', 'sofia2025', NULL, 'Av. Lago 33, Alicante', '699887766'),
('Miguel', 'Ramírez', 'miguel.ramirez@example.com', 'miguelr', 'ramirez1', NULL, 'Calle Olmo 12, Valladolid', '655667788'),
('Isabel', 'Castro', 'isabel.castro@example.com', 'isabelc', 'castro22', NULL, 'Av. Norte 88, Gijón', '677334455'),
('Andrés', 'Ortiz', 'andres.ortiz@example.com', 'andreso', 'ortiz333', NULL, 'Calle Centro 99, La Coruña', '633445566'),
('Patricia', 'Mendoza', 'patricia.mendoza@example.com', 'patriciam', 'pmendoza', NULL, 'Av. Sur 10, Granada', '688990011'),
('Francisco', 'Ruiz', 'francisco.ruiz@example.com', 'franruiz', 'ruiz444', NULL, 'Calle Este 14, Santander', '699334455');
