const botonusuario1 = document.getElementById("botonusuario1");
const botonusuario2 = document.getElementById("botonusuario2");
var lineas;
var seguirciclo = true;
var nombreusuario1 = ""; //el nombre del usuario1
var nombreusuario2 = ""; //el nombre del usuario2
var nombreusuario1encontrado = false; //es para ver si tengo que volver a buscar el nombre del usuario1
var nombreusuario2encontrado = false; //es para ver si tengo que volver a buscar el nombre del usuario2
var estadoboton = true;


document.getElementById('inputfile').addEventListener('change', function() { //escucha cuando un archivo se sube al boton de subir archivo
              
var fr=new FileReader();
              
fr.readAsText(this.files[0]);
fr.onload=function(){
	//console.log(fr);
	lineas = fr.result.split(/\r\n|\n/);
	//console.log(lineas[0]);
	//console.log(lineas[1]);
	iniciar_renderizado();
}})

class Mensaje //crea los objetos de los mensajes
{
	constructor(c, h, z, f, u)
	{
		this.contenido = c;
		this.hora = h;
		this.horario = z
		this.fecha = f;
		this.usuario = u;                              
	}
}

var iterador = 1; //iterador para ciclos de lectura y escritura de mensajes

function iniciar_renderizado()
{
	while(seguirciclo == true)
	{
		console.log(iterador);
		let args = lineas[iterador].split(" "); //aqui separo los argumentos de las lineas
		//console.log(args[0]); //solo constato que funciona
		let fechamensaje = args[0]; //fecha
		let horamensaje = args[1]; //hora
		let horariomensaje = args[2]; //si la hora es AM o PM
		let contenidomensaje = ""; //el contenido del mensaje
		let usuariomensaje = false; //falso para mensaje de usuario 1, y true para mensaje de usuario 2


		var encontrarusuario1 = 4; //es para empezar a partir de un argumento, está hecho variable para poder sumarse y restarse
		//console.log("USUARIO 1");	

		while(nombreusuario1encontrado == false) //se ejecuta dependiendo de si el nombre de usuario1 ya se encontró o no
		{
			//console.log(args[encontrarusuario1].substring(0, args[encontrarusuario1].length));
			if(args[encontrarusuario1].substring(args[encontrarusuario1].length - 1) == ":") //comprueba que si a partir del 4 argumento (donde empieza el nombre de usuario) hay un ":", lo cual indicaría que ahí termina el nombre de usuario1
			{
				nombreusuario1encontrado = true; //declara que ya encontró el nombre de usuario1
				nombreusuario1 += args[encontrarusuario1]; //añade las palabras al nombre de usuario1
				//console.log(nombreusuario1)
				botonusuario1.innerText = nombreusuario1.substring(0, nombreusuario1.length-1);
				//console.log(nombreusuario1); //consolea el nombre
				//console.log("Con substr " + nombreusuario1.substr(0, nombreusuario1.length-2)) //consolea el nombre sin el ":" final
			}
			else
			{
				nombreusuario1 += args[encontrarusuario1] + " "; //añade las palabras al nombre de usuario más un espacio para futuras palabras
				//console.log(nombreusuario1); //consolea el nombre
			}
			encontrarusuario1++; //añade un iterador a la variable para avanzar una palabra si es que la palabra verificada no termina en un ":"
		}

		var encontrarusuario2 = 4; //es para empezar a partir de un argumento, está hecho variable para poder sumarse y restarse

		//console.log("PRUEBA"); //consolea "PRUEBA" para separar
		//console.log(args[encontrarusuario2]); //consolea la primera palabra del nombre de usuario

		//console.log(nombreusuario1); //consolea el nombre del usuario 1
		console.log(args[encontrarusuario2]);
		if(args[encontrarusuario2] != nombreusuario1.substring(0, args[encontrarusuario2].length)) //si el nombre de usuario2 es diferente al nombre del usuario 1, este codigo se ejecuta
		{
			//console.log("USUARIO 2"); //consolea para separar
			while(nombreusuario2encontrado == false) //se ejecuta dependiendo de si el nombre de usuario2 ya se encontró o no
			{
				if(args[encontrarusuario2].substring(args[encontrarusuario2].length - 1) == ":") //comprueba que si a partir del 4 argumento (donde empieza el nombre de usuario) hay un ":", lo cual indicaría que ahí termina el nombre de usuario2
				{
					nombreusuario2encontrado = true; //declara que ya encontró el nombre de usuario2
					nombreusuario2 += args[encontrarusuario2]; //añade las palabras al nombre de usuario2
					botonusuario2.innerText = nombreusuario2.substring(0, nombreusuario2.length - 1);
					//console.log(nombreusuario2); //consolea el nombre
					//console.log("Con substr " + nombreusuario2.substring(0, nombreusuario2.length-2)); //consolea el nombre sin el ":" final
				}
				else
				{
					nombreusuario2 += args[encontrarusuario2] + " "; //añade las palabras el nombre de usuario2 más un espacio al final
					//console.log(nombreusuario2); //consolea el nombre del usuario2
				}
				encontrarusuario2++; //añade un iterador a la variable para avanzar una palabra si es que la palabra verificada no termina en un ":"
			}
		}


		//RENDERIZANDO MENSAJES
		if(args[4].substring(0, 3) == nombreusuario1.substring(0, 3))
		{
			contenidomensaje = lineas[iterador].substring((args[0].length + 1 + args[1].length + 1 + args[2].length + 1 + args[3].length + 1 + nombreusuario1.length + 1), lineas[iterador].length)
			var mensaje_nuevo = new Mensaje(contenidomensaje, horamensaje, horariomensaje, fechamensaje, usuariomensaje);
			//console.log(contenidomensaje);
			crear_div_mensaje(mensaje_nuevo.contenido, mensaje_nuevo.hora, mensaje_nuevo.horario, mensaje_nuevo.fecha, mensaje_nuevo.usuario);

			if(lineas[iterador] == lineas.length-1)
			{
				seguirciclo=false;
			}
		}
		else if(args[4].substring(0, 3) == nombreusuario2.substring(0, 3))
		{
			contenidomensaje = lineas[iterador].substring((args[0].length + 1 + args[1].length + 1 + args[2].length + 1 + args[3].length + 1 + nombreusuario2.length), lineas[iterador].length)
			usuariomensaje = true;
			var mensaje_nuevo = new Mensaje(contenidomensaje, horamensaje, horariomensaje, fechamensaje, usuariomensaje);
			//console.log(contenidomensaje);			
			crear_div_mensaje(mensaje_nuevo.contenido, mensaje_nuevo.hora, mensaje_nuevo.horario, mensaje_nuevo.fecha, mensaje_nuevo.usuario);

			if(lineas[iterador] == lineas.length-1)
			{
				seguirciclo = false;
			}
		}


		iterador++;
		if(iterador == lineas.length) //si ya está en la última línea de mensajes, se detiene el ciclo
		{
			seguirciclo = false;
		}
	}
}


//FUNCION PARA CREAR LOS DIVS QUE CONTIENEN LOS MENSAJES
function crear_div_mensaje(contenido, hora, horario, fecha, usuario)
{
	let mensajito = document.createElement("p");
	let estructura_mensaje = document.createElement("div");
	let horamensaje = document.createElement("span");

	estructura_mensaje.classList.add("message");

	if(usuario == true)
	{
		estructura_mensaje.classList.add("originalmente2")
		estructura_mensaje.classList.add("friend_msg");
	}
	else if(usuario == false)
	{
		estructura_mensaje.classList.add("originalmente1");
		estructura_mensaje.classList.add("my_msg");
	}

	horamensaje.appendChild(document.createTextNode(hora));
	mensajito.appendChild(document.createTextNode(contenido));
	estructura_mensaje.appendChild(mensajito);
	mensajito.appendChild(horamensaje);

	document.getElementById("mensajesdetexto").appendChild(estructura_mensaje);
}




//BOTONES DE USUARIOS
var mensajes_usuario1 = document.getElementsByClassName("originalmente1");
var mensajes_usuario2 = document.getElementsByClassName("originalmente2");

function botonejecutar1()
{
	//CSS COLORES
	botonusuario1.style.backgroundColor = "#005c4b";
	botonusuario1.style.color = "white";
	botonusuario2.style.backgroundColor = "#202c33";
	botonusuario2.style.color = "white";

	//CAMBIANDO DE LUGARES LOS MENSAJES
	for(var i = 0; i<=mensajes_usuario1.length-1; i++)
	{	
		mensajes_usuario1[i].classList.add("my_msg");
		mensajes_usuario1[i].classList.remove("friend_msg");
	}
	for(var i = 0; i<=mensajes_usuario2.length-1; i++)
	{	
		mensajes_usuario2[i].classList.add("friend_msg");
		mensajes_usuario2[i].classList.remove("my_msg");
	}
}

function botonejecutar2()
{
	//CSS COLORES
	botonusuario1.style.backgroundColor = "#202c33";
	botonusuario1.style.color = "white";
	botonusuario2.style.backgroundColor = "#005c4b";
	botonusuario2.style.color = "white";

	//CAMBIANDO DE LUGARES LOS MENSAJES
	for(var i = 0; i<=mensajes_usuario1.length-1; i++)
	{	
		mensajes_usuario1[i].classList.add("friend_msg");
		mensajes_usuario1[i].classList.remove("my_msg");
	}
	for(var i = 0; i<=mensajes_usuario2.length-1; i++)
	{	
		mensajes_usuario2[i].classList.add("my_msg");
		mensajes_usuario2[i].classList.remove("friend_msg");
	}
}

var darkmode = true;
var marco_es_gay = true;


//NO PUEDODOOOOO
function switchthemes()
{
	if(darkmode == true)
	{
		console.log("PRIMERA VEZ")

		$("div.message" ).find( "p" ).css( "background-color", "#d9fdd3");
		//FONDO DEL CHAT
		$("div.rightSide").css("background-color", "#efeae2");
		$("div.rightSide").css("background-image", "url(images/pattern.png)");
		$("div.rightSide").css("content", "''")
		$("div.rightSide").css("position", "absolute")
		$("div.rightSide").css("top", "0")
		$("div.rightSide").css("left", "0")
		//$("div.container.rightside").css("background", "url(images/pattern.png")
		$("div.rightSide").css("opacity", "1")


		$("div.header").css("background-color", "#f0f2f5");
		$("button.button1").css("background-color", "#06cf9c");
		$("div.message" ).find( "p" ).css( "color", "#111b21" );
		$(this).css('background', 'linear-gradient(135deg, #d9fdd3 0%, #d9fdd3 50%, transparent 50%, transparent');




		$("button.button3").css("background-color", "#f0f2f5");
		$("button.button4").css("background-color", "#f0f2f5");



		document.getElementById("botonsillomodos").textContent = "Dark Mode";
		darkmode = false;
	}
	else if(darkmode == false)
	{
		console.log("SEGUNDA VEZ");

		$("div.message" ).find( "p" ).css( "background-color", "#005c4b");
		//FONDO DEL CHAT
		//$("div.chatbox").css("background-image", "url(images/pattern.png)", "opacity: 0.06");
		$('head').append("<style>.chatbox:before { opacity:0.6; }</style>");
		$("div.rightSide").css("background-color", "#0b141a");

		$("div.header").css("background-color", "#202c33");
		$("button.button1").css("background-color", "#00a884");
		$("div.message" ).find( "p" ).css( "color", "#111b21" );
		$(this).css('background', 'linear-gradient(135deg, #d9fdd3 0%, #d9fdd3 50%, transparent 50%, transparent');




		$("button.button3").css("background-color", "#005c4b");
		$("button.button4").css("background-color", "#005c4b");



		document.getElementById("botonsillomodos").textContent = "Dark Mode";


		darkmode = true;
	}
}


