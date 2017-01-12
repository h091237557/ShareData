import {
  Component
} from '@angular/core';

import {
  JsonDataService
} from '../../Services/jsonData.service';

var validator = require('../../../lib/lib-validator');
var selectKeysObj = require('../../../lib/lib-selectKey');

@Component({
  selector: 'create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss'],
  providers: [JsonDataService]
})
export class CreateApiComponent {

  private _rapidPage: Object;
  private _errorMsg: string;
  enablesKeys: [string];
	selectKey : string;

  private _jsonString = '';
  private _describe = '';

  constructor(private jsonDataService: JsonDataService) {}

  onSaveData(): void {
    let jsonString = this.jsonStringValue;
    let describe = this.describeValue;

    validator.config = {
      jsonString: 'isArrayAndHaveData',
      describe: 'isNonEmpty'
    }

    var validResult = validator.validate({
      "jsonString": jsonString,
      "describe": describe
    });

    if (validResult) {
      var result = this.jsonDataService.createJsonData(jsonString, describe,this.selectKey);
    } else {
      alert('Please enter correctly data');
    }
  }

  onShowSelectKey(): void {
    let jsonString = this.jsonStringValue;
    let keys = selectKeysObj.selectEnablesKeys(jsonString);
    this.enablesKeys = keys;
  }

  onSelectKey(event: any): void {
    var selectedClass = 'keysModal__keyButton--active';
    var element = event.target;
    var oldSelectElement = document.getElementsByClassName(selectedClass);
		this.selectKey = "";
    if (oldSelectElement.length !== 0) {
      oldSelectElement[0].classList.remove(selectedClass);
    }

    if (!element.classList.contains(selectedClass)) {
			this.selectKey = element.textContent;	
      element.classList.add(selectedClass);
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
			var element = document.getElementsByClassName('json__createButton')[0];
			element["disabled"] = false;
			element.classList.add('json__createButton--active');
    } catch (e) {
      this._errorMsg = "error this string not json";
    };
  }
  get errorMsgValue() {
    return this._errorMsg;
  }


}
