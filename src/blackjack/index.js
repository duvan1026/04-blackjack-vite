
import _ from 'underscore';
// import { crearDeck as crearNuevoDeck } from "./usecases/crear-deck";// Renombramos la varable con el " nombreVariable as VariableRenombrada"
// import crearDeck from "./usecases/crear-deck"; // Exportacion por default, el nombre asignado en la variable guarda la exportacion
// import crearDack, { SegundaExportacion } from "./usecases/crear-deck";



// import { crearDeck } from "./usecases/crear-deck";
// import { pedirCarta } from "./usecases/pedir-carta";
// import { valorCarta } from "./usecases/valor-carta";
/** Simplificamos y organizamos las exportaciones en el archivo index.js */
import { crearDeck, pedirCarta, acumularPuntos, crearCarta } from "./usecases/index";

/**
 * Son funciones anonimas auto-invocadas
 * 
 * // (function(){
 * // })();
 * 
 * or
 * 
 * // ( ()=>{
 * // })()
 */ 
/*************Patron Modulo**************
* No se puede acceder desde el navegador, porque se encuentra
* ubicado en algun lugar de memoria sin un identificador por nombre
*/
const miModulo = (() => {
  'use strict';// JavaScript es estricto a la hora de evaluar el codigo.

  
  let deck         = []; // Cartas a utilizar
  const tipos      = ['C','D','H','S'],
        especiales = ['A','J','Q','K']; 

  let puntosJugadores = [];

  // Referencias del HTML
  const btnPedir   = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo   = document.querySelector('#btnNuevo');

  const divCartasJugadores  = document.querySelectorAll( '.divCartas' ),
        LabelPuntosHTML     = document.querySelectorAll('small');

   // Inicializa el juego     
  const inicializarJuego = ( numJugadores = 2 ) =>{

      deck = crearDeck( tipos, especiales );

      puntosJugadores = [];
      for( let i = 0; i < numJugadores; i++ ){// Inicializa el arreglo segun el numero de jugadores.
          puntosJugadores.push(0);
      }

      LabelPuntosHTML.forEach( elem => elem.innerText = 0 ); // Coloca los valores en 0 en el html correspondientes a los puntos.
      divCartasJugadores.forEach( elem => elem.innerHTML = '' );// Coloca los valores en '' en el html correspondientes a los div.

      btnPedir.disabled = false;
      btnDetener.disabled = false;
  }


  // Determina quien es el ganador mostrando un mensaje emergente
  const determinarGanador = () => {

      const [ puntosMinimos, puntosComputadora ] = puntosJugadores; // Desestructuración de arreglos.

      setTimeout( () => {

          if ( puntosComputadora === puntosMinimos ){
              alert('Nadie gana :c');
          }else if ( puntosMinimos > 21 ){
              alert('Computadora gana');
          }else if( puntosComputadora > 21 ){
              alert('Jugador Gana');
          }else {
              alert('computadora gana');
          }
      }, 100 );
  
  }



  // Turno de la Computadora
  const turnoComputadora = ( puntosMinimos ) => {

      let puntosComputadora = 0;

      do{

          const carta = pedirCarta( deck );
          deck = deck.filter((i) => i !== carta); // Filtramos y eliminamos la carta seleccionada.
          const turnoComputadora = puntosJugadores.length - 1;

          puntosComputadora = acumularPuntos( carta, turnoComputadora, puntosJugadores );
          crearCarta( carta, turnoComputadora );

      } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

      determinarGanador();
  }



  // Eventos 
  btnPedir.addEventListener( 'click',() => {

      const carta = pedirCarta( deck );
      deck = deck.filter((i) => i !== carta); // Filtramos y eliminamos la carta seleccionada.
      const puntosJugador = acumularPuntos( carta, 0, puntosJugadores );

      crearCarta( carta, 0 );

      if ( puntosJugador > 21 )
      {
          console.warn('Lo siento mucho, perdiste');
          btnPedir.disabled = true; // deshabilita el boton
          btnDetener.disabled = true;
          turnoComputadora( puntosJugador );

      } else if ( puntosJugador === 21 ){
          console.warn('21, genial');
          btnPedir.disabled = true; // deshabilita el boton
          btnDetener.disabled = true;
      }

  }); // Calback es una función que se envia como argumento.


  // Evento boton Detener
  btnDetener.addEventListener('click', () => {
      // console.log('Click boton detener');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      
      turnoComputadora( puntosJugadores[0] );
  });

  // Evento boton Nuevo
  btnNuevo.addEventListener( 'click', () => {

      inicializarJuego(); 

  });

  return {
     nuevoJuego: inicializarJuego
  };// Todo lo que se agregue en el return, SERA PUBLICO


})();

