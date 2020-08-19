import { Name as TreeName } from "@app/models/tree";

export interface ObservationValues {
    sanidades: string[],
    podas: string[],
    alturas: string[],
    fenologias: string[],
    nombres: TreeName[]
}
