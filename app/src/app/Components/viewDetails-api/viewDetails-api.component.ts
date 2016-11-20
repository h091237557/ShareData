
import {
  Component,
  OnInit
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


export class ViewDetailsApiComponent implements OnInit {
  viewDetailsModel: ViewDetailsModel;

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    //this.getAllDatas();
  }
  getAllDatas(): void {
    //this.jsonDataService
      //.getAllDatas()
      //.then(datas => {
        //var coverResult = datas as ViewDatasModel[];
        //var resultLen = datas.length;
        //for (var i = 0; i < resultLen; i++) {
          //coverResult[i].sizeString = formatBytes(coverResult[i].size);
        //}
        //this.viewDatasModels = coverResult;
      //});
  }

}
