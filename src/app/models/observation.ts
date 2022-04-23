import { Tree } from 'src/app/models/tree';
import LatLngLiteral = google.maps.LatLngLiteral;

export interface ObservationDTO {
  pictures: string[];
  obs: Observation;
}

export interface Observation {
  fecha: string;
  coords: LatLngLiteral;
  direccion: string;
  arbol: Tree;
  comentario: string;
  taza: boolean;
  tutor: boolean;
}
