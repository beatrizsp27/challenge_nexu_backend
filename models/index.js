import { connection, openConnection } from "../bd/conexion.js"

openConnection();

export const getBrands = async () =>{
  console.log("getBrands")

    let brandsList = [];
      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let brands = "SELECT * FROM BRANDS";
    try{

      //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
      connection.query(brands, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        brandsList = result
      });
      
    }catch(e){
      console.log(e)
      throw e
    }
    console.log("fin:::::::::" + brandsList)
    return brandsList

}

/**
 * Obtener todas las marcas y modelos
 */
export const getBrandsAndModelsById = (id) =>{

    //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let brandsAndModels = "SELECT b.id, b.name, m.name, m.average_price  FROM BRANDS b INNER JOIN MODELS m ON brands_id = '"+id+"'";

    connection.query(brandsAndModels, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      return result
    
    });
}


export const getModelsById = (id) =>{

      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let models = "SELECT * FROM MODELS WHERE id = '"+id+"'";
    connection.query(models, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      return result
    });
}




export const getModels = (greater, lower ) => {

      let listModels = [];

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


      //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
      connection.query(models, (error, result) =>{
        if(error){
          throw error
        }else{
          console.log(result)
          listModels = result
        }
      });
  
      return listModels
};





export const saveBrands = (brand) => {
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


export const saveModelsById = (model, id) => {

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



export const updateModels = (model, id) => {

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
connection.end();



