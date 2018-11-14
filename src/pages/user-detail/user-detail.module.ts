import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { UserDetailPage } from './user-detail';

import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    UserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailPage),
	TranslateModule.forChild(),
	ComponentsModule
  ],
  exports: [
    UserDetailPage
  ],
})
export class UserDetailPageModule { }
