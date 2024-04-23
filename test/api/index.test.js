import appExpress from '../../api/index.js';
import request from 'supertest';


/**PRUEBAS UNITARIAS DE LAS APIS */
describe('Pruebas de API' , () =>{  

    /**TEST DEL API DE RECUPERACION LAS MARCAS */
    describe('GET - /api/brands - Recuperar todas las marcas' , () =>{  
        
        test('Deberia recuperar la informacion', async ()=>{
            const response =  await request(appExpress).get("/api/brands").send();
            expect(response.statusCode).toBe(200);
        });

    });


     /**TEST DEL API DE RECUPERACION LOS MODELOS */
     describe('GET - /api/models - Recuperar todos los modelos' , () =>{  
        
        test('Deberia recuperar la informacion', async ()=>{
            const response =  await request(appExpress).get("/api/models").send();
            expect(response.statusCode).toBe(200);
        });

    });
    
       /**TEST DEL API DE RECUPERACION LOS MODELOS */
    describe('GET - /api/brands/${id}/models - Recuperar todos los modelos mediante el id de la marca' , () =>{  
        
        test('Deberia recuperar la informacion', async ()=>{
            const id = 1;
            const response =  await request(appExpress).get(`/api/brands/${id}/models`).send();
            expect(response.statusCode).toBe(200);
        });

        test('Deberia recuperar la informacion', async ()=>{
            const id = null;
            const response =  await request(appExpress).get(`/api/brands/${id}/models`).send();
            expect(response.statusCode).toBe(400);
        });

    });

});

