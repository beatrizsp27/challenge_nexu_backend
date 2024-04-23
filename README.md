# Aplicación Challenge backend NEXU

## Índice de contenido

- [Requisitos: Tecnologías / IDES / Sistemas Operativos](#requisitos-tecnologías-ides-sistemas-operativos)
- [Estructura de carpetas del proyecto](#estructura-de-carpetas-del-proyecto)
- [Despliegue de proyecto](#despliegue-de-proyecto)
- [End points de prueba](#end-point-de-pruebas)
- [Autores del proyecto](#autores-del-proyecto)


## Requisitos: Tecnologías / IDES / Sistemas Operativos

- Node JS (versión 21.7.3)
- npm (versión 6.14.10)
- Visual Studio Code (versión: 1.45.1)
- Sistema operativo en Windows 10
- mysql server

## Estructura de carpetas del proyecto

- challengue_backend
    -	**model** (Clases donde se obtienen los datos de la base de datos)
    -	**bd** (Clases donde se tiene la conexion a base de datos)
    -	**docs** (archivo que contiene los archivos de base de datos)
    -	**service** (Clases de llamadas y consultas de Servicios REST)
    -	**test** (Contiene pruebas unitarias)
    -	**utilerias** (Constantes, valores, propiedades que serán utilizados en cualquier parte del código fuente)
    -	**request** (Archivos de pruebas de API (Para ejecutarlo es necesario tener visual studio code y REST Client v0.25.0 instalado)
    - **index** (archivo que contiene las estructura de las APIS)


## Despliegue de proyecto

- Es necesario tener instalado nodejs en la computadora donde se ejecutara el proyecto.
    - 1.- Ejecutar `npm install` para instalar los componentes requeridos.
    - 2.- después ejecutar `npm run start` o `npm run dev` a nivel root del proyecto para iniciar el servidor.

## End points de prueba

- Obtener todas las marcas
   - GET http://localhost:3001/api/brands  HTTP/1.1
- Obtener todas las modelos
   - GET http://localhost:3001/api/brands  HTTP/1.1
- Obtener el modelo mediante id de la marca
   - GET http://localhost:3001/api/brands/:id/models HTTP/1.1
- Guardar una marca
   - POST http://localhost:3001/api/brands HTTP/1.1
 - Guardar el modelo mediante id de la marca
   - POST http://localhost:3001/api/brands/:id/models HTTP/1.1
 - Actualizar modelo mediante id
   - POST http://localhost:3001/api/models/:id HTTP/1.1

## Ejecución de pruebas unitarias

- Para ejecutar las pruebas se debera ejecutar el siguiente comando.
  - `npm run test` para obtener el menu de opciones de pruebas.



## Autores del proyecto

- Beatriz Herández Hernández - Desarrollador FrontEnd
 
