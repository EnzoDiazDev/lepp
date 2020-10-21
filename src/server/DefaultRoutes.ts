import {ExpressRoute, ErrorRoute} from "../utils/RoutesTypes";

export default class DefaultRoutes {
    private index:ExpressRoute;
    private not_found:ExpressRoute;
    private internal_error:ErrorRoute;

    constructor(){
        this.index = (req, res) => {
            res.status(200).json({message: "Hello World!"});
        };

        this.not_found = (req, res) => {
            res.status(404).json({message: `The requested url '${req.url}' was not found`});
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.internal_error = (err, req, res, next) => {
            console.error(err);
            res.status(500).json({message: "Internal error"});
        };
    }

    public get index_route():ExpressRoute {
        return this.index;
    }

    public set index_route(route:ExpressRoute) {
        this.index = route;
    }

    public get not_found_route():ExpressRoute {
        return this.not_found;
    }

    public set not_found_route(route:ExpressRoute) {
        this.not_found = route;
    }

    public get interal_error_route():ErrorRoute {
        return this.internal_error;
    }

    public set interal_error_route(route:ErrorRoute) {
        this.internal_error = route;
    }
}
