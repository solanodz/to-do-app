// Declaramos las variables
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineTrough = 'line-trough';
let id;
let LIST;

// Funcion para introducir el nombre y saludo.
function actualizarSaludo() {
    let nombre = localStorage.getItem("nombreUsuario");

    // Verificar si el nombre está almacenado en el localStorage
    if (nombre) {
        // El nombre está presente en el localStorage, mostrarlo en el saludo
        let saludo = document.getElementById("saludo");
        saludo.textContent = `Hola, ${nombre} 👋🏽`;
    } else {
        // El nombre no está almacenado en el localStorage, solicitarlo al usuario
        nombre = prompt("Por favor, introduce tu nombre:");

        // Verificar si el usuario ha ingresado un nombre
        if (nombre !== null && nombre !== "") {
            // Guardar el nombre en el localStorage
            localStorage.setItem("nombreUsuario", nombre);

            // Actualizar el contenido del h1 con el nombre del usuario
            let saludo = document.getElementById("saludo");
            saludo.textContent = `Hola,  ${nombre} 👋🏽`;
        } else {
            // Mostrar un mensaje de error si no se ingresó un nombre
            Swal.fire({
                icon: 'error',
                iconColor: '#b12e2e',
                title: 'Error',
                text: 'Recuerda escribir tu nombre.',
                confirmButtonColor: 'black',
            })
            actualizarSaludo();
        }
    }
}

// Llamar a la función para actualizar el saludo al cargar la página
actualizarSaludo();



/* var nombreGuardado = localStorage.getItem("nombreUsuario");
console.log("El nombre guardado en localStorage es: " + nombreGuardado); */


// Creacion de fecha
const date = new Date();
fecha.innerHTML = date.toLocaleDateString('es-AR', { weekday: 'long', month: 'short', day: 'numeric' })

// Poner la fecha con Luxon



// Creamos la funciona agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {

    if (eliminado) { return }

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineTrough : '';

    const elemento = `
    <li id="elemento">
        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
        <p class="text ${LINE}">${tarea}</p>
        <i class="fa-solid fa-trash" data="eliminado" id="${id}"></i>
    </li>
    `;
    lista.insertAdjacentHTML('beforeend', elemento);
}

// Funcion de tareea realizada 
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineTrough);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

// Funcion de tarea eliminada
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}


// Llamamos a la funcion agregar tarea con el evento CLICK
botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = '';
    id++;
    console.log(LIST);
    Toastify({
        text: 'Tarea agregada',
        duration: 3000,  // Duración en milisegundos
        gravity: 'top',  // Posición de la alerta ('top', 'bottom', 'left', 'right')
        position: 'right',
        style: {
            background: '#329432',
        }
    }).showToast();
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = '';
        id++;
        console.log(LIST)
        Toastify({
            text: 'Tarea agregada',
            duration: 3000,  // Duración en milisegundos
            gravity: 'top',  // Posición de la alerta ('top', 'bottom', 'left', 'right')
            position: 'right',
            style: {
                background: '#329432',
            }
        }).showToast();
    }

})

/* lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value
    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
}) */

lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value
    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
        Toastify({
            text: 'Tarea eliminada',
            duration: 3000,  // Duración en milisegundos
            gravity: 'top',  // Posición de la alerta ('top', 'bottom', 'left', 'right')
            position: 'right',
            style: {
                background: '#b12e2e',
            }
        }).showToast();
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
});



// local storage get item

let data = localStorage.getItem('TODO')
if (data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
} else {
    LIST = []
    id = 0
}

function cargarLista(DATA) {
    DATA.forEach(function (i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    })
}

