import {MiddlewareRoute} from "../RoutesTypes";
import RouteDefinition from "../RouteDefinition";

export default function Use(...middlewares:Array<MiddlewareRoute>):any {
    return (target:any, propertyKey:string) => {
        if(propertyKey) {
            //Middlewares para métodos

            if (!Reflect.hasMetadata("routes", target.constructor)){
                Reflect.defineMetadata("routes", [], target.constructor);
            }

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

        } else {
            //Middlewares para controladores
            if(!Reflect.hasMetadata("middlewares", target)){
                Reflect.defineMetadata("middlewares", [], target);
            }

            const controller_middlewares = Reflect.getMetadata("middlewares", target)
                .concat(middlewares);

            Reflect.defineMetadata("middlewares", controller_middlewares, target);
        }
    };
}
