import Lepp from "./src/Lepp";
import Controller from "./src/utils/decorators/Controller";
import verbs from "./src/utils/decorators/Verbs";
import Use from "./src/utils/decorators/Use";

/**
 * Decoradores para la creación de extensiones
 * @see https://github.com/EnzoDiazDev/lepp
 */
export const decorators = {
    Controller,
    Use,
    ...verbs
};

export default Lepp;
