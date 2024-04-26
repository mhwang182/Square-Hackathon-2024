import { NextApiRequest, NextApiResponse } from "next"
import getConnection from "../../../utils/connection";
import { serialize } from 'cookie';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getPassword = async (email: string) => {
    const sql = `SELECT password FROM Users WHERE email='${email}'`;
    
    let password = [];
    try {
        const connection = await getConnection();

        const [results] = await connection.query(sql);
        password = results[0];

        await connection.end();
    } catch(error) {
        
        throw error;
    }
    
    if(!password) {
        return null;
    }
    return password['password'];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method !== 'POST') {
        res.status(400).json({});
        return;
    }

    const body = JSON.parse(req.body);

    try {
        const email = body.email;
        const plainPassword = body.password;

        const hashedPassword = await getPassword(email);
        // console.log('hashed password');
        // console.log(hashedPassword);
        if(!hashedPassword) {
            res.status(404).json({});
            return;
        }

        const match = bcrypt.compareSync(plainPassword, hashedPassword);

        if(!match) {
            res.status(400).json({loggedIn: "false"});
            return;
        }

        const token = jwt.sign({email: body.email}, process.env.JWT_SECRET);

        const cookie = serialize('square-token', token, {
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({loggedIn: "true"});
        return;
    } catch(error) {

    }
}

export default handler