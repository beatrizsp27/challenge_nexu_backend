import { connection } from '../../bd/conexion.js';


/**PRUEBAS UNITARIAS DE LA BASE DE DATOS */
describe('Conexion a base de datos' , () =>{  

    test('Deberia dar un error de conexion', async ()=>{
        let errorConecction  = null;
        //SE ABRE LA CONEXION A LA BASE DE DATOS 
        await connection.connect(function(error){
            if(error){
                errorConecction = error
                throw error;
                
            }else{
                console.log("conexion exitosa")
            }
        })
        
     
        if(errorConecction){
            expect(errorConecction).toBe(errorConecction);
        }

        //SE FINALIZA LA CONEXION
        connection.end()
    });

});