import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { UserCreatePage } from '../../pages/user-create/user-create';
import { ServiceProvider } from '../../providers/http-service/http-service';
@IonicPage()
@Component({
	selector: 'page-user-detail',
	templateUrl: 'user-detail.html'
})
export class UserDetailPage {
	user: any;
	userData: any[] = [];

	call: any;

	showDelete: boolean = false;
	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public navParams: NavParams,
		public actionsheetCtrl: ActionSheetController,
		public platform: Platform,
		public alertCtrl: AlertController,
		private serviceProvider: ServiceProvider
	) {
		this.serviceProvider.userCast.subscribe(data => {
			if (data) {
				this.userData = data;
				let userId = this.navParams.get('user');
				for (let i = 0; i < this.userData.length; i++) {
					if (userId === this.userData[i].id) {
						this.user = this.userData[i];
					}
				}
			}
		});
	}
	ngOnInit() {
		this.call = this.navParams.get('call');
		console.log('check : ', this.call);
		if (!this.call) { //최신 통화 목록이 아닌 경우
			this.call = {
				id: '',
				date: '',
				time: '',
				currencyTime: ''
			}
		}

		if (!this.user) { //전화부에 저장되지 않은 경우
			this.user = {
				id: '',
				name: this.call.phone,
				email: '',
				address: {
					street: '',
					suite: '',
					city: '',
					zipcode: ''
				},
				phone: '',
				website: '',
				company: {
					name: ''
				}
			};
		}
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
						this.addBookMark();
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

	presentAlert() {
		let alert = this.alertCtrl.create({
			title: '등록 실패',
			subTitle: '이미 즐겨찾기에 등록되어 있습니다.',
			buttons: ['확인']
		});
		alert.present();
	}


	addBookMark() {
		for (let i = 0; i < this.userData.length; i++) {
			if (this.user.id === this.userData[i].id) {
				if (this.userData[i].bookMarkCheck === true) {
					this.presentAlert();
					return;
				}

				this.userData[i].bookMarkCheck = true;
			}
		}
		this.serviceProvider.SetUserData(this.userData);
	}

	userCreate() {
		let addModal = this.modalCtrl.create(UserCreatePage, { phone: this.call.phone });
		addModal.onDidDismiss(item => {
			if (item) {
				let data = this.serviceProvider.makeData(item, this.user.id);

				this.userData.push(data);

				this.serviceProvider.sort(this.userData);
				this.serviceProvider.SetUserData(this.userData);
				this.user = data;
			}
		})
		addModal.present();
	}

	editDetail() {
		this.showDelete = true;
	}
	doneEdit() {
		this.userUpdate();
	}

	userUpdate() {
		let addModal = this.modalCtrl.create(UserCreatePage, { user: this.user, showDel: true });
		addModal.onDidDismiss(item => {
			if (item && item === 'userdeleted') {
				this.navCtrl.pop();
				this.delUser();
			} else if (item) {
				let updateData = this.serviceProvider.makeData(item, this.user.id);

				for (let i = 0; i < this.userData.length; i++) {
					if (this.user.id === this.userData[i].id) {
						this.userData[i] = updateData;
					}
				}

				this.serviceProvider.sort(this.userData);
				this.serviceProvider.SetUserData(this.userData);
				this.user = updateData;
			}
		})
		addModal.present();
	}

	delUser() {
		for (let i = 0; i < this.userData.length; i++) {
			if (this.user.id === this.userData[i].id) {
				this.userData.forEach((v, i, a) => {
					if (v.id === this.user.id) {
						a.splice(i, 1);
					}
				})
			}
		}
		this.serviceProvider.SetUserData(this.userData);
	}


	updateJSON(src, newRecord) {
		return src.map(function (item) {
			return (item.year === newRecord.year && item.month === newRecord.month) ? newRecord : item;
		});
	}
}
