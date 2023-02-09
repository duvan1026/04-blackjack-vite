  // Determina quien es el ganador mostrando un mensaje emergente
  /**
   * 
   * @param {Number} puntosMinimos 
   * @param {Number} puntosComputadora 
   */
  export const determinarGanador = ( puntosMinimos, puntosComputadora ) => {

    if( !( puntosMinimos >= 0 ) )     throw new Error("puntosMinimos no validos");
    if( !( puntosComputadora >= 0 ) ) throw new Error("puntosComputadora no validos");

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