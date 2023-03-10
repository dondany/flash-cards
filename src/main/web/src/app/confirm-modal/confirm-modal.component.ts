import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input() message: string = '';
  @Input() show: any = false;
  @Input() closeCallback = () => (false);
  @Input() confirmCallback = () => (false);

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeCallback();
  }

  confirm() {
    this.confirmCallback();
  }

}
