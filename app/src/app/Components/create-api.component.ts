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

	jsonString = '';

	constructor () {
	}

  onSelect(): void {}

  onSelectPrettyJson(): void {
		this.jsonString = JSON.stringify(this.jsonString,null,2);
		  }
  //get rapidPageValue() {
      //return JSON.stringify(this._rapidPage, null, 2);
  //}
	set rapidPageValue(v:string) {
		try {
			this.jsonString = v;
			this._errorMsg = "";
		} catch (e) {
			this._errorMsg = "error this string not json";
		};
	}

  get errorMsgValue() {
    return this._errorMsg;
  }

}
