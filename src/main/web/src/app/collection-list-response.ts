import {Collection} from "./collection";

export interface CollectionListResponse {
  _embedded: {
    collections: Collection[]
  }
}
