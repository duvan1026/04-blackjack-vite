  
  /**
   * Crea las cartas en el html de acuerdo al turno del jugador asignado
 * @param {<String>} carta carta seleccionado
 * @param {Number} turno turno de jugador
   */
  export const crearCarta = ( carta, turno ) => {

    if( !carta ) throw new Error('La carta es obligatoria');

    const divCartasJugadores  = document.querySelectorAll( '.divCartas' );

    const imgCarta = document.createElement('img');//Crear una imagen
    imgCarta.src =`./assets/cartas/${ carta }.png`; //muestra la carta escogida.
    imgCarta.classList.add( 'carta' );
    divCartasJugadores[ turno ].append( imgCarta ); // Insertamos carta en el html seleccionada

}