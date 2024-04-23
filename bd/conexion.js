import mysql from 'mysql';

let connection = mysql.createConnection({
    host: "localhost",
    database: "catalogs",
    user: "root",
    password: "1234"
});

const endConexion = () =>{
    connection.end();
}


export  { connection, endConexion } 