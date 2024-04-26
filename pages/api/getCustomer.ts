import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getSquareAccessToken } from "../../utils/dbUtils";
import cookieParse from 'cookie-parse';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const body = (JSON.parse(req.body));

    if(req.method !== 'POST' || !body.customerEmail) {
        res.status(400).json([]);
    }
    //verify if token is valid

    //get square token from db
    try{
        const parsedCookie = cookieParse.parse(req.headers.cookie);

        const decode = jwt.verify(parsedCookie['square-token'], process.env.JWT_SECRET);
        const userEmail = decode.email;


        const accessToken = await getSquareAccessToken(userEmail); //hash eventually   

        const response = await axios.post(`${process.env.BASE_API_URL}/v2/customers/search`, {
        "query": {
            "filter": {
                "email_address": {
                    "exact": body.customerEmail
                }
            }
        }},
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if(!response.data.customers) {
            res.status(404).json([]);
        }

        res.status(200).json(response.data.customers);
    } catch (error) {
        console.log(error);
        res.status(400).json([]);
    }
}

export default handler

