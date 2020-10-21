import {MiddlewareRoute} from "./RoutesTypes";

export type verbs = "get" | "put" | "post" | "update" | "delete";

interface RouteDefinition {
    path: string;
    requestMethod: verbs;
    methodName: string;
    middlewares: Array<MiddlewareRoute>;
};

export default RouteDefinition;
