import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-recent-currency',
  templateUrl: 'recent-currency.html'
})
export class RecentCurrencyPage {
  user: any;
  userData: any[]=[];
  CallData: any[]=[];
  callMissed: any[] = [];
  showDelete: boolean = false;
  call = 'all';
  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
	// this.user = navParams.get('user');
	
	this.events.subscribe('recentTabClicked', () => {
		this.userData = JSON.parse(localStorage.getItem('content'));	
		this.CallData = JSON.parse(localStorage.getItem('callList'));

	});

	
  }
  ngOnInit() {
	this.userData = JSON.parse(localStorage.getItem('content'));
	this.CallData = JSON.parse(localStorage.getItem('callList'));

	console.log('전화 목록들',this.CallData);
	

	for (let i = 0; i < this.CallData.length; i++) {
		if (this.CallData[i].receive === false) {
			this.callMissed.push(this.CallData[i]);
		}
	}
	console.log('못 받은 목록들',this.callMissed);
  }

  editBookmark() {
	this.showDelete = true;

}
doneEdit() {
	//location.reload();
	this.showDelete = false;
}
callDataDell(data: any) {
	for (let i = 0; i < this.CallData.length; i++) {
		if (data.id === this.CallData[i].id) {
			console.log('same');
			//this.CallData[i].receive = false;
			this.CallData.forEach((v, i, a) => {
				if (v.id === data.id) {
					a.splice(i, 1);
					this.callMissed.forEach((v2,i2,a2)=>{
						if(v2.id===v.id){
							a2.slice(i2,1);
						}
					})
				}
			})
		}
	}
	console.log(this.CallData);
	localStorage.setItem('callList', JSON.stringify(this.CallData));
	// location.reload();
}

}
