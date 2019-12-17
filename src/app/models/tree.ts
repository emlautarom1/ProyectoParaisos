export interface Tree {
    altura: string;
    diametro: number;
    fenologia: string[];
    nombre: Name;
    podaCorrecta: string;
    sanidad: string;
    sintomas: string[];
    taza: boolean;
    tutor: boolean;
}

export interface Name {
    cientifico: string;
    vulgar: string;
}
