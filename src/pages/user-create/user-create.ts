import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
@IonicPage()
@Component({
	selector: 'page-user-create',
	templateUrl: 'user-create.html'
})
export class UserCreatePage {
	@ViewChild('fileInput') fileInput;

	isReadyToSave: boolean;

	//item: any;

	form: FormGroup;
	name: string;
	job: string;
	phone: string;
	email: string;
	website: string;
	zipcode: string;
	street: string;
	suite: string;
	city: string;
	company: string;
	user: any;

	userData: any[] = [];

	constructor(
		public navCtrl: NavController,
		public platform: Platform,
		public actionsheetCtrl: ActionSheetController,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public camera: Camera,
		public navParams: NavParams
	) {
		this.form = formBuilder.group({
			profilePic: [''],
			familyname: [''],
			name: [''],
			job: [''],
			phone: [''],
			email: [''],
			website: [''],
			zipcode: [''],
			street: [''],
			suite: [''],
			city: [''],
			company: ['']
		});

		if (this.navParams.get('phone')) {
			this.phone = this.navParams.get('phone');
		}
		if (this.navParams.get('user')) {
			this.user = this.navParams.get('user');
			console.log('check : ', this.user);
			this.name = this.user.name;
			this.job = this.user.job;
			this.phone = this.user.phone;
			this.email = this.user.email;
			this.website = this.user.website;
			this.zipcode = this.user.address.zipcode;
			this.street = this.user.address.street;
			this.suite = this.user.address.suite;
			this.city = this.user.address.city;
			this.company = this.user.company.name;
		}
		if (this.navParams.get('showDel')) {

		}
		// Watch the form for changes, and
		this.form.valueChanges.subscribe((v) => {
			this.isReadyToSave = this.form.valid;
		});

	}

	getPicture() {
		if (Camera['installed']()) {
			this.camera.getPicture({
				destinationType: this.camera.DestinationType.DATA_URL,
				targetWidth: 96,
				targetHeight: 96
			}).then((data) => {
				this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
			}, (err) => {
				alert('Unable to take photo');
			})
		} else {
			this.fileInput.nativeElement.click();
		}
	}

	processWebImage(event) {
		let reader = new FileReader();
		reader.onload = (readerEvent) => {

			let imageData = (readerEvent.target as any).result;
			this.form.patchValue({ 'profilePic': imageData });
		};

		reader.readAsDataURL(event.target.files[0]);
	}

	getProfileImageStyle() {
		return 'url(' + this.form.controls['profilePic'].value + ')'
	}

	/**
	 * The user cancelled, so we dismiss without sending data back.
	 */
	cancel() {
		this.viewCtrl.dismiss();
	}

	/**
	 * The user is done and wants to create the item, so return it
	 * back to the presenter.
	 */
	done() {
		if (!this.form.valid) { return; }
		this.viewCtrl.dismiss(this.form.value);
	}

	openMenu() {
		let actionSheet = this.actionsheetCtrl.create({
			title: '',
			cssClass: 'action-sheets-basic-page',
			buttons: [
				{
					text: '연락처 삭제',
					role: 'destructive',
					icon: !this.platform.is('ios') ? 'heart-outline' : null,
					handler: () => {
						this.viewCtrl.dismiss('userdeleted');
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
