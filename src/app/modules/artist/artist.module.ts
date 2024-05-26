import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistRoutingModule } from './artist-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';





@NgModule({
  declarations: [
ArtistHomeComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ]
})
export class ArtistModule { }
