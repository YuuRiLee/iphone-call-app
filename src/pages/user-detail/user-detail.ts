import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,Platform,AlertController  } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-user-detail',
	templateUrl: 'user-detail.html'
})
export class UserDetailPage {
	user: any;
	userData: any[] = [];
	constructor(public navCtrl: NavController, public navParams: NavParams,public actionsheetCtrl: ActionSheetController,public platform: Platform,public alertCtrl: AlertController) {
		// this.user = navParams.get('user');
	}
	ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem('content'));
		this.user = this.navParams.get('user');
	}

	openMenu(contact:any) {
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
				if(this.userData[i].bookMarkCheck ===true){
					console.log('이미 즐겨찾기에 추가됨');
					this.presentAlert();
					return;
				}

				this.userData[i].bookMarkCheck = true;
			}
		}
		console.log(this.userData);
		localStorage.setItem('content', JSON.stringify(this.userData));
		location.reload();

	}
}
