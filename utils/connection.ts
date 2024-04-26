import mysql from 'mysql2/promise';

const getConnection = async () => {
    const connection =  await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: parseInt(process.env.DB_PORT),
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    });
    return connection;
}


export default getConnection;