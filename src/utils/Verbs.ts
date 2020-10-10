import RouteDefinition, {verbs} from "./RouteDefinition";
import "reflect-metadata";

function decorator(verb:verbs, path:string) {
    return (target, propertyKey) => {
        if (! Reflect.hasMetadata("routes", target.constructor))
            Reflect.defineMetadata("routes", [], target.constructor);

        const routes = Reflect.getMetadata("routes", target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: verb,
            path,
            methodName: propertyKey
        });

        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}

export function Get(path:string):MethodDecorator {
    return decorator("get", path);
}

export function Put(path:string):MethodDecorator {
    return decorator("put", path);
}

export function Post(path:string):MethodDecorator {
    return decorator("post", path);
}

export function Update(path:string):MethodDecorator {
    return decorator("update", path);
}

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
