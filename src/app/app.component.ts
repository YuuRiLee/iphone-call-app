import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


import { ServiceProvider } from '../providers/http-service/http-service';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	rootPage: any = TabsPage;
	
	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public httpService: ServiceProvider
	) {

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();

			this.startApp();
		});
	}


	startApp() {
		// if (localStorage.getItem('content')) {
		// 	console.log('strage data ok');
		// }
		// else {
		// 	console.log('strage data null');
		// 	this.httpService.dataInit();
		// }

		// if (localStorage.getItem('callList')) {
		// 	console.log('strage data ok');
		// }
		// else {
		// 	console.log('strage data null');
		// 	this.httpService.getCallList();
		// }
		this.httpService.dataInit();
	}
}
