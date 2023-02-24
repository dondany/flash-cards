import {FlashCard} from "./flash-card";
import {Link} from "./link";

export interface FlashCardListResponse {
  _embedded: {
    flashcards: FlashCard[]
  },
  _links: {
    first: Link,
    prev: Link,
    self: Link,
    next: Link,
    last: Link
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
