

// Funcion de Palindromo
function detectarPalindromo() {
    const cadena = document.getElementById("cadena").value;
    // Convertir la cadena a minúsculas, eliminar espacios y acentos
    const cadenaProcesada = cadena.toLowerCase().replace(/[\sáéíóú]/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Comparar la cadena procesada con su versión invertida
    const esPalindromo = cadenaProcesada === cadenaProcesada.split('').reverse().join('');
    document.getElementById("resultado").innerText = esPalindromo ? "Es un palíndromo" : "No es un palíndromo";
}

// Funcion comparara Numeros 

function compararNumeros() {
    // identifica los numeros
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    let resultado;
    //Decision de cual es el numero mayor
    if (num1 > num2) {
        resultado = `El número mayor es: ${num1}`;
    } else if (num2 > num1) {
        resultado = `El número mayor es: ${num2}`;
    } else {
        resultado = "Ambos números son iguales";
    }

    document.getElementById("resultado").innerText = resultado;
}

// Funcion mostrar vocales 
function mostrarVocales() {
    const frase = document.getElementById("frase").value.toLowerCase();
    const vocales = ["a", "e", "i", "o", "u"];
    let vocalesEnFrase = [];

    for (const letra of frase) {
        if (vocales.includes(letra) && !vocalesEnFrase.includes(letra)) {
            vocalesEnFrase.push(letra);
        }
    }

    document.getElementById("resultado").innerText = `Vocales encontradas: ${vocalesEnFrase.join(', ')}`;
}


//Funcin ed contar vocales
function contarVocales() {
    const frase = document.getElementById("frase").value.toLowerCase();
    const contadorVocales = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    for (const letra of frase) {
        if (contadorVocales.hasOwnProperty(letra)) {
            contadorVocales[letra]++;
        }
    }

    let resultado = "Cantidad de cada vocal:\n";
    for (const [vocal, cantidad] of Object.entries(contadorVocales)) {
        resultado += `${vocal.toUpperCase()}: ${cantidad} \n`;
    }

    document.getElementById("resultado").innerText = resultado;
}

//Ajax script 
// Configura el cuadro de texto para mostrar la URL actual al cargar la página
window.onload = function() {
    document.getElementById("urlInput").value = window.location.href;
};

function mostrarContenidos() {
    // Obtén la URL del cuadro de texto
    const url = document.getElementById("urlInput").value;
    
    // Crea un nuevo objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    
    // Actualiza el estado de la petición
    xhr.onreadystatechange = function() {
        let estado = '';
        switch (xhr.readyState) {
            case 0:
                estado = 'No iniciada';
                break;
            case 1:
                estado = 'Conexión establecida';
                break;
            case 2:
                estado = 'Petición recibida';
                break;
            case 3:
                estado = 'Cargando...';
                break;
            case 4:
                estado = 'Completada';
                break;
        }
        document.getElementById("estadoPeticion").innerText = estado;

        // Mostrar el contenido una vez completada
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Muestra el contenido en la zona "Contenidos"
                document.getElementById("contenidos").innerText = xhr.responseText;
                
                // Muestra las cabeceras en la zona "Cabeceras"
                const cabeceras = xhr.getAllResponseHeaders();
                document.getElementById("cabeceras").innerText = cabeceras;

                // Muestra el código de estado en la zona "Código de estado"
                document.getElementById("codigoEstado").innerText = `${xhr.status} - ${xhr.statusText}`;
            } else {
                // Si hay un error, muestra el código de error
                document.getElementById("codigoEstado").innerText = `Error ${xhr.status} - ${xhr.statusText}`;
            }
        }
    };

    // Inicializa la solicitud
    xhr.open("GET", url, true);
    xhr.send();
}
