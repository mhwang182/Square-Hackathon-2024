import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const cookie = serialize('square-token', '', {
        httpOnly: false,
        maxAge: -1,
        path: '/',
      })

    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({message: "success"});
}

export default handler