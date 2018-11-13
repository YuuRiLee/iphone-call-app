import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserDetailPage } from '../../pages/user-detail/user-detail';

import { ServiceProvider } from '../../providers/http-service/http-service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	userData: any;
	userName: Array<string>;

	filtered: boolean = false;

	groupedContacts: any[] = [];
	//nameArray: string[] = [];

	searchArr: any[] = [];
	items;
	searchVal: string;


	sorted: any[] = [];

	constructor(
		public navCtrl: NavController,
		private serviceProvider: ServiceProvider
	) {
		this.initializeItems();

		this.serviceProvider.userCast.subscribe(data2 => {
			if(data2) {
				console.log('chechpoint userData :',data2);
				this.userData = data2;
				this.groupContacts(this.userData);
			}
		});
	}


	// groupContacts(contacts) {
	groupContacts(contacts) {

		if (!contacts) return;
		
		this.sorted = [];
		contacts.forEach((c, ci, ca) => {
			if (this.sorted.length === 0) {
				this.sorted.push({
					letter: c.name.charAt(0),
					contacts: [c]
				});
			} else {
				let firstLetter = c.name.charAt(0);
				let found = false;
				this.sorted.forEach((v, i, a) => {
					if (v.letter === firstLetter) {
						found = true;

						a[i].contacts.push(c);

					}
				});

				if (!found) {
					this.sorted.push({
						letter: c.name.charAt(0),
						contacts: [c]
					});
				}
			}
		})



		this.groupedContacts = this.sorted;
		this.searchArr = this.groupedContacts;

	}
	userDetail(user: object) {
		this.navCtrl.push(UserDetailPage, { user: user });
	}
	userCreate() {
		this.serviceProvider.userCreate(this.userData);
	}
	initializeItems() {
		this.searchVal = '';
		this.groupedContacts = this.searchArr;
	}
	getItems(ev) {
		// Reset items back to all of the items
		this.initializeItems();
		// set val to the value of the ev target
		var val = ev.target.value;
		this.searchVal = val;
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.groupedContacts = this.groupedContacts.filter((item) => {
				//return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
				for (let i = 0; i < item.contacts.length; i++) {
					console.log(item.contacts[i].name);
					return (item.contacts[i].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
				}
			})
			//console.log("Filter results:",newArr);
		}//end if
		console.log(this.groupedContacts);
	}

}


