import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { UserDetailPage } from '../../pages/user-detail/user-detail';
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
		this.checkTelSave();
	});

	
  }
  ngOnInit() {
	this.userData = JSON.parse(localStorage.getItem('content'));
	this.CallData = JSON.parse(localStorage.getItem('callList'));

	console.log('전화 목록들',this.CallData);
	
	this.checkTelSave();
	this.getMissedData();
	console.log('못 받은 목록들',this.callMissed);
	
  }


	checkTelSave(){
		for (let i = 0; i < this.userData.length; i++) {
			for (let j = 0; j < this.CallData.length; j++) {
			if (this.CallData[j].phone.replace(/\-/g, "") === this.userData[i].phone.replace(/\-/g, "")){
				console.log('같음 : ',this.CallData[j].name);
				this.CallData[j].name=this.userData[i].name;
			}
		}
		}
		// console.log('전화부에 등록이 안된 전화번호');
		// return '';
	}


	getMissedData(){
		this.callMissed = [];
		for (let i = 0; i < this.CallData.length; i++) {
			if (this.CallData[i].receive === false) {
				this.callMissed.push(this.CallData[i]);
			}
		}
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
				this.getMissedData()
			})
		}
	}
	console.log(this.CallData);
	localStorage.setItem('callList', JSON.stringify(this.CallData));
	// location.reload();
}
userDetail(callUser: any,userDataId:Number) {
	


	for (let i = 0; i < this.userData.length; i++) {
		if (callUser.phone.replace(/\-/g, "") === this.userData[i].phone.replace(/\-/g, "")) { //전화부에 등록된 사람은 전화부에 데이터가 필요
			console.log('전화부에 있음 userData : ',this.userData[i]);
			return this.navCtrl.push(UserDetailPage, { call:callUser,user: this.userData[i] });
			
		}
	}
	return this.navCtrl.push(UserDetailPage, { call:callUser,user: '' });
	// this.navCtrl.push(UserDetailPage, { call:callUser,user: this.userData[userDataId] });
}

}
