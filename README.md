# LEPP
### Lottieexpress++
Es una extension de Express hecha con y para typescript.<br>

**Indice**
* [FAQ](#FAQ)
* [Empezar](#Empezar)
* [Extensiones](#Extensiones)
* [Middlewares](#Middlewares)
* [Ejemplos](#Ejemplos)

## FAQ
#### ¿Por qué otra librería?
LEPP permite crear el servidor de express más común en apenas unas lineas de código, permitiendo que la estructura del proyecto se limite a un único archivo. <br>
Esto ofrece una especial ventaja a la hora de crear prototipos o proyectos de portfolio, pues permite dar mayor visibilidad a tu funcionalidad o a tu algoritmo sin perderte entre las lineas y archivos de un proyecto típico de express. 

#### ¿Qué se sacrifica?
Absolutamente nada. <br> 
Seguís teniendo acceso a la instacia `app` de express, por ende podés seguir haciendo lo que siempre hiciste. <br>
LEPP no añade ninguna funcionalidad sin que ejecutes un método para ello.

#### ¿Qué otras ventajas ofrece?
* Typescript. Si eso no te convence, empeza por acá: https://www.typescriptlang.org/ <br>
* [Extensiones](#Extensiones). Las extensiones son un conjunto de rutas, controladores básicamete, que se escriben utilizando decoradores.

#### ¿No hay otra librería que haga esto? 
Sí, e infinitamente mejores que ésta, pero tenés que aprenderte toda la librería de nuevo.<br>
Acá solo aprendés a añadir extensiones (muy fácil).

#### ¿Está hecha para todes? 
Solo para quienes conozcan express y typescript. O sea que sí. 

#### ¿Cuándo debería y cuando no debería utilizar LEPP? 
Usalo cuando necesites mostrar tus algoritmos y funcionalidades, cuando necesites crear prototipos. <br>
No lo uses para proyectos profesionales porque no tiene mucho sentido, aunque nada te limita.

## Empezar
Inicia un proyecto de npm usando typescript. <br>
*También tengo un atajo para eso eh:* https://github.com/EnzoDiazDev/lottiets

Instala la librería<br>
`npm i @enzodiazdev/lepp`

Copia y pega.
```ts
import Lepp from "@enzodiazdev/lepp";

const lepp = new Lepp(3000); //<- Le pasas el puerto.

lepp.use_helmet()
  .use_bodyparser()
  .use_morgan("tiny"); //<- Seteas algunos middlewares, los que estén disponibles.

lepp.use_default_routes(); //<- Usa tres rutas predefinidas: index, error 404 y error 500.

//lepp.add_extension(Extension); //<- Acá añadírías tus extensiones. ANTES de iniciar el server, como siempre.

lepp.run(); //<- Iniciás el servidor 
```
Ejecutá tu programa y entrá a http://localhost:3000. 

## Extensiones
Las extensiones son un conjunto de rutas.<br>
LEPP provee un par de decoradores de clases y métodos para crearlas. <br>
 * Controller
 * Get, Put, Post, Update, Delete

**Pasos para crear una extension**
 * Importa los decoradores
 * Crea una clase con el nombre que quieras ponerle a tu extensión
 * Decora la clase con el decorador `Controller()`, si querés le pasas una ruta como parametro, para que todas las rutas que crees queden bajo esa.
 * La clase no necesita una funcion constructora para funcionar, ni extender niguna otra clase, solo requiere del decorador.
 * Crea un método y colocale el decorador del verbo que quieras: `@Get()`. Idealmente pasale como parametro una ruta para que tenga sentido crear rutas,¿no? 
 * Usa el método `.add_extension(Extension)` de tu instancia de `Lepp`, y pasale LA CLASE (no le pases una instacia), es decir la extension. 
 * Lee el código de abajo para que quede más claro

```ts
import Lepp, {decorators} from "@enzodiazdev/lepp";

//destructuring
const {Controller} = decorators;
const {Get} = decorators.verbs;

//GET http://localhost:PORT/foo/bar
@Controller("/foo")
class Foo {
  @Get("/bar")
  public bar(req:Request, res:Response){
    res.send("bar!");
  }
}

lepp.add_extension(Foo);
```

Muy fácil, ¿no?<br>
Podés usar extensiones predefinidas o las extensiones de otros, y reutilizarlas en otros proyectos.

**Extensiones predefinidas**
 * Ninguna por el momento. 

## Middlewares
Estos son los middlewares predefinidos, por popularidad. <br>
Igual podés añadir todos los que quieras usando el método `.use()`<br>
Para añadir más middlewares predefinidos, por favor crea un pull request o deja un [issue](https://github.com/EnzoDiazDev/lepp/issues) solicitandolo.
 * [Helmet](https://helmetjs.github.io/)
 * [cors](https://github.com/expressjs/cors)
 * [morgan](https://github.com/expressjs/morgan)
 * [body-parser](https://github.com/expressjs/body-parser)

## Ejemplos
Cuando vea que se pone un poco complicado de explicar, escribiré ejemplos, pero considero que es demasiado fácil de entender.

---
Licencia MIT. <br>
Metele a los issues por cualquier duda, idea o error que tengas. Ni lo dudes.<br>
