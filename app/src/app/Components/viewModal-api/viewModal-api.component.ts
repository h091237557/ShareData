import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ElementRef
} from '@angular/core';


import {
  ViewDetailsApiComponent
} from '../viewDetails-api/viewDetails-api.component';
import {
	TestGetApiComponent
} from '../testGet-api/testGet-api.component';

import {
  TabModel
} from './tabModel';

@Component({
  selector: 'viewModal-api',
  templateUrl: './viewModal-api.component.html',
  styleUrls: ['./viewModal-api.component.scss'],
  directives: []
})

export class ViewModalApiComponent implements OnInit {
  @Input()
  selectId: string;
  tabs: TabModel[] = [];
  constructor(myElement: ElementRef) {}
  ngOnInit(): void {
    this.tabs.push(new TabModel("Details", true, true, "viewdetails-api"));
    this.tabs.push(new TabModel("TryGet", true, false, "testGet-api"));
    this.tabs.forEach((obj: any) => {
      if (obj.contentShow === true) {
        let componentName = obj.componentName;
        let component = document.getElementsByTagName(componentName)[0];
        component.hidden = false;
      }
    })
  }
  selectTab(tab: TabModel) {
    this.tabs.forEach((obj: any) => {
      let componentName = obj.componentName;
      let component = document.getElementsByTagName(componentName)[0];
      component.hidden = (tab.componentName === obj.componentName) ? false : true;
    })
  }
}
