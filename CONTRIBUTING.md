# Contributing

Antes de contribuir en este repositorio, por favor
 * lee el [README.md](https://github.com/EnzoDiazDev/lepp/blob/master/README.md),
 * lee nuestro [CODE_OF_CONDUCT.md](https://github.com/EnzoDiazDev/lepp/blob/master/CODE_OF_CONDUCT.md),
 * visita nuestros [issues](https://github.com/EnzoDiazDev/lepp/issues),
 * considera formar parte de la discusión en *undefined*,
 * si es tu primera vez, lee un resumen de cómo contribuir: [Contribuir por primera vez en Github](https://gist.github.com/EnzoDiazDev/31e73d0573142d0573eb58d69a5158fd)
 * termina de leer este archivo. 

Crea un issue planteando el problema a resolver y espera una respuesta. </br>
Sé amable en la discusión y permite que los desarrolladores principales ofrezcan su ayuda para resolver los problemas.</br>
Siéntete libre de crear cualquier issue que tengas en mente. Todas las ideas son bienvenidas, pero asegúrate que ésta no haya sido planteada con anterioridad. 

## Objetivo
El objetivo de Lepp es ofrecer al programador final una interfaz sencilla. </br>
Inventemos un lema, algo así como </br>
A mayor complejidad, menos código. 

La interfaz en cuestión es la clase Lepp. Con esta se debe poder configurar todo el servidor, mediante la menor cantidad de métodos y propiedades posibles. </br>
Principalmente la clase debe estar perfectamente documentada mediante [JSDoc](https://jsdoc.app/), y testeada con [Jest](https://jestjs.io/)

Lepp está pensado para prototipos y proyectos demostrativos. La configuracion del servidor debe ser lo más resumida posible y lo más sencillo de implementar, incluso si se sacrifica control sobre la caracteristica, ya que esto resta protagonismo al proyecto que el programador final desea llevar a cabo. 

En esta librería debe concentrarse todo el caos arquitectónico que suele haber en proyectos de Express o Sockets.io (APIs en general), para que el programador final no tenga que verlo ni pensarlo.

## Contribuir
Como leíste en mi [guia](https://gist.github.com/EnzoDiazDev/31e73d0573142d0573eb58d69a5158fd), empezá forkeando y clonando el repositorio.

### Estructura
Cuando abras tu editor favorito, vas a ver algo como 
```
project/
├── src/
│   ├── extensions/
|   |   └── ...
|   |
│   ├── server/ 
|   |   ├── App.ts
|   │   └── ...
│   │
│   ├── utils/
|   |   └── ...
│   |
│   └── Lepp.ts
│    
├── index.js
├── package.json
├── .gitignore
├── tsconfig.json
├── .eslintrc.json
└── ...
```

`index.ts` es el punto de entrada de la librería, ahí se exportan la clase Lepp, los decoradores y las extensiones, nada más. 

`package.json`, `.gitignore`, `tsconfig.json`, `.eslintrc.json`, entre otros, son los archivos de configuración del entorno. Estos nos definen algunas reglas de estilo que hay que respetar. 

`src/Lepp.ts` La clase principal, que abstrae cualquer implementación que hay en la librería, para que el programador final sepa claramente qué hace cada cosa. Debe estar incluso sobredocumentada, con ejemplos y todo. Por lo general los métodos [delegan](https://es.wikipedia.org/wiki/Delegation_(patr%C3%B3n_de_dise%C3%B1o)) las tareas a otras clases. 

`src/extensions/*` Como su nombre lo indica se encuentran todas las extensiones. Un archivo, una extensión.

`src/server/*` Acá se encuentra la configuración de express, con todos métodos que interactuan con la instancia de express. 

`src/utils/*` Sí, todo lo que no sabés donde va, va en utils. Principalmente funciones, interfaces, y algoritmos auxiliares. Es un espacio más bien libre. 

En todo el proyecto a lógica es la misma: Cada archivo exporta por defecto una clase o una función con el mismo nombre del archivo.</br>
Evitá lo mas posible el uso de funciones individuales.

### Primeros pasos
En la raiz del proyecto, ejecuta el comando `npm i`.<br>
Crea una nueva rama.<br>

Dentro de la carpeta `src` Crea un archivo Main.ts, que es ingnorado por git, y pega lo siguiente:
```ts
if(process.env.NODE_ENV === "development") require("dotenv").config();
import Lepp from "./Lepp";

class Main {
    public static main():void {
        const lepp = new Lepp(3000);

        lepp.use_helmet()
            .use_bodyparser()
            .use_morgan("tiny");

        lepp.use_default_routes();
        lepp.run();
    }
}

Main.main();
```
Este archivo es el punto de entrada de desarrollo.<br>
Ejecuta `npm run dev`, e ingresa a `http://localhost:3000/` para ver que todo funcione. 

Para picar código, no olvides tener la extension [eslint](https://eslint.org/) instalada en tu editor de código favorito. 

Lee los [issues](https://github.com/EnzoDiazDev/lepp/issues), selecciona la tarea, y desarrolla la solución. 

### Estilo
Programar con estilo es clave. <br>
De todas formas, más allá de eslint, sos libre de programar como más te guste. 

Algunas buenas prácticas: 
* Define las variables y nombres de funciones en `snake_case` minúsculas.
* Evita a toda costa el código ofuscado. Una linea, una instruccion.
* Usa los [JSDoc](https://jsdoc.app/) SIEMPRE
* Una función/método, una accion. 
* Evita más de dos parámetros por función/método, sino se entiende que esa función hace demasiadas cosas.
* Define los tipos de datos siempre, incluyendo los de retorno. 
* Colócale nombres descriptivos a las funciones. Asegúrate que éstas o hagan exactamente lo que dice su nombre, no importa si suenan ridículos o son muy extensos.

### Más cosas
El contributing también se escribe a medida que surgen nuevas dudas.<br>
Por favor, deja un [issues](https://github.com/EnzoDiazDev/lepp/issues) con la etiqueta de `question` y pregunta lo que necesites saber. 
