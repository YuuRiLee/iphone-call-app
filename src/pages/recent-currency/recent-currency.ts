import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { UserDetailPage } from '../../pages/user-detail/user-detail';
import { ServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-recent-currency',
  templateUrl: 'recent-currency.html'
})
export class RecentCurrencyPage {
  user: any;
  userData: any=[];
  CallData: any;
  callMissed: any[] = [];
  showDelete: boolean = false;
  call = 'all';
  constructor(
	  public navCtrl: NavController,
	  public navParams: NavParams,
	  private serviceProvider: ServiceProvider
	  ) {

	this.serviceProvider.userCast.subscribe(data => {
		if(data) {
			this.userData = data;
			this.checkTelSave();
		}
	});

	this.serviceProvider.callListCast.subscribe(data => {
		if(data) {
			this.CallData = data;
			console.log('전화 목록 : ',this.CallData);
			this.checkTelSave();
			this.getMissedData();
		}
	});
	this.checkTelSave();
	this.getMissedData();
  }

	checkTelSave(){
		for (let i = 0; i < this.userData.length; i++) {
			for (let j = 0; j < this.serviceProvider.callList.length; j++) {
			if (this.serviceProvider.callList[j].phone.replace(/\-/g, "") === this.userData[i].phone.replace(/\-/g, "")){
				this.serviceProvider.callList[j].name=this.userData[i].name;
			}
		}
		}
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
	this.showDelete = false;
}
callDataDell(data: any) {
	for (let i = 0; i < this.CallData.length; i++) {
		if (data.id === this.CallData[i].id) {
			this.CallData.forEach((v, i, a) => {
				if (v.id === data.id) {
					a.splice(i, 1);
					this.callMissed.forEach((v2,i2,a2)=>{
						if(v2.id===v.id){
							a2.slice(i2,1);
						}
					})
				}
				this.getMissedData();
			})
		}
	}
	this.serviceProvider.SetCallData(this.CallData);
}
userDetail(callUser: any) {
	for (let i = 0; i < this.userData.length; i++) {
		if (callUser.phone.replace(/\-/g, "") === this.userData[i].phone.replace(/\-/g, "")) { //전화부에 등록된 사람은 전화부에 데이터가 필요
			return this.navCtrl.push(UserDetailPage, { call:callUser,user: this.userData[i].id });
			
		}
	}
	return this.navCtrl.push(UserDetailPage, { call:callUser,user: '' });
}

}
