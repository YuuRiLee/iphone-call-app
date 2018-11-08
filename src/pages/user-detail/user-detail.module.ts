import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { UserDetailPage } from './user-detail';

@NgModule({
  declarations: [
    UserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    UserDetailPage
  ]
})
export class UserDetailPageModule { }
