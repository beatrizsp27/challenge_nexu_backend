//importamos express
import express from 'express';
import path from 'path';
import { getBrands, getModelsById, getModels, updateModels, saveBrands } from '../models/index.js';

//se manda a llamar la funcion de espress
const appExpress = express();
const __dirname = path.resolve();

//soportar el request json
appExpress.use(express.json());


// Add headers before the routes are defined
appExpress.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
    
});

/**APIS */
appExpress.get('/', (request, response) =>{
    response.sendFile(path.join(__dirname + "/index.html"))
});

/**OBTENER MARCAS */
appExpress.get('/api/brands', async (request, response) =>{
    try{
        const brands = getBrands();
        console.log(brands);
        response.json({
            success: true,
            data: brands
        });
    }catch(e){
        console.log('error '+ JSON.stringify(e));
        response.status(404).json({
            title: 'Error',
            error: 'No se recupero información del servicio'
        });
    }
});

/**OBTENER MODELOS MEDIANTE EL ID DE LA MARCA */
appExpress.get('/api/brands/:id/models', async (request, response) =>{
    const id = request.params.id;
    console.log(id)

    if(id=== null || id === 'null'){
        return response.status(400).json({
            error: 'El identificador no puede ser nulo o vacio'
        });
    }

    try{
        const models = getModelsById(id);
        console.log(models);
        response.json({
            success: true,
            data: models
        });
    }catch(e){
        console.log('error '+ JSON.stringify(e));
        console.log(e);
        response.status(404).json({
            title: 'Error',
            error: 'No se recupero información del servicio' + e
        });
    }
   
});

appExpress.post('/api/brands', (request, response) => {

    //SE OBTIENE LA DATA QUE EL USUARIO AGREGO
    const brand = request.body;
    console.log(brand);


    //SE VALIDA QUE EL PRECIO SEA MAYOR A 100.000 EN CASO DE QUE NO SE LE NOTIFICARA AL USUARIO
    if(brand.name === null || brand.name === undefined || brand.name.trim() === ""){
        response.status(400).json({
            title: 'Error',
            error: 'El nombre no debe ser nullo o vacio'
        });
    }
  
    if(brand.average_price === null || brand.average_price === undefined || brand.average_price.trim() === ""){
        response.status(400).json({
            title: 'Error',
            error: 'El precio no debe ser nullo o vacio'
        });
    }

  
    try{

        const message = saveBrands(brand)

       //SE ENVIA UNA RESPUESTA EXITOSA EN CASO DE QUE HAYA SIDO AGREGADA CORRECTAMENTE
        response.send({
            success: true,
            message: message,
        });
    }catch(e){
        console.log('error '+ JSON.stringify(e));
        console.log(e);
        response.status(404).json({
            title: 'Error',
            error: 'Ocurrio un error ' + e
        });
    }
  });

  appExpress.post('/api/brands/:id/models', (request, response) => {

    //SE OBTIENE LA DATA QUE EL USUARIO AGREGO
    const brand = request.body;
    console.log(brand);
    const id = request.params.id;
    console.log(id)
  
    try{

        const message =  saveModelsById(brand. id);
       //SE ENVIA UNA RESPUESTA EXITOSA EN CASO DE QUE HAYA SIDO AGREGADA CORRECTAMENTE
        response.send({
            success: true,
            message: message,
        });
    }catch(e){
        console.log('error '+ JSON.stringify(e));
        console.log(e);
        response.status(404).json({
            title: 'Error',
            error: 'Ocurrio un error ' + e
        });
    }
  });


  appExpress.put('/api/brands/:id', (request, response)=>{
       //SE OBTIENE LA DATA QUE EL USUARIO AGREGO
       const brand = request.body;
       console.log(brand);
       const id = request.params.id;
       console.log(id)

       try{
        const message = updateModels(brand, id)
        //SE ENVIA UNA RESPUESTA EXITOSA EN CASO DE QUE HAYA SIDO ACTUALIZADO CORRECTAMENTE
         response.send({
             success: true,
             message: message,
         });
     }catch(e){
         console.log('error '+ JSON.stringify(e));
         console.log(e);
         response.status(404).json({
             title: 'Error',
             error: 'Ocurrio un error ' + e
         });
     }


  })


/**OBTENER MODELOS MEDIANTE EL ID DE LA MARCA */
appExpress.get('/api/models', async (request, response) =>{
    try{
        const models = getModels();
        console.log(models);
        response.json({
            success: true,
            data: models
        });
    }catch(e){
        console.log('error '+ JSON.stringify(e));
        console.log(e);
        response.status(404).json({
            title: 'Error',
            error: 'Ocurrio un error ' + e
        });
    }
   
});



export default appExpress;
