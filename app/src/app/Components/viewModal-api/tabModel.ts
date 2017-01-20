
export class TabModel {
	title : string;
	show : boolean;
	contentShow : boolean;
	componentName : string;
	constructor(title:string,show:boolean,contentShow:boolean,componentName:string){
		this.title = title;	
		this.show = show;
		this.contentShow = contentShow;
		this.componentName = componentName;
	}
}
