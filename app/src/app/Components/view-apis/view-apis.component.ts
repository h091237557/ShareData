import {
  Component,
  OnInit
} from '@angular/core';

import {
  JsonDataService
} from '../../Services/jsonData.service';

import {
  ViewDatasModel
} from '../../ViewModels/viewDatas-viewModel';

import {
  ViewDetailsModel
} from '../../ViewModels/viewDetails-viewModel';

import formatBytes from '../../../lib/lib-byteToSize';

@Component({
  selector: 'view-apis',
  templateUrl: './view-apis.component.html',
  styleUrls: ['./view-apis.component.scss'],
  providers: [JsonDataService]
})


export class ViewApisComponent implements OnInit {
  viewDatasModels: ViewDatasModel[];
  selectId: string;

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    this.getAllDatas();
  }
  onSelect(model: ViewDatasModel): void {
    let selectDataKey = model._id.toString();
		this.selectId = selectDataKey;
    //this.getDataAndDetailById(selectDataKey);
  }
  getAllDatas(): void {
    this.jsonDataService
      .getAllDatas()
      .then(datas => {
        var coverResult = datas as ViewDatasModel[];
        var resultLen = datas.length;
        for (var i = 0; i < resultLen; i++) {
          coverResult[i].sizeString = formatBytes(coverResult[i].size);
        }
        this.viewDatasModels = coverResult;
      });
  }
}
