
import { valorCarta } from "./valor-carta";

/**
 * Funcion que acumula los puntos del jugador
 * @param {<String>} carta carta seleccionado
 * @param {Number} turno turno de jugador
 * @returns {Array<Number>} puntosJugadores puntos jugadores
 */
export const acumularPuntos = ( carta, turno, puntosJugadores ) => {

    if( !carta ) throw new Error('La carta es obligatoria');

    const LabelPuntosHTML  = document.querySelectorAll('small');

    puntosJugadores[ turno ] += valorCarta( carta );
    LabelPuntosHTML[ turno ].innerText = puntosJugadores[ turno ];
    
    return puntosJugadores[ turno ];

}