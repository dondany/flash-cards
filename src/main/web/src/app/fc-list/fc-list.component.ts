import {Component, Input, OnInit} from '@angular/core';
import {FlashCard} from "../../flash-card";
import {Paging} from "../../paging";
import {Link} from "../../link";
import {FlashCardService} from "../../flash-card.service";
import {PagingService} from "../paging.service";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../project";
import {Collection} from "../collection";

@Component({
  selector: 'app-flash-card-list',
  templateUrl: './fc-list.component.html',
  styleUrls: ['./fc-list.component.css']
})
export class FcListComponent implements OnInit {
  flashCards!: FlashCard[] | null;
  paging!: Paging | undefined;
  nextLink!: Link | undefined;
  selectedCards: FlashCard[] = [];
  showNewFcModal: boolean = false;
  showEditFcModal: boolean = false;
  flashCardBeingEdited: FlashCard = {front: '', back: ''};

  projectId: number | undefined;
  collectionId: number | undefined;

  constructor(private flashCardService: FlashCardService,
              private pagingService: PagingService,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];
      const collectionId = params['collectionId']
      this.projectId = +projectId;
      this.collectionId = +collectionId;
      this.flashCardService.getFlashCards(projectId, collectionId, 0, 20)
        .subscribe(response => {
          if (response) {
            this.flashCards = response.body;
            this.paging = this.pagingService.extractPaging(response);
            this.nextLink = this.paging?.next;
          }
        })
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
    this.selectedCards.forEach(fc => this.flashCardService.deleteFlashCard(fc.id, this.projectId, this.collectionId).subscribe(() => this.init()));
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

  addNewFlashCard($event: FlashCard) {
    this.flashCardService.addNewFlashCard($event, this.projectId, this.collectionId)
      .subscribe(res => {
        this.showNewFcModal = false;
        this.init();
      });
  }

  addNextFlashCard($event: FlashCard) {
    this.flashCardService.addNewFlashCard($event, this.projectId, this.collectionId);
  }

  editFlashCard($event: FlashCard) {
    this.flashCardService.updateFlashCard($event, this.projectId, this.collectionId)
      .subscribe(res => {
        this.init();
      })
  }

  deleteFlashCard($event: FlashCard) {
    this.flashCardService.deleteFlashCard($event.id, this.projectId, this.collectionId).subscribe(() => this.init());
  }

  loadMore() {
    console.log(this.paging);
    if (this.paging && this.paging.next) {

      this.flashCardService.getFlashCardsByLink(this.paging?.next)
        .subscribe(response => {
          if (response) {
            this.paging = this.pagingService.extractPaging(response);
            if (response.body && this.flashCards)
              this.flashCards = this.flashCards.concat(response.body);
            console.log(this.flashCards)
          }
        });

    }
  }

}
