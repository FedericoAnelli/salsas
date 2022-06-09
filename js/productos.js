// Elementos DOM
let gondolaHomepage = document.getElementById("gondolaHomepage");

// Colección de productos
let productos = [];

// Objetos
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

// Carga inicial de productos
agregarProducto("/media/fotosSalsas/tabasco.webp", "Tabasco", "Originaria de Louisiana, Estados Unidos, se comercializa desde el siglo XIX, exactamente creada en 1868 por la empresa familiar McIlhenny Company. La receta original consistía en una mezcla de chiles tabasco rojo, agua, sal y vinagre que se maceraba en barricas de roble para que adquieran sabor. Tabasco Garlic. Esta salsa no lleva chile. La base picante de esta salsa es el ajo. El ajo no contiene capsaicina y el picor que produce es debido a otro tipo de sustancias. Es por tanto única en la gama de Tabasco al no contener ningún tipo de chile. Contiene una cantidad equivalente de picante a una horquilla de entre 1.200 y 2.400 SHU.", 1, "Ajo", 850, 50);


// Genera IDs automaticamente
function generadorDeID(nombreProducto)
{
    let initials = nombreProducto.substring(0, 3).toUpperCase();
    let today = new Date();
    let newID = initials+today.getFullYear()+today.getMonth()+today.getDate()+today.getHours()+today.getMinutes()+today.getSeconds()+today.getMilliseconds();
    return newID;
}







// Agrega producto al arreglo
function agregarProducto(imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAjí, precioProducto, stockProducto){
    
    productos.push(new Producto(generadorDeID(tituloProducto), imagenProducto, tituloProducto, descripcionProducto, picorProducto, tipoDeAjí, precioProducto, stockProducto));
}

// Checkea campos vacíos
function isEmpty(content){
    if (variable.length == 0){
        return true;
    }else{
        return false;
    }

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

    gondolaHomepage.appendChild(producto);
}

