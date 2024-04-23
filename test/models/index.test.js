import { getBrands } from '../../models/index.js';


/**PRUEBAS UNITARIAS DE LAS APIS */
describe('Pruebas de Modelos' , () =>{  

    /**TEST DE PRUEBAS UNITARIAS DEL RECUPERAR DESCRIPCION */
    describe('Recuperar marcas' , () =>{  
        test('Deberia recuperar la informacion', async ()=>{
            const response = await getBrands();
            console.log(response)
            const dataExpect = [];
            // eslint-disable-next-line no-undef
            expect(response).toEqual(dataExpect);
        });
    });


});