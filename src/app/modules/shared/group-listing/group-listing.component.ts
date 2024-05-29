import { Component, OnInit, inject } from '@angular/core';
import { urlParser } from '../../utility/helperFunctions/urlparser';
import { ArtistAuthService } from 'src/app/service/artist-auth.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Group } from '../../model/groupModel';
import { AuthResponse } from '../../model/authResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-listing',
  templateUrl: './group-listing.component.html',
  styleUrls: ['./group-listing.component.css']
})
export class GroupListingComponent implements OnInit{
  router:Router=inject(Router)
  userServce:UserService=inject(UserService)
  authService:AuthService=inject(AuthService)
  artistAuthService:ArtistAuthService=inject(ArtistAuthService)
  
  currentUserId!:string
  currentUserName!:string

  isArtist:boolean=false
  isModalVisible: boolean = false;
  groupName: string = '';
  selectedUserIds: string[] = [];
  users!:AuthResponse[]
  groups!:Group[]
  groupChatSection:boolean=true
 


  ngOnInit(): void {
  //identifying the role of the user.
  const currentUrl = window.location.href;
  this.isArtist=urlParser(currentUrl)

  if(this.isArtist){
    this.artistAuthService.artist.subscribe((artist)=>{
      this.currentUserId=artist?.id as string
      this.currentUserName=artist?.firstName as string
      this.isArtist=artist?.isArtist as boolean
        })
  }else{
    this.authService.user.subscribe((user)=>{
      this.currentUserName=user?.firstName as string
      this.currentUserId=user?.id as string
      this.isArtist=user?.isArtist as boolean
        })
  }

  this.userServce.listAllUser().subscribe({
    next: (respons) => {
      if (Array.isArray(respons)) {
        this.users = respons.filter((user: AuthResponse) => user._id !== this.currentUserId);
        console.log(this.users, "userrr");
      } 
    },
    error: (error) => {
      console.log(error);
    }
  });
  this.userServce.fetchAllGroups().subscribe({
    next:(res)=>{
      this.groups=res
      console.log(this.groups, "groupss");
    }
  })


  }


  showModal() {
    this.isModalVisible = true;
  }
  
  hideModal() {
    this.isModalVisible = false;
    this.selectedUserIds=[]
  }

  toggleUserSelection(userId: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedUserIds.push(userId);
    } else {
      const index = this.selectedUserIds.indexOf(userId);
      if (index > -1) {
        this.selectedUserIds.splice(index, 1);
      }
    }
  }



  isUserSelected() {
    return this.selectedUserIds.length > 0;
  }
  

createGroup(form: NgForm) {
  if (form.valid && this.isUserSelected()) {
    console.log('Group Name:', this.groupName);
    console.log('Selected Users:', this.selectedUserIds);

const group:Group={
  groupName:this.groupName,
  members:this.selectedUserIds
}

this.userServce.createGroup(group).subscribe({next:(res)=>{
  console.log(res,"groupppp");
  this.ngOnInit()
  
},
error:(error)=>{
  console.log(error);
  
} 
})

    this.hideModal();
  } else {
    form.control.markAllAsTouched(); // Show validation errors
  }
}




navigateToUserChatListing(){
  this.groupChatSection=false
  if( this.isArtist){
    this.router.navigate(['/artist/artist-home'])
  }else{
    this.router.navigate(['user-home'])
  }

}
navigateToChatView(groupid:any,groupName:string){
  console.log(groupid,groupName,this.currentUserId,"clickeeedd");
  

 this.router.navigate(['/groupChatviewUser',this.currentUserId,groupid,groupName,this.currentUserName])

}


}
