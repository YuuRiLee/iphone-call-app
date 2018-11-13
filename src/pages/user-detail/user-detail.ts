import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ActionSheetController, Platform, AlertController, Events } from 'ionic-angular';
import { UserCreatePage } from '../../pages/user-create/user-create';

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
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController, private events: Events) {
		// this.user = navParams.get('user');
	}
	ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem('content'));


		this.call = this.navParams.get('call');
		if (!this.call) { //최신 통화 목록이 아닌 경우
			this.call = {
				id: '',
				date: '',
				time: '',
				currencyTime: ''
			}
		}

		this.user = this.navParams.get('user');
		if (!this.user) { //전화부에 저장되지 않은 경우
			console.log('nono');
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
		console.log(this.user.id);
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
				console.log('same');
				if (this.userData[i].bookMarkCheck === true) {
					console.log('이미 즐겨찾기에 추가됨');
					this.presentAlert();
					return;
				}

				this.userData[i].bookMarkCheck = true;
			}
		}
		console.log(this.userData);
		localStorage.setItem('content', JSON.stringify(this.userData));
		this.events.publish('bookmark:add');
		// location.reload();

	}


	userCreate() {
		let addModal = this.modalCtrl.create(UserCreatePage, { phone: this.call.phone });
		addModal.onDidDismiss(item => {
			if (item) {
				if (item.name == '' && item.familyname == '') {
					item.name = '이름 없음';
				}

				const userData = {
					id: Date.now() + Math.random(),
					name: item.familyname + item.name,
					email: item.email,
					address: {
						street: item.street,
						suite: item.suite,
						city: item.city,
						zipcode: item.zipcode
					},
					phone: item.phone,
					website: item.website,
					company: {
						name: item.company
					}

				};


				this.userData.push(userData);

				//storage update
				localStorage.setItem('content', JSON.stringify(this.userData));
				this.user = userData;
				this.events.publish('userupdate:userdetail');
			}
		})
		addModal.present();
	}

	editDetail() {
		this.showDelete = true;


	}
	doneEdit() {
		//location.reload();
		this.userUpdate();
	}

	userUpdate() {
		let addModal = this.modalCtrl.create(UserCreatePage, { user: this.user, showDel: true });
		addModal.onDidDismiss(item => {

			console.log(item);

			if (item && item === 'userdeleted') {
				console.log('---checkpoint0-----');
				this.events.publish('userupdate:userdetail');
				this.navCtrl.pop();
			} else if (item) {
				if (item.name == '' && item.familyname == '') {
					item.name = '이름 없음';
				}
				let updateData =
				{
					id: this.user.id,
					name: item.familyname + item.name,
					email: item.email,
					address: {
						street: item.street,
						suite: item.suite,
						city: item.city,
						zipcode: item.zipcode
					},
					phone: item.phone,
					website: item.website,
					company: {
						name: item.company
					}

				};

				for (let i = 0; i < this.userData.length; i++) {
					if (this.user.id === this.userData[i].id) {
						this.userData[i] = updateData;
					}
				}
				//storage update
				localStorage.setItem('content', JSON.stringify(this.userData));
				// location.reload();
				this.user = updateData;
				this.events.publish('userupdate:userdetail');
			}
		})
		addModal.present();
	}

	updateJSON(src, newRecord) {
		return src.map(function (item) {
			return (item.year === newRecord.year && item.month === newRecord.month) ? newRecord : item;
		});
	}
}
