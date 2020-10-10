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

    constructor(_port = 3000){
        this.port = _port;

        this.app.disable("x-powered-by");
    }

    public use(...handlers:any[]):void {
        this.app.use(...handlers);
    }

    public use_helmet():void {
        this.use(helmet());
    }

    public use_bodyparser():void {
        this.use(body_parser.urlencoded({extended:true}));
        this.use(body_parser.json());
    }

    public use_cors(options?:CorsOptions):void {
        this.use(cors(options));
    }

    public use_morgan(format = "combined", options?:Options<IncomingMessage, ServerResponse>):void {
        this.use(morgan(format, options));
    }

    public use_default_routes():void {
        this.app.get("/", this.default_routes.index_route);
        this.use(this.default_routes.index_route);
        this.use(this.default_routes.not_found_route);
    }

    public get_server():Server {
        if(this.server) return this.server;
        else throw new Error("Server is not initialized");
    }

    public set index_route(route:ExpressRoute) {
        this.default_routes.index_route = route;
    }

    public set not_found_route(route:ExpressRoute) {
        this.default_routes.not_found_route = route;
    }

    public set interal_error_route(route:ErrorRoute) {
        this.default_routes.interal_error_route = route;
    }

    public add_router(router:Router):void {
        this.use(router);
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => console.log(`Server running: http://localhost:${this.port} -`));
    }
}
