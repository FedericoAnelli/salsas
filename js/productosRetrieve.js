// Elementos DOM
let gondolaHomepage = document.getElementById("gondolaHomepage");
let seccionCompras = document.getElementById("seccionCompras");
let popUpProduct = document.getElementById("popUpProduct");
let popUpProductImagen = document.getElementById("popUpProductImagen");
let popUpProductTitulo = document.getElementById("popUpProductTitulo");
let popUpProductPrecio = document.getElementById("popUpProductPrecio");
let popUpProductPicor = document.getElementById("popUpProductPicor");
let popUpProductDescripcion = document.getElementById("popUpProductDescripcion");
let popUpProductAji = document.getElementById("popUpProductAji");
let closeButtonIcon = document.getElementById("closeButtonIcon");



// Colección de productos
let productos = JSON.parse(localStorage.getItem("listaProductos"));

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

// Agrega producto al arreglo
function agregarProducto(imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAji, precioProducto, stockProducto){

    productos.push(new Producto(generadorDeID(tituloProducto), imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAji, precioProducto, stockProducto));
}

// Genera IDs automaticamente
function generadorDeID(nombreProducto)
{
    let initials = nombreProducto.substring(0, 3).toUpperCase();
    let today = new Date();
    let newID = initials+today.getFullYear()+today.getMonth()+today.getDate()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
    return newID;
}

// Completa grilla en home
for (let i=0; i<productos.length; i++){
    
    // Crea DIV del producto
    let producto = document.createElement("div");
    producto.id = productos[i].idProducto;
    producto.className = "comprarCard";

    // Asigna imagen del producto
    let imagenProducto = document.createElement("img");
    imagenProducto.id = productos[i].idProducto + "_Imagen";
    imagenProducto.className = "comprarCard--Imagen";
    imagenProducto.setAttribute("src", productos[i].imagenProducto);
    producto.appendChild(imagenProducto);

    // Asigna titulo del producto
    let tituloProducto = document.createElement("h2");
    tituloProducto.id = productos[i].idProducto + "_Titulo";
    tituloProducto.className = "comprarCard--Producto";
    tituloProducto.innerHTML = productos[i].tituloProducto;
    producto.appendChild(tituloProducto);

    // Asigna precio del producto
    let precioProducto = document.createElement("p");
    precioProducto.id = productos[i].idProducto + "_Precio";
    precioProducto.className = "comprarCard--Precio";
    precioProducto.innerHTML = "$"+productos[i].precioProducto;
    producto.appendChild(precioProducto);

    // Asigna boton agregar al carrito del producto
    let agregarAlCarrito = document.createElement("button");
    agregarAlCarrito.id = productos[i].idProducto + "_Precio";
    agregarAlCarrito.className = "comprarBotones--agregarAlCarrito";
    agregarAlCarrito.innerHTML = "AGREGAR AL CARRITO";
    producto.appendChild(agregarAlCarrito);

    producto.addEventListener("click", ()=>{

        popUpProductImagen.setAttribute("src", productos[i].imagenProducto);
        popUpProductTitulo.innerHTML = productos[i].tituloProducto;
        popUpProductAji.innerHTML = "Tipo de Ají: "+productos[i].tipoDeAji;
        popUpProductPrecio.innerHTML = "$"+productos[i].precioProducto;
        popUpProductPicor.innerHTML = "Picor: "+productos[i].picorProducto;
        popUpProductDescripcion.innerHTML = productos[i].descripcionProducto;
        popUpProduct.style.opacity = "100%";
        popUpProduct.style.zIndex = "5";

        seccionCompras.style.filter = "brightness(50%)";

    });


    gondolaHomepage.appendChild(producto);
}

// Boton de cierre de ventana emergente
closeButtonIcon.addEventListener("click", ()=>{

    popUpProduct.style.opacity = "0%";
    popUpProduct.style.zIndex = "-1";
    seccionCompras.style.filter = "brightness(100%)";


});
