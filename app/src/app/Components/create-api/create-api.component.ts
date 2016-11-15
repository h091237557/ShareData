import {
  Component
} from '@angular/core';

import {
  JsonDataService
} from '../../Services/jsonData.service';

var validator = require('../../../lib/lib-validator');

@Component({
  selector: 'create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss'],
  providers: [JsonDataService]
})
export class CreateApiComponent {

  private _rapidPage: Object;
  private _errorMsg: string;

  private _jsonString = '';
  private _describe = '';

  constructor(private jsonDataService: JsonDataService) {}

  onSelect(): void {
    let jsonString = this.jsonStringValue;
    let describe = this.describeValue;

    validator.config = {
      jsonString: 'isArray',
      describe: 'isNonEmpty'
    }

    var validResult = validator.validate({
      "jsonString": jsonString,
      "describe": describe
    });

		if(validResult){
      var result = this.jsonDataService.createJsonData(jsonString, describe);
		}else{
      alert('Please enter correctly data');
		}
  }

  onSelectPrettyJson(): void {
    //this.jsonString = JSON.stringify(this.jsonString, null, 2);
  }
  get describeValue() {
    return this._describe;
  }

  set describeValue(s: string) {
    this._describe = s;
  }

  get jsonStringValue() {
    return this._jsonString;
  }

  set jsonStringValue(v: string) {
    try {
      this._jsonString = JSON.parse(v);
      this._errorMsg = "";
    } catch (e) {
      this._errorMsg = "error this string not json";
    };
  }
  get errorMsgValue() {
    return this._errorMsg;
  }

}
