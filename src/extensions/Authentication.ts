import {Request, Response} from "express";
import Controller from "../utils/Controller";
import {Get} from "../utils/Verbs";

@Controller("/auth")
export default class Authentication {

    @Get("/login")
    public login(req:Request, res:Response):void {
        res.send("wip!");
    }
}
