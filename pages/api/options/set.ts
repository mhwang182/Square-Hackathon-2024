import { NextApiRequest, NextApiResponse } from "next"
import getConnection from "../../../utils/connection";
import jwt from 'jsonwebtoken';
import cookieParse from 'cookie-parse';

const setSquareAccessToken = async (rouletteOptions: string, email: string) => {
    const sql = `UPDATE Users SET roulette_options='${rouletteOptions}' WHERE email='${email}';`;
    const connection = await getConnection();
    await connection.execute(sql);
    await connection.end();
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const body = JSON.parse(req.body);

    if(req.method !== 'POST') {
        res.status(400).json({});
        return;
    }

    try {
        const parsedCookie = cookieParse.parse(req.headers.cookie);
        const decode = jwt.verify(parsedCookie['square-token'], process.env.JWT_SECRET);
        const options = body.options;

        if(!decode.email || !options) {
            res.status(400).json({});
            return;
        }

        await setSquareAccessToken(options, decode.email);
        res.status(200).json({options});

    } catch(error) {
        console.log(error);
        res.status(400).json({});
    }
}

export default handler