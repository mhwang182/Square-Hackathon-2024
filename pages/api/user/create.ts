import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { serialize } from 'cookie';
import jwt from "jsonwebtoken";
import getConnection from "../../../utils/connection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if(req.method !== "POST") {
        res.status(400).json({});
        return;
    }      

    const body = JSON.parse(req.body);

    try {
        const password = body.password;
        
        const salt = "$2b$10$c6pJtNIkORGbgHNlBd4/YO";
        const hashedPassword = bcrypt.hashSync(password, salt);

        const sql = `INSERT INTO Users (email, password) VALUES ('${body.email}', '${hashedPassword}');`;
        const connection = await getConnection();

        await connection.query(sql);
        await connection.end();

        const token = jwt.sign({email: body.email}, process.env.JWT_SECRET);

        const cookie = serialize('square-token', token, {
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
          })

        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({message: "success"});
    
    } catch(error) {
        console.log(error);
        res.status(400).json({});
        
    }
}

export default handler