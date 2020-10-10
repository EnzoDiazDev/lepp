import Lepp from "./Lepp";
import Authentication from "./extensions/Authentication";
import Controller from "./utils/Controller";
import verbs from "./utils/Verbs";

export const extensions = {
    Authentication
};

export const decorators = {
    Controller,
    verbs
};

export default Lepp;
