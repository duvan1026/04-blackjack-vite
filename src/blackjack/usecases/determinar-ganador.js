  // Determina quien es el ganador mostrando un mensaje emergente
  export const determinarGanador = ( puntosMinimos, puntosComputadora ) => {

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