import appExpress from '../../api/index.js';
import request from 'supertest';


/**PRUEBAS UNITARIAS DE LAS APIS */
describe('Pruebas de API' , () =>{  

    /**TEST DEL API DE RECUPERACION DE PRODUCTO MEDIANTE ID */
    describe('GET - /api/brands - Recuperar todas las marcas' , () =>{  
        
        test('Deberia recuperar la informacion', async ()=>{
            const response =  await request(appExpress).get("/api/brands").send();
            expect(response.statusCode).toBe(200);
        });

    });
    

});

