import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FlashCard} from "../../flash-card";
import {Project} from "../project";
import {Collection} from "../collection";

@Component({
  selector: 'app-new-fc-modal',
  templateUrl: './new-fc-modal.component.html',
  styleUrls: ['./new-fc-modal.component.css']
})
export class NewFcModalComponent implements OnInit {
  @Input() show: any = false;
  @Input() closeCallback = () => (false);

  @Output() newFlashCardEvent = new EventEmitter<FlashCard>();
  @Output() nextFlashCardEvent = new EventEmitter<FlashCard>();

  project: Project | undefined;
  collection: Collection | undefined;

  form: FormGroup;

  isFlipped = false;

  constructor(private fb: FormBuilder) {
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
        this.newFlashCardEvent.emit(fc);
      }
    } else {
      const fc: FlashCard = {front: this.form.value.front, back: this.form.value.back};
       this.nextFlashCardEvent.emit(fc);
    }
    this.form.reset();
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
