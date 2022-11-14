import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FlashCardService} from "../flash-card.service";

@Component({
  selector: 'app-new-flash-card',
  templateUrl: './new-flash-card.component.html',
  styleUrls: ['./new-flash-card.component.css']
})
export class NewFlashCardComponent implements OnInit {

  newCardForm = this.formBuilder.group({
    front: '',
    back: ''
  })

  constructor(private flashCardService: FlashCardService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let front:string = this.newCardForm.value.front!;
    let back:string = this.newCardForm.value.back!;
    this.flashCardService.addNewFlashCard({  front, back });
  }

}
