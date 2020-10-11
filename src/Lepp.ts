import App from "./server/App";
import { CorsOptions } from "cors";
import {ExpressRoute, ErrorRoute} from "./utils/RoutesTypes";
import RouteDefinition from "./utils/RouteDefinition";
import { IncomingMessage, Server, ServerResponse } from "http";
import {Options} from "morgan";
import "reflect-metadata";

/**
 * Una maravilla de la vagancia.
 * @example
   const lepp = new Lepp(3000);

   lepp.use_helmet()
       .use_bodyparser()
       .use_cors()
       .use_morgan("tiny")
       .use_default_routes();

   lepp.run();
 * @see https://github.com/EnzoDiazDev/lepp
 */
export default class Lepp {
    public app:App

    /**
     * Crea la instancia de app de express.
     * @param _port El puerto para el servidor
     */
    constructor(_port:number){
        this.app = new App(_port);
    }

    /**
     * Pipe para agrega middlewares, exactamente igual que `app.use()`
     * @see http://expressjs.com/es/api.html#app.use
     * @param handlers middleware
     */
    public use(...handlers:any[]):Lepp {
        this.app.use(...handlers);
        return this;
    }

    /**
     * Añade el middleware helmet
     * @see https://helmetjs.github.io/
     */
    public use_helmet():Lepp {
        this.app.use_helmet();
        return this;
    }

    /**
     * Añade el middleware body-parser
     * @see http://expressjs.com/en/resources/middleware/body-parser.html
     */
    public use_bodyparser():Lepp {
        this.app.use_bodyparser();
        return this;
    }

    /**
     * Añade el middleware cors
     * @param options opciones de cors
     * @see http://expressjs.com/en/resources/middleware/cors.html
     */
    public use_cors(options?:CorsOptions):Lepp {
        this.app.use_cors(options);
        return this;
    }

    /**
     * Añade el middleware morgan
     * @param format formato de log
     * @param options opciones de morgan
     * @see https://github.com/expressjs/morgan
     */
    public use_morgan(format = "combined", options?:Options<IncomingMessage, ServerResponse>):void {
        this.app.use_morgan(format, options);
    }

    /**
     * Utiliza tres rutas predefinidas: index, 404 y 500.
     * Pueden ser modificadas posteriormente
     * @see `set` `index_route`
     * @see `set` `not_found_route`
     * @see `set` `interal_error_route`
     */
    public use_default_routes():void {
        this.app.use_default_routes();
    }

    /**
     * Setea la ruta principal http://localhost:PORT
     */
    public set index_route(route:ExpressRoute) {
        this.app.index_route = route;
    }

    /**
     * Setea la respuesta para 404 not found http://localhost:PORT/foobar
     */
    public set not_found_route(route:ExpressRoute) {
        this.app.not_found_route = route;
    }

    /**
     * Setea la respuesta para 500 server error.
     */
    public set interal_error_route(route:ErrorRoute) {
        this.app.interal_error_route = route;
    }

    /**
     * Añade una extensión, una clase (no una instancia) con el decorador `@Controller` para dotar de rutas al servidor.
     * @param Extension Cualquier clase con el decorador `@Controller`
     * @see https://github.com/EnzoDiazDev/lepp
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public add_extension(Extension):void {
        try {
            const instance = new Extension();
            const prefix = Reflect.getMetadata("prefix", Extension);
            const routes:Array<RouteDefinition> = Reflect.getMetadata("routes", Extension);

            routes.forEach(route => {
                this.app.app[route.requestMethod](`${prefix}${route.path}`, (req, res) => {
                    instance[route.methodName](req, res);
                });
            });
        } catch {
            throw new Error("Esta extensión es inválida");
        }
    }

    /**
     * Enciende el servidor en el puerto indicado al crear la instancia.
     */
    public run():void {
        this.app.start();
    }

    /**
     * Obtiene el HTTPServer de express; el servidor en sí.
     */
    public get server():Server {
        return this.app.get_server();
    }
}
