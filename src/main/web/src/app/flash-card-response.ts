import {FlashCard} from "./flash-card";

export interface Link {
  href: string;
}

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
