import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FlashCardService} from "../flash-card.service";
import {FlashCard} from "../flash-card";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() show = false;
  @Input() customClass = '';
  @Input() closeCallback = () => (false);

  @Output() newFlashCardEvent = new EventEmitter<FlashCard>();
  @Output() nextFlashCardEvent = new EventEmitter<FlashCard>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private flashCardService: FlashCardService) {
    this.form = this.fb.group({
      front: [''],
      back: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    if (event.submitter.name == 'add') {
      if (this.form.value.front && this.form.value.back) {
        const fc: FlashCard = {front: this.form.value.front, back: this.form.value.back};
        this.flashCardService.addNewFlashCard(fc);
        this.newFlashCardEvent.emit(fc);
      }
    } else {
      const fc: FlashCard = {front: this.form.value.front, back: this.form.value.back};
      this.flashCardService.addNewFlashCard(fc);
      this.nextFlashCardEvent.emit(fc);
      console.log("dsdsd");
    }
    this.form.reset();
  }

}
