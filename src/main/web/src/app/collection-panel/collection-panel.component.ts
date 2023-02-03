import { Component, OnInit } from '@angular/core';
import {FlashCardListResponse} from "../flash-card-response";
import {FlashCard} from "../flash-card";
import {FlashCardService} from "../flash-card.service";
import {Link} from "../link";

@Component({
  selector: 'app-collection-panel',
  templateUrl: './collection-panel.component.html',
  styleUrls: ['./collection-panel.component.css']
})
export class CollectionPanelComponent implements OnInit {
  flashCardListResponse!: FlashCardListResponse;
  flashCards!: FlashCard[];
  showModal: boolean = false;

  first!: Link;
  prev!: Link;
  self!: Link;
  next!: Link;
  last!: Link;
  numberOfPages!: number;
  currentPageNumber!: number;
  lastPageNumber!: number;

  constructor(private flashCardService: FlashCardService) { }

  ngOnInit(): void {
    this.flashCardService.getFlashCards(0,  10)
      .subscribe(response => this.init(response));
  }

  private init(response: FlashCardListResponse) {
    this.flashCardListResponse = response;
    this.flashCards = response._embedded.flashcards!;
    this.first = response._links.first;
    this.prev = response._links.prev;
    this.self = response._links.self;
    this.next = response._links.next;
    this.last = response._links.last;
    this.numberOfPages = response.page.totalPages;
    this.currentPageNumber = response.page.number + 1;
    this.lastPageNumber = response.page.totalPages;
  }

  addNewFlashCard() {
    this.changePage(this.self);
    this.showModal = false;
  }

  addNextFlashCard() {
    this.changePage(this.self);
  }

  openModal = () => {
    return this.showModal = true;
  }

  closeModal = () => {
    return this.showModal = false;
  }

  deleteFlashCard(id: number) {
    this.flashCardService.deleteFlashCard(id);
    this.flashCards = this.flashCards.filter(fc => fc.id !== id);
  }

  changePage(link: Link) {
    this.flashCardService.getFlashCardsByLink(link)
      .subscribe(response => this.init(response));
  }

}
