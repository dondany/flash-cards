import {CollectionSimpleType} from "./collection-simple-type";

export type ProjectSimpleType = {
  id: number,
  name: string,
  collections: CollectionSimpleType[];
}
