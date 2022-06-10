//Variables Globales
let totalCarrito = 0;

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
let carritoIcon = document.getElementById("carrito");



// Colecciones de productos
let productos = JSON.parse(localStorage.getItem("listaProductos"));
let carrito = [];




// Objetos
class Carrito{
    constructor(idProducto, tituloProducto, precioProducto){
        this.idProducto = idProducto;
        this.tituloProducto = tituloProducto;
        this.precioProducto = precioProducto;
    };

}


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
    
    //Crea DIV de producto + boton
    let divFicha = document.createElement("div");
    divFicha.id = "ficha_"+productos[i].idProducto;
    divFicha.className = "comprarFichaProducto";
    divFicha.setAttribute("data-aos", "fade-up");
    divFicha.setAttribute("data-aos-duration", 300*(i));

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


    agregarAlCarrito.addEventListener("click", ()=>{

        carrito.push(new Carrito (productos[i].idProducto, productos[i].tituloProducto, productos[i].precioProducto));
    });

    producto.addEventListener("click", ()=>{


        Swal.fire({
            title: productos[i].tituloProducto,
            imageUrl: productos[i].imagenProducto,
            html: '<div class="grillaTarjetaProducto"><p id="popUpProductPrecio" class="comprarDetalleProducto--Precio"><strong>Precio:</strong> $'+productos[i].precioProducto+'</p><p id="popUpProductAji" class="comprarDetalleProducto--TipoAji"><strong>Tipo de Ají:</strong> '+productos[i].tipoDeAji+'</p><p id="popUpProductPicor" class="comprarDetalleProducto--Picor"><strong>Picor:</strong> '+productos[i].picorProducto+'</p><p id="popUpProductDescripcion" class="comprarDetalleProducto--Descripcion">'+productos[i].descripcionProducto+'</p></div>',
            imageWidth: "10%",
            imageHeight: "70%",
            width: "50%",
            imageAlt: productos[i].tituloProducto,
            confirmButtonText: 'AGREGAR AL CARRITO',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: 'CANCELAR',
          })



    });

    divFicha.appendChild(producto);
    divFicha.appendChild(agregarAlCarrito);
    gondolaHomepage.appendChild(divFicha);
}

function popularCarrito(){
    let string = "";
    for (let i = 0; i<carrito.length; i++){
        totalCarrito = totalCarrito + carrito[i].precioProducto;
        string = string+"<p>"+carrito[i].tituloProducto+"</p>";
    }
    if (string.length == 0)
    {
        return "<p>No hay articulos en el carrito aún.</p>";
    }else{
        return string;
    }
}

carritoIcon.addEventListener("click", ()=>{
    Swal.fire({
        title: "Carrito",
        html: popularCarrito(),
        showCancelButton: true,
        cancelButtonText: ('CANCELAR'),
        confirmButtonText: 'COMPRAR',
        showCloseButton: true,

      })
});