import getConnection from "./connection";
import CryptoJS from "crypto-js";

export const getSquareAccessToken = async (email: string) => {
    const connection = await getConnection();

    const sql = `SELECT token FROM Users WHERE email='${email}'`;

    try {
        const [results] = await connection.query(sql);
        const res = results[0];
        await connection.end();

        if(!res) {
            return null;
        }

        const bytes = CryptoJS.AES.decrypt(res['token'], process.env.AES_KEY);
        const token = bytes.toString(CryptoJS.enc.Utf8);
 
        return token;
    } catch(error) {
        if(error){
            console.log(error);
        }
        await connection.end();
        return null;
    }
}