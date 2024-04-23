//importamos express
import express from 'express';
import path from 'path';
import { getBrands, getBrandsAndModelsById, getModels, updateModels, saveBrands, saveModelsById } from '../models/index.js';

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
        const models = getBrandsAndModelsById(id);
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


/*** GUARDAR MARCA */
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

  /**GUARDAR MODELOS */
  appExpress.post('/api/brands/:id/models', (request, response) => {

    //SE OBTIENE LA DATA QUE EL USUARIO AGREGO
    const models = request.body;
    console.log(models);
    const id = request.params.id;
    console.log(id)

    //SE VALIDA QUE EL PRECIO SEA MAYOR A 100.000 EN CASO DE QUE NO SE LE NOTIFICARA AL USUARIO
    if(models.name === null || models.name === undefined || models.name.trim() === ""){
        response.status(400).json({
            title: 'Error',
            error: 'El nombre no debe ser nullo o vacio'
        });
    }

    if(models.average_price === null || models.average_price === undefined || models.average_price.trim() === ""){
        response.status(400).json({
            title: 'Error',
            error: 'El precio no debe ser nullo o vacio'
        });
    }

    if( id === null ||id === undefined || id.trim() === ""){
        response.status(400).json({
            title: 'Error',
            error: 'El identificador no debe ser nulo o vacio'
        });
    }

  
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


  //ACTUALIZAR MODELO**/
  appExpress.put('/api/models/:id', (request, response)=>{
       //SE OBTIENE LA DATA QUE EL USUARIO AGREGO
       const model = request.body;
       console.log(model);
       const id = request.params.id;
       console.log(id)

       
       if( id === null ||id === undefined || id.trim() === ""){
            response.status(400).json({
                title: 'Error',
                error: 'El identificador no debe ser nulo o vacio'
            });
        }

        if(model.average_price === null || model.average_price === undefined || model.average_price.trim() === ""){
            response.status(400).json({
                title: 'Error',
                error: 'El precio no debe ser nullo o vacio'
            });
        }

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
