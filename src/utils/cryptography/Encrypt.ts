import bcrypt from "bcryptjs";

export default class Encrypt {
    public static encrypt_password(password:string, rounds = 5):Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(rounds, (err:Error, salt:string) => {
                if(err) reject(err);
                else bcrypt.hash(password, salt, (err, hash) => {
                    if(err) reject(err);
                    else resolve(hash);
                });
            });
        });
    }

    public static compare_password(input_password:string, stored_password:string):Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(input_password, stored_password, (err:Error, success) => {
                if(err) reject(err);
                else resolve(success);
            });
        });
    }
}
