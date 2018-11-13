import { Component } from '@angular/core';
import { NavController, ModalController, Item, ActionSheetController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ServiceProvider } from '../../providers/http-service/http-service';
@Component({
	selector: 'page-bookmarkAdd',
	templateUrl: 'bookmarkAdd.html'
})
export class BookmarkAddPage {

	userData: any;

	groupedContacts: any[] = [];
	searchArr: any[] = [];

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public actionsheetCtrl: ActionSheetController,
		private serviceProvider: ServiceProvider,
		public platform: Platform) {

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
	getItems(ev){
		this.groupedContacts=this.serviceProvider.getItems(ev,this.searchArr);
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
				this.userData[i].bookMarkCheck = true;
			}
		}
		this.serviceProvider.SetUserData(this.userData);
		this.navCtrl.pop();

	}

}


