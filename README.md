CCL Inventory Management System
=================================

Sistema de gestion de inventario para la empresa CCL, desarrollado con .NET Core 9 en el backend y Angular 19 en el frontend.


REQUISITOS PREVIOS
------------------

Antes de comenzar, asegurarse de tener instalado lo siguiente:

- .NET 9 SDK
- Node.js v18 o superior
- Angular CLI: npm install -g @angular/cli
- PostgreSQL v12 o superior
- Git


PASO 1: CLONAR EL REPOSITORIO
------------------------------

    git clone https://github.com/NicolasLinares2006/CCLInventory.git
    cd CCLInventory


PASO 2: PREPARAR LA BASE DE DATOS
-----------------------------------

Iniciar el servicio de PostgreSQL segun el sistema operativo:

    Linux:
        sudo service postgresql start

    Windows:
        psql -U postgres

Crear la base de datos:

    CREATE DATABASE ccl_inventory;
    \q


PASO 3: CONFIGURAR Y EJECUTAR EL BACKEND
------------------------------------------

Ingresar al directorio del backend:

    cd CCLInventory_back/CCLInventory.API

Abrir el archivo appsettings.json y actualizar la cadena de conexion:

    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Database=ccl_inventory;Username=postgres;Password=<tu_contrasena>"
    }

Restaurar dependencias, compilar y ejecutar:

    dotnet restore
    dotnet build
    dotnet run

Al iniciar, el sistema crea automaticamente las tablas y carga los datos iniciales.

- Backend disponible en:      http://localhost:5000
- Documentacion Swagger en:   http://localhost:5000/swagger


PASO 4: CONFIGURAR Y EJECUTAR EL FRONTEND
-------------------------------------------

Abrir una nueva terminal e ingresar al directorio del frontend:

    cd ccl-inventory-frontend

Nota Importante sobre la API:
Antes de iniciar, asegúrese de que la URL de conexión coincida con el puerto de su servidor Backend. Si su API de .NET se ejecuta en un puerto distinto al configurado por defecto (5000), debe ajustar el archivo de entorno:

Diríjase a: src/environments/environment.ts y src/environments/environment.development.ts

Modifique la propiedad apiUrl según corresponda:

TypeScript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api' // Ajustar puerto si es diferente a 5000
}

Instalar las dependencias:

    npm install

Iniciar la aplicacion:

    ng serve

- Frontend disponible en: http://localhost:4200


PASO 5: ACCEDER A LA APLICACION
---------------------------------

Abrir el navegador en http://localhost:4200 e iniciar sesion con las siguientes credenciales:

    Usuario:    admin
    Contrasena: admin123


PRUEBAS MANUALES
-----------------

1. Iniciar sesion con las credenciales proporcionadas.
2. Registrar un movimiento de entrada o salida de producto.
3. Consultar el inventario actualizado.
4. Verificar que las cantidades reflejen el movimiento registrado.


ENDPOINTS DE LA API
--------------------

    POST   /api/auth/login              Autenticacion de usuario
    POST   /api/productos/movimiento    Registrar entrada o salida
    GET    /api/productos/inventario    Consultar inventario actual


ESTRUCTURA DEL PROYECTO
-------------------------

    CCLInventory/
    ├── CCLInventory.API/               Backend .NET Core
    │   ├── Controllers/                Controladores de la API
    │   ├── Models/                     Modelos de datos
    │   ├── Data/                       DbContext y configuracion EF
    │   ├── Services/                   Servicio JWT
    │   └── Program.cs                  Punto de entrada y configuracion
    │
    └── ccl-inventory-frontend/         Frontend Angular
        └── src/app/
            ├── components/             Componentes de la UI
            ├── services/               Clientes HTTP para la API
            ├── guards/                 Guardas de autenticacion
            └── app.routes.ts           Configuracion de rutas


FUNCIONALIDADES
----------------

Backend:
- Autenticacion con JWT
- Proteccion de endpoints
- Integracion con PostgreSQL via Entity Framework Core
- Datos iniciales precargados al arrancar
- API RESTful

Frontend:
- Login con almacenamiento de token JWT
- Formulario de movimientos con validaciones reactivas
- Tabla de inventario con indicador visual de bajo stock
- Rutas protegidas por guard de autenticacion
- Diseno responsive


TECNOLOGIAS UTILIZADAS
-----------------------

    Backend:   .NET Core 9 | Entity Framework Core | PostgreSQL | JWT
    Frontend:  Angular 19  | TypeScript             | HttpClient | Angular Router
