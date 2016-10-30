import {
  Component
} from '@angular/core';


@Component({
  selector: 'create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.css']
})
export class CreateApiComponent {

  private _rapidPage: Object;
  private _errorMsg: string;

  private _jsonString = '';

  constructor() {}

  onSelect(): void {
			let jsonstring = this.jsonStringValue;
	}

  onSelectPrettyJson(): void {
      //this.jsonString = JSON.stringify(this.jsonString, null, 2);
    }

	get jsonStringValue(){
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
