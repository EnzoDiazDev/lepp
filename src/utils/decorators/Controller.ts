/**
 * Indica que la clase será una extensión
 * @param prefix dirección base de las rutas
 */
export default function Controller(prefix = ""):ClassDecorator {
    return (target:any) => {
        Reflect.defineMetadata("prefix", prefix, target);

        if(!Reflect.hasMetadata("middlewares", target)){
            Reflect.defineMetadata("middlewares", [], target);
        }

        if (!Reflect.hasMetadata("routes", target)){
            Reflect.defineMetadata("routes", [], target);
        }
    };
};
