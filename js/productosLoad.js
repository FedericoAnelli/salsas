// Variables globales
const valorIva = 1.21;
const valorMinimoDeSalsa = 100;

// Elementos DOM
let botonCarga = document.getElementById("cargarArticulo");
let inputImage = document.getElementById("inputImage");
var uploadedImage = "";
let inputName = document.getElementById("inputName");
let inputDescription = document.getElementById("inputDescription");
let inputRating = document.getElementById("inputRating");
let inputPepperType = document.getElementById("inputPepperType");
let inputPrice = document.getElementById("inputPrice");
let inputStock = document.getElementById("inputStock");

// Colección de productos
let productos = [];
if (localStorage.getItem('listaProductos')){productos = JSON.parse(localStorage.getItem('listaProductos'));}

// Objetos
class Producto{
    constructor(idProducto, imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAji, precioProducto, stockProducto){

        this.idProducto = idProducto;
        this.imagenProducto = imagenProducto;
        this.tituloProducto = tituloProducto;
        this.descripcionProducto = descripcionProducto;
        this.picorProducto = parseFloat(picorProducto);
        this.tipoDeAji = tipoDeAji;
        this.precioProducto = parseFloat(precioProducto).toFixed(2)*valorIva;
        this.stockProducto = stockProducto;

    }
}

// Genera IDs automaticamente
function generadorDeID(nombreProducto)
{
    let initials = nombreProducto.substring(0, 3).toUpperCase();
    let today = new Date();
    let newID = initials+today.getFullYear()+today.getMonth()+today.getDate()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
    return newID;
}

// Agrega producto al arreglo
function agregarProducto(imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAji, precioProducto, stockProducto){


    picorProducto = parseFloat(picorProducto);
    precioProducto = parseFloat(precioProducto).toFixed(2);
    stockProducto = parseInt(stockProducto);


    if(isEmpty(tituloProducto)){
        errorAlert('Error. No se completó el nombre. Completar nombre.');
    } else

    if(isEmpty(descripcionProducto))
    {

        errorAlert("Error. No se completó descripción. Completar descripción.");

    } else

    if(!validarRatingPicante(picorProducto)){
        errorAlert("Calificación de picor ingresada incorrecta. Elegir un valor entre 0 y 9.");
    } else

    if(isEmpty(picorProducto))
    {
        errorAlert("Error. No se completó calificación de picante. Completar calificación de picante del 1 al 9.");
    } else

    if(isEmpty(tipoDeAji))
    {
        errorAlert("Error. No se completó tipo de ají. Completar tipo de ají.");
    } else

    if(!validarPrecio(precioProducto)){

        errorAlert("Precio incorrecto. No es un número o el valor es menor a "+valorMinimoDeSalsa);
 
    } else

    
    if(isNaN(stockProducto))
    {
        errorAlert("Error. No se completó stock disponible o no es un número. Completar stock disponible.");
    } else
    {
    cargaExitosa("Los datos se han guardado correctamente.");
    productos.push(new Producto(generadorDeID(tituloProducto), imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAji, precioProducto, stockProducto));
    localStorage.setItem("listaProductos", JSON.stringify(productos));
}
}

// Checkea campos vacíos
function isEmpty(content){
    if (content.length == 0){
        return true;
    }else{
        return false;
    }

}

// Alertas de error
function errorAlert(texto){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto,
        confirmButtonText: 'Continuar'
      })
}

// Alerta carga exitosa
function cargaExitosa(texto){
    Swal.fire({
        icon: 'success',
        title: 'Carga exitosa',
        text: texto,
        confirmButtonText: 'Continuar'
      })
}

// Valida el rating de picor que tiene el producto. No puede ser menor que 0 o mayor que 9 //
function validarRatingPicante(rating)
{
    if (isNaN(rating)){
        return false;
    }
    else if (rating < 0 || rating > 9){
        return false;
    }
    else{
        return true;
    }
}

// Valida que el precio ingresado sea mayor a $100 y un número //
function validarPrecio(precio){
    if (precio<valorMinimoDeSalsa || isNaN(precio))
    {
        return false;
    }
    else
    {
        return true;
    }
}


// Carga productos en seccion de carga
botonCarga.addEventListener("click", ()=>{

    agregarProducto("media/noImagePlaceholder.webp", inputName.value, inputDescription.value, inputRating.value, inputPepperType.value, inputPrice.value, inputStock.value);

});