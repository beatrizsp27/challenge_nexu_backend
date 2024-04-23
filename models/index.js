import { connection } from "../bd/conexion"

export const getBrands = () =>{

      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let brands = "SELECT * FROM BRANDS";
   
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(brands, error =>{
      if(error){
        throw error
      }else{
        return brands
      }
    });

}


/**
 * Obtener todas las marcas y modelos
 */
export const getBrandsAndModelsById = (id) =>{

    //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let brandsAndModels = "SELECT b.id, b.name, m.name, m.average_price  FROM BRANDS b INNER JOIN MODELS m ON brands_id = '"+id+"'";

    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(brandsAndModels, error =>{
      if(error){
        throw error
      }else{
        return brandsAndModels
      }
    });
}



export const getModelsById = (id) =>{

      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let models = "SELECT * FROM MODELS WHERE id = '"+id+"'";
   
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(models, error =>{
      if(error){
        throw error
      }else{
        return models
      }
    });

}


export const getModels = (greater, lower ) => {

      let models = "SELECT b.id, b.name, m.name, m.average_price  FROM BRANDS b INNER JOIN MODELS m"

      if(greater && lower ){
         //SE REALIZA LA CONSULTA A LA BASE DE DATOS
         models = " ON average_price between '"+lower+"' and '"+greater+"'"
      }

      if(greater){
        models = " ON average_price = '"+lower+"'"
      }

      if(lower){
         models = " ON average_price = '"+greater+"'"
      }

   
      //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
      connection.query(models, error =>{
        if(error){
          throw error
        }else{
          return models
        }
      });
  
};



export const saveBrands = (brand) => {
    let name = brand.name;
    let price = brand.average_price;
    let average_price = 0;
    let message = null;

    //SE CONVIERTEN LOS DATOS A SU TIPO DE DATO REAL EN LA BASE DE DATOS
    average_price = parseFloat(price.trim())
    if(price < 100.000){
        throw "El precio promedio debe ser mayor a 100.000";
    }
 
    //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let save = "INSER INTO BRANDS (name) VALUES ('"+name+"')";
   
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
    let save = "INSER INTO MODELS (name, brands_id, average_price) VALUES ('"+name+"', '"+id+"', '"+average_price+"')";
 
  
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
    let save = "UPDATE MODELS average_price = '"+average_price+"' WHERE id = '"+id+"";
 
  
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(save, error =>{
      if(error){
        throw error
      }else{
        message = "Se ha realizado la actualizacion del registro correctamente"
      }
    });
   
  // EN CASO DE QUE TODO HAYA FUNCIONADO BIEN SE RETORNA UN MENSAGE DE EXITO
   return message
}


