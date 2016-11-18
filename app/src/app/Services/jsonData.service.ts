import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  Headers
} from '@angular/http';
import {
  Observable
} from 'rxjs';

@Injectable()
export class JsonDataService {
  constructor(private http: Http) {}
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private apiUrl = 'http://127.0.0.1:3000/datas';

  createJsonData(json: any, describe: string): Promise < any > {

    var sendData = {
      data: json,
      describe: describe,
      author: "mark"
    };
    return this.http
      .post(this.apiUrl, sendData, {
        headers: this.headers
      })
      .toPromise()
      .then(res => {
        if (res.status == 200) {
          alert('Create Success');
        }
      })
      .catch(this.handleError);
  }

  getAllDatas(): Promise < any > {

    return this.http
      .get(this.apiUrl)
      .toPromise()
      .then(res => {
			 return	Promise.resolve(res.json());
      }).catch(this.handleError);

  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
