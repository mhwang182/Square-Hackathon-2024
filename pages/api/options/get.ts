import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken";
import getConnection from "../../../utils/connection";

const getOptions = async (email: string) => {
    const connection = await getConnection();

    const sql = `SELECT roulette_options FROM Users WHERE email='${email}'`;

    try {
        const [results] = await connection.query(sql);
        const res = results[0];
        await connection.end();

        if(!res) {
            return null;
        }

        return res['roulette_options'];
    } catch(error) {
        if(error){
            console.log(error);
        }
        await connection.end();
        return null;
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method !== 'GET') {
        res.status(400).json({hasToken: false});
        return;
    }

    try {
        const token = req.cookies['square-token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded.email) {
            res.status(400).json({});
            return;
        }

        const options = await getOptions(decoded.email);
        if(!options) {
            res.status(200).json({});
            return;
        }
        
        res.status(200).json({options: JSON.parse(options)});

    } catch(error) {
        console.log(error);
        res.status(400).json({});
        return;
    }
}

export default handler