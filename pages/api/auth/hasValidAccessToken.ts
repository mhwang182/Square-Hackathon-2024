import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken";
import { getSquareAccessToken } from "../../../utils/dbUtils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method !== 'POST') {
        res.status(400).json({hasToken: false});
        return;
    }

    try {
        const token = req.cookies['square-token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded.email) {
            res.status(400).json({hasToken: false});
            return;
        }

        const squareToken = await getSquareAccessToken(decoded.email);
        if(!squareToken) {
            res.status(200).json({hasToken: false});
            return;
        }

        res.status(200).json({hasToken: true});

    } catch(error) {
        console.log(error);
        res.status(400).json({hasToken: false});
        return;
    }
    
    
}

export default handler