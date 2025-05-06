const oracledb = require('oracledb');

const dbConnection = async () => {
    let connection;

    try{
        connection = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING
        });
        return connection;
    }catch(err){
        throw err; // Rethrow the error to be handled by the caller
    }
}

module.exports = dbConnection;