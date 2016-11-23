import {
  Component,
  OnInit,
  Input,
  OnChanges
} from '@angular/core';

import {
  JsonDataService
} from '../../Services/jsonData.service';

import {
  ViewDetailsModel
} from '../../ViewModels/viewDetails-viewModel';
import formatBytes from '../../../lib/lib-byteToSize';

@Component({
  selector: 'viewDetails-api',
  templateUrl: './viewDetails-api.component.html',
  styleUrls: ['./viewDetails-api.component.scss'],
  providers: [JsonDataService]
})

export class ViewDetailsApiComponent  {
	@Input()
  viewDetailsModel: ViewDetailsModel;

  constructor(private jsonDataService: JsonDataService) {
  }



}
