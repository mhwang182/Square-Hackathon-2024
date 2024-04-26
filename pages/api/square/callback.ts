import { NextApiRequest, NextApiResponse } from "next"
import cookieParse from 'cookie-parse';
import axios from "axios";
import jwt from "jsonwebtoken";
import getConnection from "../../../utils/connection";

const setSquareAccessToken = async (squareToken: string, email: string) => {
    const sql = `UPDATE Users SET token='${squareToken}' WHERE email='${email}';`;
    const connection = await getConnection();
    await connection.execute(sql);
    await connection.end();
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method != "GET") {
        res.status(400).json({});
        return;
    }

    if(!req.query.code) {
        res.status(400).json({});
        return;
    }

    try {
        
        const code = req.query.code;
        // console.log('square access token code');
        // console.log(code);
        
        // console.log(req.headers.cookie);

        const parsedCookie = cookieParse.parse(req.headers.cookie);
        // console.log('parsed cookie');
        // console.log(parsedCookie);

        const decode = jwt.verify(parsedCookie['square-token'], process.env.JWT_SECRET);

        console.log(decode.email);

        const response = await axios.post(`${process.env.BASE_API_URL}/oauth2/token`, {
            "client_id": process.env.SQUARE_CLIENT_ID,
            "code": code,
            "grant_type": "authorization_code",
            "short_lived": false,
            "client_secret": process.env.SQUARE_APP_SECRET
        },{
            headers: {
                'Authorization': `Bearer ${process.env.SQUARE_APP_TOKEN}`
            }
        });
        
        // console.log("response");
        // console.log(response.data.access_token);
        const accessToken = response.data.access_token;

        await setSquareAccessToken(accessToken, decode.email);

        res.redirect('/');
    } catch(error) {
        console.log(error.response.data.errors)
        res.status(400).redirect('/');
    }
    
}

export default handler