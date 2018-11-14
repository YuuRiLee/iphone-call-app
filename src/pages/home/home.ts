import { Component,ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserDetailPage } from '../../pages/user-detail/user-detail';

import { ServiceProvider } from '../../providers/http-service/http-service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('input') inputEl;

	userData: any;

	groupedContacts: any[] = [];
	searchArr: any[] = []; //검색을 하고 난 뒤에 원래 값을 가지도록 groupedContacts을 가지고 있음
	
	constructor(
		public navCtrl: NavController,
		private serviceProvider: ServiceProvider
	) {
		this.serviceProvider.userCast.subscribe(data => {
			if(data) {
				this.userData = data;
				this.groupContacts(this.userData);
			}
		});
	}

	groupContacts(contacts) {
		this.groupedContacts=this.serviceProvider.groupContacts(contacts);
		this.searchArr = this.groupedContacts;
	}
	
	userDetail(userId) {
		this.navCtrl.push(UserDetailPage, { user: userId });
	}
	userCreate() {
		this.serviceProvider.userCreate();
	}
	getItems(ev){
		this.groupedContacts=this.serviceProvider.getItems(ev,this.searchArr);
	}

}


