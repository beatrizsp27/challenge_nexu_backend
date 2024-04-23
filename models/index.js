import { connection, openConnection } from "../bd/conexion.js"
import util from 'util'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

openConnection();
// node native promisify
const query = util.promisify(connection.query).bind(connection); 

export const getBrands = async () =>{
  console.log("getBrands")
  let brandsList = [];
   
  try{
      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
      let brands = "SELECT * FROM BRANDS";
      //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
      const rows = await query(brands);
      console.log(JSON.stringify(rows));
      brandsList = rows
    }catch(e){
      console.log(e)
      throw e
    } finally {
      console.log("finally")
      //connection.end();
    }
  return brandsList

}

/**
 * Obtener todas las marcas y modelos
 */
export const getBrandsAndModelsById = async (id) =>{
  let modelAndBrand = [];

      try{
        //SE REALIZA LA CONSULTA A LA BASE DE DATOS
        let brandsAndModels = "SELECT b.id, b.name, m.name, m.average_price  FROM BRANDS b INNER JOIN MODELS m ON brands_id = '"+id+"'";
        const rows = await query(brandsAndModels);
        modelAndBrand =  rows
      }catch(e){
        console.log(e)
        throw e
      }finally {
        console.log("finally")
        connection.end();
      }

   return modelAndBrand
  
}


export const getModelsById = async (id) =>{

    let modelsList = [];
      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    connection.query(models, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      return result
    });

    try{
      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
      let models = "SELECT * FROM MODELS WHERE id = '"+id+"'";
      const rows = await query(models);
      modelsList =  rows

    }catch(e){
      console.log(e)
      connection.end();
      throw e
    }finally {
      console.log("finally")
      connection.end();
    }

    return modelsList
}




export const getModels = async (greater, lower ) => {

      let listModels = [];

      try{

        let models = "SELECT b.id, b.name, m.name, m.average_price  FROM BRANDS b INNER JOIN MODELS m "

        if(greater && lower ){
           //SE REALIZA LA CONSULTA A LA BASE DE DATOS
           models = models + " ON average_price between '"+lower+"' and '"+greater+"'"
        }else{
  
          if(greater){
            models = models +  "WHERE m.average_price = '"+lower+"'"
          }
    
          if(lower){
             models = models + "WHERE m.average_price = '"+greater+"'"
          }
        }

        //SE REALIZA LA CONSULTA A LA BASE DE DATOS
        const rows = await query(models);
        listModels =  rows
  
      }catch(e){
        console.log(e)
        throw e
      }finally {
        console.log("finally")
        connection.end();
      }
      return listModels
};





export const saveBrands = async (brand) => {
    let name = brand.name;
    let message = null;

    //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let save = "INSERT INTO BRANDS (name) VALUES ('"+name+"')";
   
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(save, error =>{
      if(error){
        throw error
      }else{
        message = "Se ha realizado el registro correctamente"
      }
    });
   
  // EN CASO DE QUE TODO HAYA FUNCIONADO BIEN SE RETORNA UN MENSAGE DE EXITO
  return message
}


export const saveModelsById = async (model, id) => {

  let name = model.name;
    let price = model.average_price;
    let average_price = 0;
    let message = null;

    //SE CONVIERTEN LOS DATOS A SU TIPO DE DATO REAL EN LA BASE DE DATOS
    average_price = parseFloat(price.trim())
    if(price < 100.000){
        throw "El precio promedio debe ser mayor a 100.000";
    }

    //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let save = "INSERT INTO MODELS (name, brands_id, average_price) VALUES ('"+name+"', '"+id+"', '"+average_price+"')";
 
  
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(save, error =>{
      if(error){
        throw error
      }else{
        message = "Se ha realizado el registro correctamente"
      }
    });
   
  // EN CASO DE QUE TODO HAYA FUNCIONADO BIEN SE RETORNA UN MENSAGE DE EXITO
   return message

};



export const updateModels = async (model, id) => {

    let name = model.name;
    let price = model.average_price;
    let average_price = 0;
    let message = null;

    //SE CONVIERTEN LOS DATOS A SU TIPO DE DATO REAL EN LA BASE DE DATOS
    average_price = parseFloat(price.trim())
    if(price < 100.000){
        throw "El precio promedio debe ser mayor a 100.000";
    }

    //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let update = "UPDATE  MODELS SET average_price = '"+average_price+"' WHERE id = '"+id+"'";
    
  
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(update, error =>{
      if(error){
        throw error
      }else{
        message = "Se ha realizado la actualizacion del registro correctamente"
      }
    });
   
  // EN CASO DE QUE TODO HAYA FUNCIONADO BIEN SE RETORNA UN MENSAGE DE EXITO
   return message
}


//DESCOMENTAR PARA REALIZAR PRUEBAS DESDE CONSOLA EJECUNTADO NODE node models/index.js a nivel proyecto
//getBrands();
//getBrandsAndModelsById(1);
//getModelsById(1); 
//getModels(40000, 20000)
//saveBrands({name :'prueba 7'})
//saveModelsById({name:"prueba de modelo", average_price: "20000"}, 2)
//updateModels({name:"prueba de modelo", average_price: "20000"}, 2)

//cierre de conexion
//connection.end();



