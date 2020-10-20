import RouteDefinition, {verbs} from "./RouteDefinition";
import "reflect-metadata";

function decorator(verb:verbs, path:string) {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata("routes", target.constructor))
            Reflect.defineMetadata("routes", [], target.constructor);

        const routes = Reflect.getMetadata("routes", target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: verb,
            path,
            methodName: propertyKey,
            middlewares: []
        });

        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}

/**
 * Decorador para los métodos de una extensión
 * @param path el endpoint
 * @example
   0Get("/foo")
   foo(req:Request, res:Response){
       res.send("bar!")
   }
 */
export function Get(path:string):MethodDecorator {
    return decorator("get", path);
}

/**
 * Decorador para los métodos de una extensión
 * @param path el endpoint
 * @example
   0Put("/foo")
   foo(req:Request, res:Response){
       res.send("bar!")
   }
 */
export function Put(path:string):MethodDecorator {
    return decorator("put", path);
}

/**
 * Decorador para los métodos de una extensión
 * @param path el endpoint
 * @example
   0Post("/foo")
   foo(req:Request, res:Response){
       res.send("bar!")
   }
 */
export function Post(path:string):MethodDecorator {
    return decorator("post", path);
}

/**
 * Decorador para los métodos de una extensión
 * @param path el endpoint
 * @example
   0Update("/foo")
   foo(req:Request, res:Response){
       res.send("bar!")
   }
 */
export function Update(path:string):MethodDecorator {
    return decorator("update", path);
}

/**
 * Decorador para los métodos de una extensión
 * @param path el endpoint
 * @example
   0Delete("/foo")
   foo(req:Request, res:Response){
       res.send("bar!")
   }
 */
export function Delete(path:string):MethodDecorator {
    return decorator("delete", path);
}

export default {
    Get,
    Put,
    Post,
    Update,
    Delete
};
