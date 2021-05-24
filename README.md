<p align="center">
    <img height="128" src="src/assets/icons/android-chrome-192x192.png">
<p>

# Proyecto Paraísos

Aplicación web/móvil para el área de Ecología de la Facultad de Química, Bioquímica y Farmacia de la Universidad Nacional de San Luis, Argentina.

Desarrollada con tecnologías web (HTML, CSS, TypeScript, Angular, Ionic y Firebase) como trabajo final de Tesis para la carrera de Ingeniería en Informática

## Acerca del proyecto

Esta aplicación tiene por finalidad el servir de herramienta a los interesados en la realización de un censo del arbolado público de la ciudad de San Luis (San Luis, Argentina), el análisis de los datos obtenidos y la presentación de la información cualitativa y cuantitativa de manera clara y concisa a la comunidad local.

## F.A.Q.

Puede acceder al **F.A.Q** en formato `.pdf` desde [aquí](docs/faq.pdf).

## Para desarrolladores

### Dependencias

Es necesario contar con `Node.JS`, `Ionic CLI` y `Angular CLI`.

- Puede obtener `Node` desde el sitio web oficial: https://nodejs.org/

- Para instalar el resto de las dependencias, ejecute el siguiente comando en su terminal:
```
> npm install -g @angular/cli @ionic/cli
```

### Compilar y ejecutar

```
> git clone https://github.com/emlautarom1/ProyectoParaisos.git
> cd ProyectoParaisos
> npm install
> ionic serve
```

### Deployment

Este proyecto hace gran uso de los servicios de:
  - [Firebase](https://firebase.google.com/): Autenticación, Firebase Storage, Firebase Store.
  - [Google Maps](https://www.google.com.ar/maps).

Debe configurar sus claves de **API** modificando los valores de los archivos:
  - `src/environments/environment.ts`
  - `src/environments/environment.prod.ts`

Una vez ajustados, puede ejecutar:
```
> npm run deploy
```

## Licencia

Este proyecto utiliza la licencia **[MIT](LICENSE)**.