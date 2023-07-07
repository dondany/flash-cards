import {UserType} from "../services/user-type";
import {ProjectSimpleType} from "./project-simple-type";
import {CollectionSimpleType} from "./collection-simple-type";

export type PracticeType = {
  id: number,
  name: string,
  description: string,
  owner: UserType,
  project: ProjectSimpleType,
  collections: CollectionSimpleType[]
}
