# Aplicación de Galería de Imágenes

Esta es una aplicación web simple que permite a los usuarios ver, agregar, editar y eliminar imágenes favoritas.

Las tecnologías utilizadas para el desarrollo han sido React para el front-end y Node, Express y MongoDB.

En cuanto a dependencias intaladas hay que resaltar Multer, utilizada para poder subir imágenes a la base de datos en Mongo.

## Instalación

Se necesitará tener instalado Node, Express y MongoDB para comprobar el uso de la aplicación.

Pasos a seguir:

Clonar el repositorio:
git clone https://github.com/andresvaz89/prueba-tecnica-F5

Navegar al directorio del lado CLIENTE de la aplicación:

cd prueba-tecnica-F5
cd favourite-images

Instala las dependencias del lado CLIENTE:

npm install

Navegar al directorio del SERVIDOR de la aplicación:
cd prueba-tecnica-F5
cd favourite-images
cd images-management-server

Instala las dependencias del lado SERVIDOR:

npm install

## Uso

Iniciar SERVIDOR
cd prueba-tecnica-F5
cd favourite-images
cd images-management-server
npm run dev

Esto iniciará el SERVIDOR de la aplicación.

Iniciar CLIENTE:
cd prueba-tecnica-F5
cd favourite-images
npm run dev

Esto iniciará la aplicación en modo de desarrollo. Abre http://localhost:5173 en el navegador para ver la iniciar el lado cliente y comenzar a utilizar la aplicación.

## Estructura del Proyecto

src/components: Contiene los componentes React de la aplicación.
src/pages: Páginas principales de la aplicación.
images-management-server/routes: Archivos para realizar solicitudes HTTP al servidor API.
