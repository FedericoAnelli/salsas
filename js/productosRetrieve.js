//Variables Globales
let totalCarrito = 0;
if (localStorage.getItem('totalCarrito')){totalCarrito = totalCarrito + parseFloat(JSON.parse(localStorage.getItem('totalCarrito')));};

let colorRojo = "#BB2E23";
let whiteBackgroundColor = "#ffffffe6";

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
let productos = [];
//if (localStorage.getItem('listaProductos')){productos = JSON.parse(localStorage.getItem('listaProductos'));};

async function pedirProductos(){
const resp = await fetch("data/initialConfig.json")
const data = await resp.json();

    for (let i = 0; i<data.length; i++)
    {
    productos.push(data[i]);
    }



return true;
}

pedirProductos();





let carrito = [];
if (localStorage.getItem('carrito')){carrito = JSON.parse(localStorage.getItem('carrito'));};




// Objetos
class Carrito{
    constructor(idProducto, tituloProducto, precioProducto, cantidadMismoProducto){
        this.idProducto = idProducto;
        this.tituloProducto = tituloProducto;
        this.precioProducto = parseFloat(precioProducto);
        this.cantidadMismoProducto = cantidadMismoProducto;
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
        this.precioProducto = parseFloat(precioProducto).toFixed(2);
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
setTimeout(function(){
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
        // Suma al total del carrito
        totalCarrito = totalCarrito + productos[i].precioProducto;
        console.log(totalCarrito);
        localStorage.setItem("totalCarrito", JSON.stringify(parseFloat(totalCarrito).toFixed(2)));
        // Busca si el producto ya está en el carrito y lo suma si lo encuentra
        if(carrito.some(carrito => carrito.idProducto === productos[i].idProducto)){
        let index = carrito.findIndex(carrito => carrito.idProducto == productos[i].idProducto);
        carrito[index].cantidadMismoProducto = carrito[index].cantidadMismoProducto+1;

        }else{
        // Si no encuentra el producto en el carrito, lo agrega
        carrito.push(new Carrito (productos[i].idProducto, productos[i].tituloProducto, parseFloat(productos[i].precioProducto).toFixed(2), 1));
    }
        // Alerta confirmando la carga del producto
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: 'Se ha agregado el producto al carrito de compras.',
            confirmButtonText: 'Continuar',
            confirmButtonColor: colorRojo
        })
        // Actualiza contenidos del carrito en storage
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });
    // Agrega click en producto para obtener más detalles del mismo
    producto.addEventListener("click", ()=>{


        Swal.fire({
            title: productos[i].tituloProducto,
            imageUrl: productos[i].imagenProducto,
            html: '<div class="grillaTarjetaProducto"><p id="popUpProductPrecio" class="comprarDetalleProducto--Precio"><strong>Precio:</strong> $'+productos[i].precioProducto+'</p><p id="popUpProductAji" class="comprarDetalleProducto--TipoAji"><strong>Tipo de Ají:</strong> '+productos[i].tipoDeAji+'</p><p id="popUpProductPicor" class="comprarDetalleProducto--Picor"><strong>Picor:</strong> '+productos[i].picorProducto+'</p><p id="popUpProductDescripcion" class="comprarDetalleProducto--Descripcion">'+productos[i].descripcionProducto+'</p></div>',
            imageWidth: "10%",
            imageHeight: "70%",
            width: "50%",
            imageAlt: productos[i].tituloProducto,
            confirmButtonText: 'CONTINUAR',
            confirmButtonColor: colorRojo,
            background: whiteBackgroundColor,
            showCloseButton: true
          })



    });
    // Agrega productos en gondola
    divFicha.appendChild(producto);
    divFicha.appendChild(agregarAlCarrito);
    gondolaHomepage.appendChild(divFicha);
}
}, 100);

function sacarElementoDelCarrito (elemento){
    // Busca el elemento en el carrito en base a su ID
    let numeroElemento = carrito.map(function(carrito) {return carrito.idProducto; }).indexOf(elemento.id);
    totalCarrito = totalCarrito - (carrito[numeroElemento].precioProducto * carrito[numeroElemento].cantidadMismoProducto);
    // Remueve el elemento del carrito
    carrito.splice(numeroElemento, 1);
    // Actualiza el carrito en almacenamiento
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalCarrito", JSON.stringify(parseFloat(totalCarrito).toFixed(2)));
    // Cierra ventana carrito
    swal.close();
    // Vuelve a abrir ventana del carrito sin el elemento que se removió
    abrirCarrito();
}

// Función para abrir el carrito
function abrirCarrito(){

    let gridStart = '<div class="gridCarrito">';
    let gridClose = '</div>';
    Swal.fire({
        title: "Carrito",
        position: 'top-end',
        html: gridStart+popularCarrito()+gridClose+'<p class="alignRight"><br><strong>Total: </strong>$'+parseFloat(totalCarrito).toFixed(2)+'</p>',
        showCancelButton: true,
        customClass: 'swal-height',
        cancelButtonText: ('CANCELAR'),
        confirmButtonText: 'COMPRAR',
        confirmButtonColor: colorRojo,
        background: whiteBackgroundColor,
        showCloseButton: true,

      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href= 'pages/checkout.html';
        } 
      })

};

// Completa listado de artículos en el carrito
function popularCarrito(){
    let string = "";
    for (let i = 0; i<carrito.length; i++){
        string = string+"<p class="+"alignLeft"+">x"+carrito[i].cantidadMismoProducto+"</p><p class="+"alignCenter"+">"+carrito[i].tituloProducto+"</p><p class="+"alignRight"+">$"+(carrito[i].precioProducto*carrito[i].cantidadMismoProducto)+"</p><div id=remove_"+carrito[i].idProducto+" class="+"eliminarArticuloCarrito "+" onclick="+"sacarElementoDelCarrito("+carrito[i].idProducto+")"+"><span class="+"material-symbols-outlined"+">close</span></div>";
    }
    if (string.length == 0)
    {
        return "<p></p><p class="+"noHayArticulos"+">No hay articulos en el carrito aún.</p><p></p>";
    }else{
        return string;
    }
}


// Click en carrito
carritoIcon.addEventListener("click", ()=>{

    abrirCarrito();
    
});

