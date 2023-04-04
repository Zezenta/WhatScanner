const botonusuario1 = document.getElementById("botonusuario1");
const botonusuario2 = document.getElementById("botonusuario2");
const container = document.getElementById("containerid");

var lan = "es";


var lineas;
var seguirciclo = true;
var nombreusuario1 = ""; //el nombre del usuario1
var nombreusuario2 = ""; //el nombre del usuario2

var nombreusuario1encontrado = false; //es para ver si tengo que volver a buscar el nombre del usuario1
var nombreusuario2encontrado = false; //es para ver si tengo que volver a buscar el nombre del usuario2

var darkmode = true; //true dark, false light

var media_omitted = ["Multimedia omitido", "Media omitted"];
var file_attached = ["archivo adjunto", "file attached"];

document.getElementById('inputfile').addEventListener('change', function() { //escucha cuando un archivo se sube al boton de subir archivo
              
var fr=new FileReader();
              
fr.readAsText(this.files[0]);
fr.onload=function(){
	lineas = fr.result.split(/\r\n|\n/);
	iniciar_renderizado();
}})

var iterador = 1; //iterador para ciclos de lectura y escritura de mensajes, empieza en 1 porque la línea 0 se tiene que ignorar
function iniciar_renderizado()
{
	while(seguirciclo == true)
	{
		var lineacomprobada = (lan == "es") ? lineas[iterador].match(/((\d{1,2})\/(\d{1,2})\/(\d{1,4}))\s(\d{1,2}:\d{1,2})\s([pa]\.\sm\.)\s-\s([\+A-zÀ-ÿü\s\d]+):\s(.*)/) : lineas[iterador].match(/((\d{1,2})\/(\d{1,2})\/(\d{1,4})),\s(\d{1,2}:\d{1,2})\s([ap]m)\s-\s([\+A-zÀ-ÿü\s\d]+):\s(.*)/); //la documentación del regex es, 1 para la fecha completa, 2 para el día, 3 para el mes, 4 para el año, 5 para la hora, 6 para el horario de hora, 7 para el usuario, y 8 para el contenido del mensaje
		console.log(lineacomprobada)
		let usuariomensajeoriginal = ""; //para contrl de tags luego
		var usuariomensajetag = ""; //para control de tags luego
		let fechamensaje = lineacomprobada[1]; //fecha
		let horamensaje = lineacomprobada[5]; //hora
		let horariomensaje = lineacomprobada[6]; //si la hora es AM o PM
		let contenidomensaje = lineacomprobada[8]; //el contenido del mensaje

		while(nombreusuario1encontrado == false) //se ejecuta dependiendo de si el nombre de usuario1 ya se encontró o no
		{
			nombreusuario1 = lineacomprobada[7];
			botonusuario1.innerText = nombreusuario1;
			nombreusuario1encontrado = true;
		}

		if(lineacomprobada[7] != nombreusuario1)
		{
			while(nombreusuario2encontrado == false)
			{
				nombreusuario2 = lineacomprobada[7];
				botonusuario2.innerText = nombreusuario2;
				nombreusuario2encontrado = true;
			}
		}

		//RENDERIZANDO MENSAJES
		if(lineacomprobada) //si la siguiente linea es una sola palabra de un mensaje anterior por un salto de linea, no se ejecuta nada de esto y se va a la siguiente línea
		{
			contenidomensaje = lineacomprobada[8];

			//comprobar si la siguiente línea es una continuación en salto de línea
			let regex_prueba;
			var it;
			for(it = 1; it<lineas.length-1; it++)
			{
				try
				{
					regex_prueba = (lan == "es") ? lineas[iterador].match(/((\d{1,2})\/(\d{1,2})\/(\d{1,4}))\s(\d{1,2}:\d{1,2})\s([pa]\.\sm\.)\s-\s([\+A-zÀ-ÿü\s\d]+):\s(.*)/) : lineas[iterador].match(/((\d{1,2})\/(\d{1,2})\/(\d{1,4})),\s(\d{1,2}:\d{1,2})\s([ap]m)\s-\s([\+A-zÀ-ÿü\s\d]+):\s(.*)/); //la documentación del regex es, 1 para la fecha completa, 2 para el día, 3 para el mes, 4 para el año, 5 para la hora, 6 para el horario de hora, 7 para el usuario, y 8 para el contenido del mensaje
				}
				catch (error)
				{
					console.log("Error esperado, ya no hay siguiente línea (todo bien)");
				}
				if(!regex_prueba && iterador != lineas.length - 1)
				{
					contenidomensaje += " " + lineas[iterador + 1];
					iterador++;
				}
				else
				{
					break;
				}
			}
			usuariomensajeoriginal = (lineacomprobada[7] == nombreusuario2) ? "originalmente2" : "originalmente1"; //This code checks if lineacomprobada[7] is equal to nombreusuario2. If it is, then usuariomensajeoriginal is set to "originalmente2". If it isn't, then usuariomensajeoriginal is "originalmente1".
			usuariomensajetag = (lineacomprobada[7] == nombreusuario2) ? "friend_msg" : "my_msg"; //This code checks if lineacomprobada[7] is equal to nombreusuario2. If it is, then usuariomensajetag is set to "friend_msg". If it isn't, then usuariomensajetag is "my_msg".
			//se crea el div del mensaje nuevo como tal
			crear_div_mensaje(contenidomensaje, horamensaje, horariomensaje, fechamensaje, usuariomensajeoriginal, usuariomensajetag);
		}
		iterador++;
		seguirciclo = (iterador == lineas.length) ? false : seguirciclo;
	}
}	

//FUNCION PARA CREAR LOS DIVS QUE CONTIENEN LOS MENSAJES
function crear_div_mensaje(contenido, hora, horario, fecha, usuariooriginal, usuariotag)
{
	let mensajito = document.createElement("p");
	let estructura_mensaje = document.createElement("div");
	let horamensaje = document.createElement("span");

	estructura_mensaje.classList.add("message");
	estructura_mensaje.classList.add(usuariooriginal)
	estructura_mensaje.classList.add(usuariotag);

	horamensaje.appendChild(document.createTextNode(hora + " " + horario + " " + fecha));
	mensajito.appendChild(document.createTextNode(contenido));
	estructura_mensaje.appendChild(mensajito);
	mensajito.appendChild(horamensaje);

	document.getElementById("mensajesdetexto").appendChild(estructura_mensaje);
}

//BOTONES DE USUARIOS
var mensajes_usuario1 = document.getElementsByClassName("originalmente1");
var mensajes_usuario2 = document.getElementsByClassName("originalmente2");

function botonejecutar(user1, user2, select, unselect)
{
	//CSS COLORES BOTONES
	select.classList.add("selectedButton");
	select.classList.remove("unSelectedButton");
	unselect.classList.add("unSelectedButton");
	unselect.classList.remove("SelectedButton");

	//CAMBIANDO DE LUGARES LOS MENSAJES
	for(var i = 0; i<=mensajes_usuario1.length-1; i++)
	{	
		mensajes_usuario1[i].classList.add(user1);
		mensajes_usuario1[i].classList.remove(user2);
	}
	for(var i = 0; i<=mensajes_usuario2.length-1; i++)
	{	
		mensajes_usuario2[i].classList.add(user2);
		mensajes_usuario2[i].classList.remove(user1);
	}
}

//DARK MODE and LIGHT MODE
const theme_button = document.getElementById("botonsillomodos");
var darkmode = true;
function switchthemes()
{
	theme_button.innerText = (darkmode == true) ? "Dark Mode" : "Light Mode";
	container.classList.toggle("lightmode");
	container.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");
	document.body.classList.toggle("darkmode");
	darkmode = (darkmode == true) ? false : true;
}