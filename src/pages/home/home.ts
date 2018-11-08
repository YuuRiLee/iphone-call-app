import { Component } from '@angular/core';
import { NavController, ModalController, Item } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserDetailPage } from '../../pages/user-detail/user-detail';
import { UserCreatePage } from '../../pages/user-create/user-create';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	userData: any;
	userName: Array<string>;

	filtered: boolean = false;

	groupedContacts: any[] = [];
	nameArray: string[] = [''];

	items;
	searchVal :string;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

		this.initializeItems();
	}

	groupContacts(contacts) {



		let sortedContacts = contacts;
		let currentLetter = false;
		let currentContacts = [];

		sortedContacts.forEach((value, index) => {

			if (value.charAt(0) != currentLetter) {

				currentLetter = value.charAt(0);

				let newGroup = {
					letter: currentLetter,
					contacts: []
				};

				currentContacts = newGroup.contacts;
				this.groupedContacts.push(newGroup);

			}

			currentContacts.push(value);

		});

	}


	ngOnInit() {
		this.searchVal = '';
		this.userData = JSON.parse(localStorage.getItem('content'));

		this.userData.sort(function (a, b) {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		})

		for (let i = 0; i < this.userData.length; i++) {
			this.nameArray.push(this.userData[i].name);
		}
		this.groupContacts(this.nameArray); //divder 만들기
	}

	userDetail(user: object) {
		this.navCtrl.push(UserDetailPage, { user: user });
	}
	public userCreate() {
		let addModal = this.modalCtrl.create(UserCreatePage);
		addModal.onDidDismiss(item => {
			if (item) {
				console.log("date 000111" + item.name);
				if (item.name == '' && item.familyname == '') {
					item.name = '이름 없음';
				}
				this.userData.push(
					{
						id: this.userData.length + 1,
						name: item.familyname + item.name,
						email: item.email,
						address: {
							stree: item.street,
							suite: item.suite,
							city: item.city,
							zipcode: item.zipcode
						},
						phone: item.phone,
						website: item.website,
						company: {
							company: item.company
						}

					}
				);
				//storage update
				localStorage.setItem('content', JSON.stringify(this.userData));

				location.reload();
			}
		})
		addModal.present();
	}


	initializeItems() {
		this.items = this.nameArray;
		this.searchVal='';
	}
	getItems(ev) {
		// Reset items back to all of the items
		this.initializeItems();

		// set val to the value of the ev target
		var val = ev.target.value;
		this.searchVal=val;
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.items = this.items.filter((item) => {
				return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

}


