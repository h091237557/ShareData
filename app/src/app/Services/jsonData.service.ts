import { Injectable }     from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class JsonDataService {
	constructor(private http: Http) {}
	private headers = new Headers({'Content-Type': 'application/json'});
	private apiUrl = '';

	createJsonData(json:any, describe:string) : Promise<any>{
	var sendData = {
		data:json,
		describe:describe
	};
		return this.http
			.post(this.apiUrl,JSON.stringify(sendData),{headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


