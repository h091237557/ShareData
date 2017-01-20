
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  ViewDetailsModel
} from '../../ViewModels/viewDetails-viewModel';
import {
  JsonDataService
} from '../../Services/jsonData.service';

import formatBytes from '../../../lib/lib-byteToSize';

@Component({
  selector: 'testGet-api',
  templateUrl: './testGet-api.component.html',
  styleUrls: ['./testGet-api.component.scss'],
  providers: [JsonDataService]
})

export class TestGetApiComponent implements OnInit{
  @Input()
  selectId: string;

  viewDetailsModel: ViewDetailsModel;

  constructor(private jsonDataService: JsonDataService) {}
	ngOnInit(){
	}
  ngOnChanges(changes: SimpleChanges) {
 }
}
