export type verbs = "get" | "put" | "post" | "update" | "delete";

interface RouteDefinition {
    path: string;
    requestMethod: verbs;
    methodName: string;
};

export default RouteDefinition;
