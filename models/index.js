import { connection } from "../bd/conexion"

export const getBrands = () =>{

    const marcas = [
        {"id": 1, "nombre": "Acura", "average_price": 702109},
        {"id": 2, "nombre": "Audi", "average_price": 630759},
        {"id": 3, "nombre": "Bentley", "average_price": 3342575},
        {"id": 4, "nombre": "BMW", "average_price": 858702},
        {"id": 5, "nombre": "Buick", "average_price": 290371},
      ]

    return marcas
}

export const getModelsById = (id) =>{


    const models = [
        {"id": 1, "name": "ILX", "average_price": 303176},
        {"id": 2, "name": "MDX", "average_price": 448193},
        {"id": 1264, "name": "NSX", "average_price": 3818225},
        {"id": 3, "name": "RDX", "average_price": 395753},
        {"id": 354, "name": "RL", "average_price": 239050}
      ]

      return models

}

export const getModels = () => {

    const models = [
        {"id": 1, "name": "ILX", "average_price": 303176},
        {"id": 2, "name": "MDX", "average_price": 448193},
        {"id": 1264, "name": "NSX", "average_price": 3818225},
        {"id": 3, "name": "RDX", "average_price": 395753},
        {"id": 354, "name": "RL", "average_price": 239050}
      ]

      return models
};


export const saveBrands = (brand) => {
    let name = "NUEVA MARCA";
    let average_price = 239050;
    let price = 0;
    let message = null;

    //SE CONVIERTEN LOS DATOS A SU TIPO DE DATO REAL EN LA BASE DE DATOS
    price = parseFloat(average_price.trim())
    if(price < 100.000){
        throw "El precio promedio debe ser mayor a 100.000";
    }
 
    //SE REALIZA LA CONSULTA A LA BASE DE DATOS
    let save = "INSER INTO table_brands (name, average_price) VALUES ('"+name+"', '"+price+"')";
   
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

const saveModels = () => {


}