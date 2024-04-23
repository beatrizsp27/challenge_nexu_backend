import mysql from 'mysql';

let connection = mysql.createConnection({
    host: "localhost",
    database: "vehicles",
    user: "root",
    password: ""
});

const endConexion = () =>{
    connection.end();
}


export  { connection, endConexion } 