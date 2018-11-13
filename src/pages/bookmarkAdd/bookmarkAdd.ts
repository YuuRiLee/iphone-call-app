import { Component } from '@angular/core';
import { NavController, ModalController, Item, ActionSheetController, Platform, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-bookmarkAdd',
	templateUrl: 'bookmarkAdd.html'
})
export class BookmarkAddPage {

	userData: any;
	userName: Array<string>;

	filtered: boolean = false;

	groupedContacts: any[] = [];
	//nameArray: string[] = [];

	searchArr: any[] = [];
	items;
	searchVal: string;


	sorted: any[] = [];

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public actionsheetCtrl: ActionSheetController, public platform: Platform, private events: Events) {

		this.initializeItems();
	}

	// groupContacts(contacts) {
	groupContacts(contacts) {

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
		console.log('sorted contacts: ', this.sorted);
		console.log('sorted contacts: ', this.groupedContacts);
		this.searchArr = this.groupedContacts;

	}


	ngOnInit() {
		this.searchVal = '';
		this.userData = JSON.parse(localStorage.getItem('content'));

		this.userData.sort(function (a, b) {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		})


		console.log(this.userData);

		// for (let i = 0; i < this.userData.length; i++) {
		// 	this.nameArray.push(this.userData[i].name);
		// }
		// this.groupContacts(this.nameArray); //divder 만들기
		this.groupContacts(this.userData); //divder 만들기
	}

	userDetail(user: object) {
		// this.navCtrl.push(UserDetailPage, { user: user });
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


	openMenu(contact: any) {
		let actionSheet = this.actionsheetCtrl.create({
			title: '',
			cssClass: 'action-sheets-basic-page',
			buttons: [
				{
					text: '즐겨찾기  등록',
					icon: !this.platform.is('ios') ? 'share' : null,
					handler: () => {
						console.log('Share clicked');
						this.addBookMark(contact);
					}
				},
				{
					text: '취소',
					role: 'cancel', // will always sort to be on the bottom
					icon: !this.platform.is('ios') ? 'close' : null,
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}

	addBookMark(contact) {
		for (let i = 0; i < this.userData.length; i++) {
			if (contact.id === this.userData[i].id) {
				console.log('same');
				this.userData[i].bookMarkCheck = true;
			}
		}
		console.log(this.userData);
		localStorage.setItem('content', JSON.stringify(this.userData));
		//   location.reload();

		this.events.publish('bookmark:add');
		this.navCtrl.pop();

	}

}


