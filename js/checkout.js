//Variables Globales
let totalCarrito = 0;
if (localStorage.getItem('totalCarrito')){totalCarrito = totalCarrito + parseFloat(JSON.parse(localStorage.getItem('totalCarrito')));};

let carrito = [];
if (localStorage.getItem('carrito')){carrito = JSON.parse(localStorage.getItem('carrito'));};

// DOM
let grillaListado = document.getElementById("grillaListado");


// Agrega productos en la lista del checkout
for (let i = 0; i<carrito.length; i++){

    let cantidades = document.createElement("p");
    cantidades.innerHTML = "x"+carrito[i].cantidadMismoProducto;

    let producto = document. createElement("p");
    producto.innerHTML = carrito[i].tituloProducto;

    let totalMismoProducto = document.createElement("p");
    totalMismoProducto.innerHTML = '$' + (carrito[i].precioProducto * carrito[i].cantidadMismoProducto);
    totalMismoProducto.style.setProperty("justify-self", "flex-end");
    
    grillaListado.appendChild(cantidades);
    grillaListado.appendChild(producto);
    grillaListado.appendChild(totalMismoProducto);
}

let totalCompra = document.createElement("p");
totalCompra.innerHTML = '<strong>Total: </strong>'+'$'+totalCarrito;
totalCompra.className = "checkoutFilaTotal";

let botonFinalizarCompra = document.createElement("button");
botonFinalizarCompra.innerHTML = "FINALIZAR COMPRA";
botonFinalizarCompra.className = "checkoutBotonFinalizar";

botonFinalizarCompra.addEventListener("click", ()=>{

    localStorage.clear();
    window.location.href= 'pages/checkout.html';
    
})


grillaListado.appendChild(totalCompra);
grillaListado.appendChild(botonFinalizarCompra);



