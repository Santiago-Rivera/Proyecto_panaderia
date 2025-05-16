-- Creación de tablas y relaciones para la panadería

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL
);

CREATE TABLE mercaderia (
    id_mercaderia SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    unidad VARCHAR(20),
    fecha_ingreso DATE NOT NULL
);

CREATE TABLE inventarios (
    id_inventario SERIAL PRIMARY KEY,
    id_mercaderia INT REFERENCES mercaderia(id_mercaderia),
    id_producto INT REFERENCES productos(id_producto),
    stock INT NOT NULL,
    fecha_actualizacion DATE NOT NULL
);

CREATE TABLE rutas (
    id_ruta SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE transporte (
    id_transporte SERIAL PRIMARY KEY,
    placa VARCHAR(20) NOT NULL,
    tipo VARCHAR(50),
    capacidad INT
);

CREATE TABLE trabajadores (
    id_trabajador SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    telefono VARCHAR(20)
);

CREATE TABLE servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_trabajador INT REFERENCES trabajadores(id_trabajador)
);

-- Relación entre rutas y transporte (una ruta puede tener varios transportes y viceversa)
CREATE TABLE rutas_transporte (
    id SERIAL PRIMARY KEY,
    id_ruta INT REFERENCES rutas(id_ruta),
    id_transporte INT REFERENCES transporte(id_transporte)
);

-- Relación entre productos y servicios (opcional, si un servicio usa un producto)
CREATE TABLE productos_servicios (
    id SERIAL PRIMARY KEY,
    id_producto INT REFERENCES productos(id_producto),
    id_servicio INT REFERENCES servicios(id_servicio)
);