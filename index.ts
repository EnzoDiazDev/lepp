import Lepp from "./src/Lepp";
import Authentication from "./src/extensions/Authentication";
import Controller from "./src/utils/Controller";
import verbs from "./src/utils/Verbs";

export const extensions = {
    Authentication
};

export const decorators = {
    Controller,
    verbs
};

export default Lepp;
