import { Injectable } from '@angular/core';
import { Name as TreeName } from '@app/models/tree';

@Injectable({
  providedIn: 'root'
})
export class FormValuesService {
  // TODO: Se deberia hacer por medio de pedidos HTTP y no con valores hard-codeados

  constructor() { }

  getSanidades(): string[] {
    return [
      'Muy Bueno',
      'Bueno',
      'Malo',
      'Muerto'
    ];
  }

  getAlturas(): string[] {
    return [
      '0 - 2m.',
      '2 - 4m.',
      '4 - 10m.',
      'más de 10m.'
    ];
  }

  getFenologias(): string[] {
    return [
      'Caida de Hojas',
      'Floración',
      'Follaje Completo',
      'Rebrote',
      'Fructificación',
    ];
  }

  getSintomas(): string[] {
    return [
      'Amarillamiento de Hojas',
      'Escoba de Brujas',
      'Reducción de Hojas',
      'Otros'
    ];
  }

  getNombresArbol(): TreeName[] {
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
