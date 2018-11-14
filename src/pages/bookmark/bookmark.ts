import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserDetailPage } from '../../pages/user-detail/user-detail';
import { BookmarkAddPage } from '../bookmarkAdd/bookmarkAdd';
import { ServiceProvider } from '../../providers/http-service/http-service';
@Component({
	selector: 'page-bookmark',
	templateUrl: 'bookmark.html'
})
export class BookmarkPage {
	user: any;
	userData: any[] = [];
	bookmarkUserData: any[] = [];
	showDelete: boolean = false;
	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private serviceProvider: ServiceProvider) {

		this.serviceProvider.userCast.subscribe(data => {
			if(data) {
				this.userData = data;
				this.getBookmarkUserData();
			}
		});

	}

	getBookmarkUserData() {
		this.user = this.navParams.get('user');
		this.bookmarkUserData = [];

		for (let i = 0; i < this.userData.length; i++) {
			if (this.userData[i].bookMarkCheck === true) {
				this.bookmarkUserData.push(this.userData[i]);
			}
		}
	}

	userDetail(userId) {
		this.navCtrl.push(UserDetailPage, { user: userId });
	}

	editBookmark() {
		this.showDelete = true;

	}
	doneEdit() {
		this.showDelete = false;
	}
	bookmarkDel(data: any) {
		for (let i = 0; i < this.userData.length; i++) {
			if (data.id === this.userData[i].id) {
				this.userData[i].bookMarkCheck = false;
				this.bookmarkUserData.forEach((v, i, a) => {
					if (v.id === data.id) {
						a.splice(i, 1);
					}
				})
			}
		}
		this.serviceProvider.SetUserData(this.userData);
	}

	addBookmark(){
		this.navCtrl.push(BookmarkAddPage, { user: this.user });
	}
}
