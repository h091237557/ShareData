import {
  Component,OnInit
} from '@angular/core';

import {
  JsonDataService
} from '../../Services/jsonData.service';

import { ViewDatasModel } from '../../ViewModels/viewDatas-viewModel';
import  a  from '../test';

@Component({
  selector: 'view-apis',
  templateUrl: './view-apis.component.html',
  styleUrls: ['./view-apis.component.css'],
  providers: [JsonDataService]
})


export class ViewApisComponent implements OnInit {
	viewDatasModels:ViewDatasModel[];

  constructor(private jsonDataService: JsonDataService) {
	}

	ngOnInit():void {
		this.getAllDatas();
	}
	getAllDatas():void{
		this.jsonDataService
				.getAllDatas()
				.then(datas => {
					this.viewDatasModels = datas as ViewDatasModel[];
				});
	}

}
