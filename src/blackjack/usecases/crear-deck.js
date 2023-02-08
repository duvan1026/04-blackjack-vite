import _ from 'underscore';

  // Crea y retorna un nuevo deck(baraja de cartas).
export const crearDeck = ( tiposDeCarta, tiposEspeciales ) => {

    let deck = []; // INicializamos el deck                                        
    
    for( let i = 2; i <= 10; i++) {// Crea las cartas del 2 al 10 con los diferentes tipos(corazon, diamantes, treboles...)
        for( let tipo of tiposDeCarta  ){
            deck.push( i + tipo );          
        }
    }
    
    for( let tipo of tiposDeCarta ){// Crea las cartas de especiales
        for( let especial of tiposEspeciales ){
            deck.push( especial + tipo );
        }
    }   

    return _.shuffle( deck );// Organiza las cartas de forma randow
}

