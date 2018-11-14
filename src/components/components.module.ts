import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { userNameComponent} from './user-detail/user-name';
import { userControllerComponent} from './user-controller/user-controller';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';

@NgModule({
	declarations: [
		userNameComponent,
		userControllerComponent
	],
	imports: [
		TranslateModule.forChild(),
		IonicModule.forRoot(MyApp)
	],
	exports: [
		userNameComponent,
		userControllerComponent
	]
})
export class ComponentsModule {}
