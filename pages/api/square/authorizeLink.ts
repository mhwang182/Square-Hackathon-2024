import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken';

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method !== 'POST' || !req.headers.authorization) {
        res.status(400).json({});
    }

    let email = "";

    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        email = decode.email;
    } catch(error) {
        res.status(401).json({});
    }
    
    const link = `${process.env.BASE_API_URL}/oauth2/authorize?session=false&client_id=${process.env.SQUARE_CLIENT_ID}&scope=GIFTCARDS_READ%20CUSTOMERS_READ%20GIFTCARDS_WRITE%20MERCHANT_PROFILE_READ`

    res.status(200).json({link});
}

export default handler