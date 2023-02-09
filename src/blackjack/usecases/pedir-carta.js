

  /**
   * Esta función me permite tomar una carta
   * @param {Array<String>} deck es un arreglo de string
   * @returns {String} retorna la carta del deck
   */
export const pedirCarta = ( deck ) => {

    if( !deck || deck.length === 0 ){
        throw 'No hay mas cartas en el deck'; // Mensaje de alerta que se han agotado las cartas
    }
    const carta = deck[Math.floor(Math.random() * deck.length)]; // seleccionamos un dato randow del arreglo.
    deck = deck.filter((i) => i !== carta); // Filtramos y eliminamos la carta seleccionada
    return carta;
}