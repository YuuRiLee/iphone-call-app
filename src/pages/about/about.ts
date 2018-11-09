import { Component } from '@angular/core';
import { NavController, ModalController, Item,ActionSheetController,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserCreatePage } from '../../pages/user-create/user-create';
import { HomePage } from '../../pages/home/home';
import { first } from 'rxjs/operators';
@Component({
	selector: 'page-about',
	templateUrl: 'about.html',
})
export class AboutPage {
	phoneNumber: string;
	userData: any;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController,public actionsheetCtrl: ActionSheetController,public platform: Platform) {

	}

	ngOnInit() {
		this.phoneNumber = '';
		this.userData = JSON.parse(localStorage.getItem('content'));
	}

	userCreate() {
		let addModal = this.modalCtrl.create(UserCreatePage,{phone:this.phoneNumber});
		addModal.onDidDismiss(item => {
			  if (item) {
				  console.log("date 000111"+item.name);
				  if(item.name==''&&item.familyname==''){
					item.name='이름 없음';
				  }
				this.userData.push(
					{
						name:item.familyname+item.name,
						email:item.email,
						address:{
							stree:item.street,
							suite:item.suite,
							city:item.city,
							zipcode:item.zipcode
						},
						phone:item.phone,
						website:item.website,
						company:{
							company:item.company
						}

					}
					);
				//storage update
				localStorage.setItem('content',JSON.stringify(this.userData));
				location.reload();
			  }
		})
		addModal.present();
	}
	
	buttonClick(number: string) {
		if (this.phoneNumber.length == 3) {
			this.phoneNumber += '-';
		}
		else if (this.phoneNumber.length == 7) {
			this.phoneNumber += '-';
		}
		else if (this.phoneNumber.length == 12) {
			this.phoneNumber = this.replaceAt(7, '', this.phoneNumber);
		}
		else if (this.phoneNumber.length >= 13) {
			this.phoneNumber = this.replaceAll("-", "", this.phoneNumber);
		}
		this.phoneNumber += number;
	}

	deleteNumber() {

		console.log('삭제');
		this.phoneNumber = this.phoneNumber.slice(0, -1);
	}
	replaceAll(org, dest, str) {
		return str.split(org).join(dest);
	}
	replaceAt(index, char, str) {
		return str.substr(0, index) + char + str.substr(index + char.length);
	}

	openMenu() {
		let actionSheet = this.actionsheetCtrl.create({
		  title: '',
		  cssClass: 'action-sheets-basic-page',
		  buttons: [
			{
			  text: '새로운 연락처 등록',
			  icon: !this.platform.is('ios') ? 'share' : null,
			  handler: () => {
				console.log('Share clicked');
				this.userCreate();
			  }
			},
			{
			  text: '기존의 연락처에 추가',
			  icon: !this.platform.is('ios') ? 'heart-outline' : null,
			  handler: () => {
				console.log('Favorite clicked');
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

}
