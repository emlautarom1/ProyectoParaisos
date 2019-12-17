export interface Tree {
    altura: string;
    diametro: number;
    fenologia: string[];
    nombre: Name;
    poda: string;
    sanidad: string;
    sintomas: string[];
    taza: boolean;
    tutor: boolean;
}

export interface Name {
    cientifico: string;
    vulgar: string;
}
