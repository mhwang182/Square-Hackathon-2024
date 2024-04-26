import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios";
import md5 from 'md5';
import { getSquareAccessToken } from "../../utils/dbUtils";
import cookieParse from 'cookie-parse';
import jwt from 'jsonwebtoken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const reqBody = (JSON.parse(req.body));

    if(req.method !== 'POST' || !reqBody.amount || !reqBody.customerId) {
        res.status(400).json({});
        return;
    }

    try {
        const customerId = reqBody.customerId;
        const amount =  reqBody.amount;

        const parsedCookie = cookieParse.parse(req.headers.cookie);

        const decode = jwt.verify(parsedCookie['square-token'], process.env.JWT_SECRET);
        const userEmail = decode.email;
        const accessToken = await getSquareAccessToken(userEmail); //hash eventually   

        const createResponse = await axios.post(`${process.env.BASE_API_URL}/v2/gift-cards`, {
            "gift_card": {
                "type": "DIGITAL"
            },
            "idempotency_key": md5(`${customerId}-${Date.now()}`),
            "location_id": "L1GZPV3VZAJN0"
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const giftCard = createResponse.data.gift_card;

        //link gift card to customer
        await axios.post(`${process.env.BASE_API_URL}/v2/gift-cards/${giftCard.id}/link-customer`, {
            "customer_id": customerId
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // activate and add amount to gift card
        await axios.post(`${process.env.BASE_API_URL}/v2/gift-cards/activities`, {
            "gift_card_activity": {
                "type": "ACTIVATE",
                "location_id": "L1GZPV3VZAJN0",
                "gift_card_gan": giftCard.gan,
                "activate_activity_details": {
                    "amount_money": {
                    "amount": amount * 100,
                    "currency": "USD"
                    },
                    "buyer_payment_instrument_ids": [
                    "test" //what is this?
                    ]
                }
            },
            "idempotency_key": md5(`${customerId}-${Date.now()}`)
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        const finalGiftCard = await axios.post(`${process.env.BASE_API_URL}/v2/gift-cards/from-gan`, {
            "gan": giftCard.gan
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.status(200).json(finalGiftCard.data.gift_card);
        return;
        
    } catch (error) {
        console.log(error.response.data.errors);
        res.status(400).json({});
        return;
    }
}

export default handler