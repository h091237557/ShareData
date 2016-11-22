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


export class ViewDetailsApiComponent implements OnChanges {
  viewDetailsModel: ViewDetailsModel;

  @Input()
  dataKey: string;
	
  constructor(private jsonDataService: JsonDataService) {
	}

	ngOnChanges(...args:any[]):void{
		var dataKeyObj = args[0].dataKey;
		if(dataKeyObj){
			var id = dataKeyObj.currentValue;
			this.getDataById(id);	
		}
	}

	getDataById(id:string){
		this.jsonDataService
			.getDataById(id)
			.then(data => {
				var result = data as ViewDetailsModel;
				this.viewDetailsModel = result;
			});
	}

}

