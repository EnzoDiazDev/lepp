import jwt from "jsonwebtoken";

export default class JWT {
    private secret:string;

    constructor(_secret:string){
        this.secret = _secret;
    }

    public sign(payload:string|object|Buffer):string {
        return jwt.sign(payload, this.secret);
    }

    public verify(token:string):"error"|"expired"|unknown {
        if(!token) return "error";
        else {
            token = token.replace("Bearer ", "");
            return jwt.verify(token, this.secret, (err, decoded) => {
                if(err) {
                    if(err.name == "TokenExpiredError") return "expired";
                    else return "error";
                } else return decoded;
            });
        }
    }
}
