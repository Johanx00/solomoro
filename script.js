
const muneco = document.getElementById("muneco");

const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");

const boton = document.getElementById("boton");
const botonFoto = document.getElementById("boton-foto");
const botonVer = document.getElementById("boton-ver");

const contador = document.getElementById("contador");
const zonaFoto = document.getElementById("zona-foto");
const flash = document.getElementById("flash");

const botonContinuar = document.getElementById("boton-continuar");
const zonaExamen = document.getElementById("examen");

let paso = 0;

function gesto(nombre) {
    muneco.className = "muneco " + nombre;
}

function mensaje(tituloTexto, texto) {
    titulo.textContent = tituloTexto;
    descripcion.textContent = texto;
}

function siguiente() {

    paso++;

    boton.style.display = "none";

    if (paso === 1) {

        gesto("saludando");

        mensaje(
            "Una pequeña aclaración...",
            "Esta es una página de prueba bobota, es para ver qué tal me va saliendo lo de ser programador JAJAJA."
        );

        boton.textContent = "Vamo a ver 🙄";
    }

    else if (paso === 2) {

        gesto("pensando");

        mensaje(
            "Una cosita más...",
            "Me imagino que ha de estar cansada, con sueño y con hambre y bla bla bla... pero me valeeee, quiero que vea esta página JAJAJA."
        );

        boton.textContent = "Sigamos😂";
    }

    else if (paso === 3) {

        gesto("sorprendido");

        mensaje(
            "¡IMPORTANTE, IMPORTANTE! 📢",
            "Bien, ahora sí. Quiero grabar este momento importante, para eso voy a tomarle una foto, ¿ya? ¿Está lista?"
        );

        boton.textContent = "Aqui para avanzar👀";
    }

    else if (paso === 4) {

        gesto("fotografo");

        mensaje(
            "¡Atención, Solomoro!",
            "Bien, presione el botón de tomar foto para tomarle y no se mueva."
        );

        botonFoto.style.display = "inline-block";
    }

    if (paso < 4) {
        boton.style.display = "inline-block";
    }
}

function tomarFoto() {

    botonFoto.style.display = "none";

    gesto("serio");

    mensaje(
        "Preparando cámara...",
        "Quédese quietecita. Enfocando..."
    );

    let numero = 3;

    contador.textContent = numero;

    const intervalo = setInterval(() => {

        numero--;

        if (numero > 0) {

            contador.textContent = numero;

        } else {

            clearInterval(intervalo);

            contador.textContent = "¡FLASH! 📸";

            flash.style.animation = "destello 0.7s";

            setTimeout(() => {

                flash.style.animation = "none";
                contador.textContent = "";

                gesto("saludando");

                mensaje(
                    "JAJAJAJA 😂",
                    "Bien, ahora sí ya tengo la foto. Salió como siempre fea JAJAJAJAJA."
                );

                botonVer.style.display = "inline-block";

            }, 800);
        }

    }, 1000);
}

function mostrarFoto() {

    gesto("sorprendido");

    mensaje(
        "¡MIRE LA FOTO! 🤣",
        "JAJAJAJAJA. No tengo palabras para describir esta obra de arte."
    );

    zonaFoto.style.display = "flex";

    botonVer.style.display = "none";

    botonContinuar.style.display = "inline-block";
}

function continuar() {

    // Ocultamos la fotografía y los elementos anteriores
    zonaFoto.style.display = "none";

    document.querySelector(".escenario").style.display = "none";
    document.querySelector(".encabezado").style.display = "none";
    document.querySelector(".botones").style.display = "none";

    // Ocultamos el texto anterior
    titulo.style.display = "none";
    descripcion.style.display = "none";

    // Mostramos el examen
    if (zonaExamen) {
        zonaExamen.style.display = "block";
        zonaExamen.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    } else {
        console.error("No se encontró la sección del examen. Revisa que exista id='examen' en index.html");
    }

    botonContinuar.style.display = "none";
}

// ================================
// CALIFICAR EXAMEN
// ================================


function calificarExamen() {

    const respuestasCorrectas = [
        "d", // Pregunta 1
        "b", // Pregunta 2
        "a", // Pregunta 3
        "b", // Pregunta 4
        "c"  // Pregunta 5
    ];

    let puntos = 0;

    for (let i = 1; i <= 5; i++) {

        const seleccionada = document.querySelector(
            'input[name="respuesta' + i + '"]:checked'
        );

        if (seleccionada && seleccionada.value === respuestasCorrectas[i - 1]) {
            puntos += 2;
        }
    }

    const resultado = document.getElementById("resultado-examen");
    const premio = document.getElementById("zona-premio");

    resultado.style.display = "block";

    if (puntos === 10) {

        resultado.innerHTML =
            "🎉 ¡10/10! ¡EXAMEN PERFECTO! 🎉<br>" +
            "Bien bien Solomoro";

        premio.style.display = "block";

    } else {

        premio.style.display = "none";

        resultado.innerHTML =
            "Obtuvo " + puntos + "/10 puntos. 😂<br>" +
            "JAJAJAJA, todavía no se gana el premio. ¡Inténtelo otra vez!";
    }

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ================================
// RECLAMAR PREMIO
// ================================



async function aceptarPremio() {

    const premio = document
        .getElementById("premio-solicitado")
        .value.trim();

    const mensajePremio = document.getElementById("mensaje-premio");

    if (premio === "") {
        mensajePremio.textContent =
            "¡Primero escriba qué premio quiere! 😂";
        return;
    }

    mensajePremio.textContent = "Enviando su petición... 📩";

    try {

        await emailjs.send(
            "service_rrbodhr",
            "template_uxv10s8",
            {
                from_name: "Solomoro",
                message: premio
            }
        );

        mensajePremio.textContent =
            "¡Premio solicitado! 🎁 Su petición ha sido enviada correctamente JAJAJA.";

        setTimeout(() => {

            document.getElementById("examen").style.display = "none";

            document.getElementById("pantalla-final").style.display = "block";

            document.getElementById("pantalla-final").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 2500);

    } catch (error) {

        console.error("Error al enviar:", error);

        mensajePremio.textContent =
            "Ups, no se pudo enviar la petición. Inténtelo nuevamente.";

    }
}


