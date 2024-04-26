import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.cookies['square-token']);

    if(!req.cookies['square-token']){
        res.status(200).json({loggedIn: false});
        return;
    }

    try {
        const token = req.cookies['square-token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded.email) {
            res.status(200).json({loggedIn: false});
            return;
        }
        res.status(200).json({loggedIn: true, token});
    } catch(error) {
        console.log(error);
        res.status(400).json({loggedIn: false})
    }
}

export default handler