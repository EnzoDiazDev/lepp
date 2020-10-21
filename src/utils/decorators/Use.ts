import {MiddlewareRoute} from "../RoutesTypes";
import RouteDefinition from "../RouteDefinition";

import "reflect-metadata";


export default function Use(...middlewares:Array<MiddlewareRoute>):MethodDecorator {
    return (target, propertyKey) => {
        if(!propertyKey) throw new Error("Controller middlewares are not suported yet");

        if (!Reflect.hasMetadata("routes", target.constructor))
            Reflect.defineMetadata("routes", [], target.constructor);

        const routes = Reflect.getMetadata("routes", target.constructor) as Array<RouteDefinition>;

        const index = routes.findIndex(route => route.methodName === propertyKey);

        if(index !== -1) {
            routes[index].middlewares = routes[index].middlewares.concat(middlewares);
        } else {
            routes.push({
                requestMethod: "get",
                path: "",
                methodName: propertyKey as string,
                middlewares: middlewares
            });
        }

        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
