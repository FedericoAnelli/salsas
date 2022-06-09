let productos = [];

class Producto{
    constructor(idProducto, imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAjí, precioProducto, stockProducto){

        this.idProducto = idProducto;
        this.imagenProducto = imagenProducto;
        this.tituloProducto = tituloProducto;
        this.descripcionProducto = descripcionProducto;
        this.picorProducto = picorProducto;
        this.tipoDeAjí = tipoDeAjí;
        this.precioProducto = precioProducto;
        this.stockProducto = stockProducto;

    }
}


// Agrega producto al arreglo
function agregarProducto(idProducto, imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAjí, precioProducto, stockProducto){


    productos.push(new Producto(idProducto, imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAjí, precioProducto, stockProducto));
}

// Checkea campos vacíos
function isEmpty(content){
    if (variable.length == 0){
        return true;
    }else{
        return false;
    }

}