import { Component } from '@angular/core';
import {FlashCard} from "../flash-card";
import {FlashCardListResponse} from "../flash-card-response";
import {FlashCardService} from "../flash-card.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  flashCardListResponse!: FlashCardListResponse;
  flashCards!: FlashCard[];
  selectedCards: FlashCard[] = [];
  showNewFcModal: boolean = false;
  showEditFcModal: boolean = false;
  flashCardBeingEdited: FlashCard = {front: '', back: ''};

  constructor(private flashCardService: FlashCardService) { }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.flashCardService.getFlashCards(0,  20)
      .subscribe(response => {
        console.log(response)
        this.flashCardListResponse = response;
        if (response._embedded) {
          this.flashCards = response._embedded.flashcards!;
        }
      });
  }

  selectCard(flashcard: FlashCard) {
    if (this.selectedCards.find(c => c.id === flashcard.id)) {
      this.selectedCards = this.selectedCards.filter(c => c.id !== flashcard.id);
    } else {
      this.selectedCards.push(flashcard);
    }
  }

  deleteSelected() {
    this.selectedCards.forEach(fc => this.flashCardService.deleteFlashCard(fc.id).subscribe(() => this.init()));
    this.selectedCards = [];
  }

  openNewFcModal() {
    this.showNewFcModal = true;
  }

  closeNewFcModal = () => {
    return this.showNewFcModal = false;
  }

  openEditFcModal($event: FlashCard) {
    this.flashCardBeingEdited = $event;
    this.showEditFcModal = true;
  }

  closeEditFcModal = () => {
    return this.showEditFcModal = false;
  }

  addNewFlashCard() {
    this.showNewFcModal = false;
  }

  addNextFlashCard() {
  }

  editFlashCard($event: FlashCard) {
    this.flashCardService.updateFlashCard($event);
    this.init();
  }

  deleteFlashCard($event: FlashCard) {
    this.flashCardService.deleteFlashCard($event.id).subscribe(() => this.init());
  }
}
