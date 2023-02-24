import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FlashCard} from "../../flash-card";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FlashCardService} from "../../flash-card.service";

@Component({
  selector: 'app-edit-fc-modal',
  templateUrl: './edit-fc-modal.component.html',
  styleUrls: ['./edit-fc-modal.component.css']
})
export class EditFcModalComponent implements OnInit {
  @Input() show: any = false;
  @Input() closeCallback = () => (false);
  @Input() inputFlashCard!: FlashCard;

  @Output() editFlashCard = new EventEmitter<FlashCard>();

  form: FormGroup;
  isFlipped = false;
  flashCard!: FlashCard;

  constructor(private fb: FormBuilder, private flashCardService: FlashCardService) {
    this.form = this.fb.group({
      front: [''],
      back: ['']
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputFlashCard']) {
      this.flashCard = changes['inputFlashCard'].currentValue;
      this.form.get('front')?.setValue(this.flashCard.front);
      this.form.get('back')?.setValue(this.flashCard.back);
    }
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.inputFlashCard.front !== this.form.value.front || this.inputFlashCard.back !== this.form.value.back) {
      const fc: FlashCard = {id: this.inputFlashCard.id, front: this.form.value.front, back: this.form.value.back};
      this.flashCardService.updateFlashCard(fc).subscribe(fc => this.editFlashCard.emit(fc));
    }
    this.close();
  }

  close() {
    this.closeCallback();
  }

  flipFront() {
    this.isFlipped = false;
  }

  flipBack() {
    this.isFlipped = true;
  }

}
