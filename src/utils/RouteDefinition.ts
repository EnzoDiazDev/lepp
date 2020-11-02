import {MiddlewareRoute} from "./RoutesTypes";

export type verbs = "get" | "post" | "put" | "head" | "delete" | "options" | "trace" | "copy" | "lock" | "mkcol" | "move" | "purge" | "propfind" | "proppatch" | "unlock" | "report" | "mkactivity" | "checkout" | "merge" | "m-search" | "notify" | "subscribe" | "unsubscribe" | "patch" | "search" | "connect";

interface RouteDefinition {
    path: string;
    requestMethod: verbs;
    methodName: string;
    middlewares: Array<MiddlewareRoute>;
};

export default RouteDefinition;
