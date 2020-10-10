import App from "./server/App";
import { CorsOptions } from "cors";
import {ExpressRoute, ErrorRoute} from "./utils/RoutesTypes";
import RouteDefinition from "./utils/RouteDefinition";
import { IncomingMessage, Server, ServerResponse } from "http";
import {Options} from "morgan";
import "reflect-metadata";

export default class Lepp {
    public app:App
    private extensions:string[] = [];

    constructor(_port:number){
        this.app = new App(_port);
    }

    public use(...handlers:any[]):Lepp {
        this.app.use(...handlers);
        return this;
    }

    public use_helmet():Lepp {
        this.app.use_helmet();
        return this;
    }

    public use_bodyparser():Lepp {
        this.app.use_bodyparser();
        return this;
    }

    public use_cors(options?:CorsOptions):Lepp {
        this.app.use_cors(options);
        return this;
    }

    public use_default_routes():void {
        this.app.use_default_routes();
    }

    public use_morgan(format = "combined", options?:Options<IncomingMessage, ServerResponse>):void {
        this.app.use_morgan(format, options);
    }

    public set index_route(route:ExpressRoute) {
        this.app.index_route = route;
    }

    public set not_found_route(route:ExpressRoute) {
        this.app.not_found_route = route;
    }

    public set interal_error_route(route:ErrorRoute) {
        this.app.interal_error_route = route;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public add_extension(Extension):void {
        const instance = new Extension();
        const prefix = Reflect.getMetadata("prefix", Extension);
        const routes:Array<RouteDefinition> = Reflect.getMetadata("routes", Extension);

        routes.forEach(route => {
            this.app.app[route.requestMethod](`${prefix}${route.path}`, (req, res) => {
                instance[route.methodName](req, res);
            });
        });
    }

    public run():void {
        this.app.start();
    }

    public get server():Server {
        return this.app.get_server();
    }
}
