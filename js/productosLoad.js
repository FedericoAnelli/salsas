

// Variables globales
const valorIva = 1.21;
const valorMinimoDeSalsa = 100;

// Elementos DOM
let botonCarga = document.getElementById("cargarArticulo");
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
        this.precioProducto = parseFloat(precioProducto);
        this.stockProducto = stockProducto;

    }
}

/* Carga inicial de productos
agregarProducto("/media/fotosSalsas/tabasco.webp", "Tabasco", "Originaria de Louisiana, Estados Unidos, se comercializa desde el siglo XIX, exactamente creada en 1868 por la empresa familiar McIlhenny Company. La receta original consistía en una mezcla de chiles tabasco rojo, agua, sal y vinagre que se maceraba en barricas de roble para que adquieran sabor. Tabasco Garlic. Esta salsa no lleva chile. La base picante de esta salsa es el ajo. El ajo no contiene capsaicina y el picor que produce es debido a otro tipo de sustancias. Es por tanto única en la gama de Tabasco al no contener ningún tipo de chile. Contiene una cantidad equivalente de picante a una horquilla de entre 1.200 y 2.400 SHU.", 1, "Ajo", 850, 50);
agregarProducto("/media/fotosSalsas/yucatecoBlack.webp", "Yucateco Black", "Esta salsa negra es el último lanzamiento de la línea de salsas habaneras, su sabor original ahumado y único se originan al asar chiles habaneros a altas temperaturas. Si te gusta el chipotle (jalapeño ahumado) no podés dejar de probar Habaneros Ahumados. <br> Es ideal para carnes y verduras a la parrilla o añadir un toque de sabor a la leña a sopas o guisos.", 8, "Habanero", 899, 50);
agregarProducto("/media/fotosSalsas/yucatecoChipotle.webp", "Yucateco Chipotle", "Originaria de Louisiana, Estados Unidos, se comercializa desde el siglo XIX, exactamente creada en 1868 por la empresa familiar McIlhenny Company. La receta original consistía en una mezcla de chiles tabasco rojo, agua, sal y vinagre que se maceraba en barricas de roble para que adquieran sabor. Tabasco Garlic. Esta salsa no lleva chile. La base picante de esta salsa es el ajo. El ajo no contiene capsaicina y el picor que produce es debido a otro tipo de sustancias. Es por tanto única en la gama de Tabasco al no contener ningún tipo de chile. Contiene una cantidad equivalente de picante a una horquilla de entre 1.200 y 2.400 SHU.", 1, "Ajo", 850, 50);
agregarProducto("/media/fotosSalsas/yucatecoVerde.webp", "Yucateco Jalapeño", "Para los fanáticos del chipotle en todas variedades, la famosa salsa Chipotle de Yucateco. Con el clásico sabor ahumado de todos los chipotles <br> Elaborada a base de chiles chipotles ahumados al natural y jarabe de maíz. Lo que ha dado como resultado una mezcla de sabores picantes y agridulces que seguramente provocarán todos sus sentidos. <br> Usala para marinar unas fajitas de pollo o para preparar un delicioso dip para camarones, verduras y más.", 3, "Chipotle", 830, 50);
*/

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
    precioProducto = parseFloat(precioProducto);
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

    agregarProducto("/media/noImagePlaceholder.webp", inputName.value, inputDescription.value, inputRating.value, inputPepperType.value, inputPrice.value, inputStock.value);

});