  import { pedirCarta, crearCarta, acumularPuntos, determinarGanador } from "./index";
  
  /**
   * Turno de la Computadora
   * @param {Array<Number>} puntosJugadores 
   * @param {Array<String>} deck 
   */
  export const turnoComputadora = ( puntosJugadores, deck ) => {


    let [ puntosMinimos, puntosComputadora ] = puntosJugadores; // Desestructuración de arreglos.

    do{
        const carta = pedirCarta( deck );
        deck = deck.filter((i) => i !== carta); // Filtramos y eliminamos la carta seleccionada.
        const turnoComputadora = puntosJugadores.length - 1;

        puntosComputadora = acumularPuntos( carta, turnoComputadora, puntosJugadores );
        crearCarta( carta, turnoComputadora );

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador( puntosMinimos, puntosComputadora );
}