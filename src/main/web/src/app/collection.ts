import {Link} from "./link";

export interface Collection {
  id?: number,
  name: string,
  description: string,
  numberOfFlashCards: number,
  favorite: boolean
  _links: {
    self: Link,
    "flash-cards-paged" : Link,
    "flash-cards": Link,
    collections: Link,
    project: Link
  }
}
