import { LatLngLiteral } from '@agm/core';
import { Tree } from './tree';

export interface ObservationDTO {
    pictures: string[],
    obs: Observation
}

export interface Observation {
    fecha: string,
    coords: LatLngLiteral,
    direccion: string,
    arbol: Tree
    comentario: string,
    taza: boolean,
    tutor: boolean,
}