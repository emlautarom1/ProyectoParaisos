export interface Tree {
  altura: string;
  diametro: number;
  fenologia: string[];
  nombre: TreeName;
  poda: string;
  sanidad: string;
  sintomas: string[];
}

export interface TreeName {
  cientifico: string;
  vulgar: string;
}
