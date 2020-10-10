import {NextFunction, Request, Response} from "express";

export type ExpressRoute = (request:Request, response:Response) => void;
export type MiddlewareRoute = (request:Request, response:Response, next:NextFunction) => void;
export type ErrorRoute = (error:Error, request:Request, response:Response, next:NextFunction) => void;
