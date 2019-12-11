import { Injectable } from '@angular/core';
import { NombreArbol } from 'src/app/models/observacion-arbol';

@Injectable({
  providedIn: 'root'
})
export class ValuesProviderService {

  constructor() { }

  getAlturas() {
    return [

    ]
  }

  getNombresArbol(): NombreArbol[] {
    return [
      {
        cientifico: 'Acer spp',
        vulgar: 'Arce'
      },
      {
        cientifico: 'Albizia julibrissin',
        vulgar: 'Acacia de Constantinopla'
      },
      {
        cientifico: 'Araucaria bidwillii',
        vulgar: 'Araucaria'
      },
      {
        cientifico: 'Branchychiton populneum',
        vulgar: 'Braquiquito'
      },
      {
        cientifico: 'Catalpa bignonioides',
        vulgar: 'Catalpa'
      },
      {
        cientifico: 'Cedrus spp',
        vulgar: 'Cedro'
      },
      {
        cientifico: 'Ceiba speciosa',
        vulgar: 'Palo Borracho'
      },
      {
        cientifico: 'Cercis siliquastrum',
        vulgar: 'Árbol de Judea'
      },
      {
        cientifico: 'Cupressus spp',
        vulgar: 'Ciprés'
      },
      {
        cientifico: 'Eucalyptus spp',
        vulgar: 'Eucalipto'
      },
      {
        cientifico: 'Firmiana platanifolia',
        vulgar: 'Parasol de la China'
      },
      {
        cientifico: 'Fraxinus spp',
        vulgar: 'Frezno'
      },
      {
        cientifico: 'Grevillea robusta',
        vulgar: 'Roble Sedoso'
      },
      {
        cientifico: 'Handroanthus spp',
        vulgar: 'Lapacho'
      },
      {
        cientifico: 'Jacaranda mimosifolia',
        vulgar: 'Jacarandá'
      },
      {
        cientifico: 'Lagerstroemia indica',
        vulgar: 'Crespón'
      },
      {
        cientifico: 'Ligustrum lucidum',
        vulgar: 'Ligustro'
      },
      {
        cientifico: 'Liquidambar',
        vulgar: 'Liquidambar'
      },
      {
        cientifico: 'Magnolia grandiflora',
        vulgar: 'Magnolia'
      },
      {
        cientifico: 'Melia azedarach',
        vulgar: 'Paraíso'
      },
      {
        cientifico: 'Morus spp',
        vulgar: 'Mora'
      },
      {
        cientifico: 'Parasenegalia visco',
        vulgar: 'Acacia visco'
      },
      {
        cientifico: 'Pinus spp',
        vulgar: 'Pino'
      },
      {
        cientifico: 'Platanus acerifolia',
        vulgar: 'Plátano'
      },
      {
        cientifico: 'Prosopis spp',
        vulgar: 'Algarrobo'
      },
      {
        cientifico: 'Prunus spp',
        vulgar: 'Ciruelo'
      },
      {
        cientifico: 'Quercus ilex',
        vulgar: 'Encina'
      },
      {
        cientifico: 'Quercus robur',
        vulgar: 'Roble'
      },
      {
        cientifico: 'Robinia pseudoacacia',
        vulgar: 'Acacia Blanca'
      },
      {
        cientifico: 'Salix spp',
        vulgar: 'Sauce'
      },
      {
        cientifico: 'Schinus areira',
        vulgar: 'Aguaribay'
      },
      {
        cientifico: 'Styphnolobium japonicum',
        vulgar: 'Sófora'
      },
      {
        cientifico: 'Tilia spp',
        vulgar: 'Tilo'
      },
      {
        cientifico: 'Tipuana tipu',
        vulgar: 'Tipa'
      },
      {
        cientifico: 'Ulmus spp',
        vulgar: 'Olmo'
      },
    ];
  }
}
