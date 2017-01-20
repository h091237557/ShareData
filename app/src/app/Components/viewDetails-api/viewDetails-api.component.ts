import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
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

export class ViewDetailsApiComponent implements OnInit{
  @Input()
  selectId: string;

  viewDetailsModel: ViewDetailsModel;

  constructor(private jsonDataService: JsonDataService) {}
	ngOnInit(){

	}
  ngOnChanges(changes: SimpleChanges) {
    var selectId = changes["selectId"].currentValue;
		this.getDataAndDetailById(selectId);
  }
  getDataAndDetailById(id: string) {
    var result: any;
    this.jsonDataService
      .getDataById(id)
      .then(data => {
        result = data as ViewDetailsModel;
        result.sizeString = formatBytes(result.size);
        this.jsonDataService
          .getDataDetailsByUrl(result.url)
          .then(dataDetails => {
            //result.data =JSON.stringify(dataDetails,null,4);
            this.viewDetailsModel = result;
            //要讓modal出現後才能丟值。
            setTimeout(() => {
              document.getElementById("json").innerHTML = JSON.stringify(dataDetails, null, 4);
            }, 0)
          })
      });
  }
}
