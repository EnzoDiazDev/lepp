import Lepp from "./src/Lepp";
import Authentication from "./src/extensions/Authentication";
import Controller from "./src/utils/Controller";
import verbs from "./src/utils/Verbs";

/**
 * Varias extensiones predefinidas.
 * @see https://github.com/EnzoDiazDev/lepp
 */
export const extensions = {
    Authentication
};

/**
 * Decoradores para la creación de extensiones
 * @see https://github.com/EnzoDiazDev/lepp
 */
export const decorators = {
    Controller,
    verbs
};

export default Lepp;
