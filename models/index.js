import { connection } from "../bd/conexion"

export const getBrands = () =>{

      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let brands = "SELECT * FROM brands";
   
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(getBrandsBd, error =>{
      if(error){
        throw error
      }else{
        return marcas
      }
    });

}

export const getModelsById = (id) =>{

      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let models = "SELECT * FROM models WHERE id = '"+id+"'";
   
    //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
    connection.query(getBrandsBd, error =>{
      if(error){
        throw error
      }else{
        return models
      }
    });

}

export const getModels = () => {

      //SE REALIZA LA CONSULTA A LA BASE DE DATOS
      let models = "SELECT * FROM models";
   
      //SE VALIDA LA CONEXION A LA BASE DE DATOS Y VALIDAR QUE SE REALIZO EL ALMACENAMIENTO
      connection.query(getBrandsBd, error =>{
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
    let save = "INSER INTO brands (name, average_price) VALUES ('"+name+"', '"+average_price+"')";
   
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
    let save = "INSER INTO brands (name, average_price) VALUES ('"+name+"', '"+average_price+"') WHERE id = '"+id+"";
 
  
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
    let save = "UPDATE brands ( average_price) VALUES ( '"+average_price+"') WHERE id = '"+id+"";
 
  
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


