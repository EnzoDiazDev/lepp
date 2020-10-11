import express, { Router } from "express";
import {ExpressRoute, ErrorRoute} from "../utils/RoutesTypes";
import DefaultRoutes from "./DefaultRoutes";
import helmet from "helmet";
import body_parser from "body-parser";
import cors, {CorsOptions} from "cors";
import { IncomingMessage, Server, ServerResponse } from "http";
import morgan, {Options} from "morgan";

export default class App {
    public app = express();
    private port = 3000;
    private server:Server|null = null;
    private default_routes = new DefaultRoutes();

    /**
     * Crea la instancia de app de express. Deshabilita la cabecera `"x-powered-by"`
     * @param _port El puerto para el servidor
     */
    constructor(_port = 3000){
        this.port = _port;

        this.app.disable("x-powered-by");
    }

    /**
     * Agrega middlewares, exactamente igual que `app.use()`
     * @see http://expressjs.com/es/api.html#app.use
     * @param handlers middleware
     */
    public use(...handlers:any[]):void {
        this.app.use(...handlers);
    }

    /**
     * Añade el middleware helmet
     * @see https://helmetjs.github.io/
     */
    public use_helmet():void {
        this.use(helmet());
    }

    /**
     * Añade el middleware body-parser
     * @see http://expressjs.com/en/resources/middleware/body-parser.html
     */
    public use_bodyparser():void {
        this.use(body_parser.urlencoded({extended:true}));
        this.use(body_parser.json());
    }

    /**
     * Añade el middleware cors
     * @param options opciones de cors
     * @see http://expressjs.com/en/resources/middleware/cors.html
     */
    public use_cors(options?:CorsOptions):void {
        this.use(cors(options));
    }

    /**
     * Añade el middleware morgan
     * @param format formato de log
     * @param options opciones de morgan
     * @see https://github.com/expressjs/morgan
     */
    public use_morgan(format = "combined", options?:Options<IncomingMessage, ServerResponse>):void {
        this.use(morgan(format, options));
    }

    /**
     * Utiliza tres rutas predefinidas: index, 404 y 500.
     * Pueden ser modificadas posteriormente
     * @see `set/get` `index_route`
     * @see `set/get` `not_found_route`
     * @see `set/get` `interal_error_route`
     */
    public use_default_routes():void {
        this.app.get("/", this.default_routes.index_route);
        this.use(this.default_routes.index_route);
        this.use(this.default_routes.not_found_route);
    }

    /**
     * En caso de estar enciendido, obtiene el HTTPServer de express; el servidor en sí. Sino lanzará error.
     */
    public get_server():Server {
        if(this.server) return this.server;
        else throw new Error("Server is not initialized");
    }

    /**
     * Setea la ruta principal http://localhost:PORT
     */
    public set index_route(route:ExpressRoute) {
        this.default_routes.index_route = route;
    }

    /**
     * Setea la respuesta para 404 not found http://localhost:PORT/foobar
     */
    public set not_found_route(route:ExpressRoute) {
        this.default_routes.not_found_route = route;
    }

    /**
     * Setea la respuesta para 500 server error.
     */
    public set interal_error_route(route:ErrorRoute) {
        this.default_routes.interal_error_route = route;
    }

    /**
     * Añade una instancia de Router al servidor.
     * @param router Una ruta
     * @see https://expressjs.com/es/guide/using-middleware.html#middleware.router
     */
    public add_router(router:Router):void {
        this.use(router);
    }

    /**
     * Enciende el servidor en el puerto indicado con un mensaje de aviso por consola.
     */
    public start():void {
        this.server = this.app.listen(this.port, () => console.log(`Server running: http://localhost:${this.port}`));
    }
}
