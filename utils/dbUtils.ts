import getConnection from "./connection";

export const getSquareAccessToken = async (email: string) => {
    const connection = await getConnection();

    const sql = `SELECT token FROM Users WHERE email='${email}'`;

    try {
        const [results] = await connection.query(sql);
        const res = results[0];
        await connection.end();

        return res['token'];
    } catch(error) {
        if(error){
            console.log(error);
        }
        await connection.end();
        return null;
    }
}