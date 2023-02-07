import './style.css';
import _ from 'underscore';

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

      deck = crearDeck();

      puntosJugadores = [];
      for( let i = 0; i < numJugadores; i++ ){// Inicializa el arreglo segun el numero de jugadores.
          puntosJugadores.push(0);
      }

      LabelPuntosHTML.forEach( elem => elem.innerText = 0 ); // Coloca los valores en 0 en el html correspondientes a los puntos.
      divCartasJugadores.forEach( elem => elem.innerHTML = '' );// Coloca los valores en '' en el html correspondientes a los div.

      btnPedir.disabled = false;
      btnDetener.disabled = false;
  }

  // Crea y retorna un nuevo deck(baraja de cartas).
  const crearDeck = () => {

      deck = []; // INicializamos el deck                                        
      
      for( let i = 2; i <= 10; i++) {// Crea las cartas del 2 al 10 con los diferentes tipos(corazon, diamantes, treboles...)
          for( let tipo of tipos  ){
              deck.push( i + tipo );          
          }
      }
      
      for( let tipo of tipos ){// Crea las cartas de especiales
          for( let especial of especiales ){
              deck.push( especial + tipo );
          }
      }        
      return _.shuffle( deck );// Organiza las cartas de forma randow
  }

  // Esta función me permite tomar una carta
  const pedirCarta = () => {

      if( deck.length === 0 )
      {
          throw 'No hay mas cartas en el deck'; // Mensaje de alerta que se han agotado las cartas
      }
      const carta = deck[Math.floor(Math.random() * deck.length)]; // seleccionamos un dato randow del arreglo.
      deck = deck.filter((i) => i !== carta); // Filtramos y eliminamos la carta seleccionada.
      return carta;
  }

  // Obtiene el valor de la carta seleccionada.
  const valorCarta = ( carta ) => {

      const valor = carta.substring(0, carta.length - 1); // corta el string sin tomar la ultima letra.
      return ( isNaN( valor ) ) ? 
              ( valor === 'A' ) ? 11 : 10 
              : valor * 1;
  }

  // Turno: 0 = primer jugador
  // Turno: * = siguiente jugador
  // Turno: ultimo = Computadora
  const acumularPuntos = ( carta, turno ) => {
      
      puntosJugadores[ turno ] += valorCarta( carta );
      LabelPuntosHTML[ turno ].innerText = puntosJugadores[ turno ];
      return puntosJugadores[ turno ];
  
  }

  // Crea las cartas en el html de acuerdo al turno del jugador asignado
  const crearCarta = ( carta, turno ) => {

      const imgCarta = document.createElement('img');//Crear una imagen
      imgCarta.src =`./assets/cartas/${ carta }.png`; //muestra la carta escogida.
      imgCarta.classList.add( 'carta' );
      divCartasJugadores[ turno ].append( imgCarta ); // Insertamos carta en el html seleccionada

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

          const carta = pedirCarta();
          const turnoComputadora = puntosJugadores.length - 1;

          puntosComputadora = acumularPuntos( carta, turnoComputadora );
          crearCarta( carta, turnoComputadora );

      } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

      determinarGanador();
  }



  // Eventos 
  btnPedir.addEventListener( 'click',() => {

      const carta = pedirCarta();
      const puntosJugador = acumularPuntos( carta, 0 );

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

