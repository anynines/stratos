import { Component, Input } from '@angular/core';

import { CardStatus } from '../../../../core/cf.types';

@Component({
  selector: 'app-application-state-icon',
  templateUrl: './application-state-icon.component.html',
  styleUrls: ['./application-state-icon.component.scss']
})
export class ApplicationStateIconComponent {

  @Input() public status: CardStatus;

}
