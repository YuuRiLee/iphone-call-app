import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-user-detail',
	templateUrl: 'user-detail.html'
})
export class UserDetailPage {
	user: any;
	userData: any[] = [];
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		// this.user = navParams.get('user');
	}
	ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem('content'));
		this.user = this.navParams.get('user');
	}

	addBookMark() {
		for (let i = 0; i < this.userData.length; i++) {
			if (this.user.id === this.userData[i].id) {
				console.log('same');
				this.userData[i].bookMarkCheck = true;
			}
		}
		console.log(this.userData);
		localStorage.setItem('content', JSON.stringify(this.userData));
		location.reload();

	}
}
