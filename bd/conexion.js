import mysql from 'mysql';


export let connection = mysql.createConnection({
    host: "localhost",
    database: "catalogs",
    user: "root",
    password: "1234"
});


export const endConexion = () =>{
    connection.end();
};

export const openConnection = async () => {
    connection.connect( function(error){
       console.log(error)
        if(error){
            endConexion()
            throw error;
        }else{
            console.log("conexion exitosa")
        }
    })
};


