import {Component, Input} from '@angular/core';

@Component({
  selector: 'fc-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss']
})
export class VisibilityComponent {
  @Input() visibility!: string;
}
