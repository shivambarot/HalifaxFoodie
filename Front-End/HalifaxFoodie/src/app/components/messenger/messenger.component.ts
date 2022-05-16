import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;
  chatId: any
  user:any
  recieverUid: string = "REPO"
recvUidList: any[] = []
recvNameList: any[] = []
  curUid:string 
  messages:any[] = []
  allMeassages :any[] =[]
  selectedRecvName:string = ""
  selectedRecvUid:string = "REPO"
  constructor(private cs: ChatService, private route: ActivatedRoute, private dataservice: DataService) { }

  ngOnInit(): void {
    console.log(this.dataservice.userData)
    this.user = this.dataservice.userData
    this.curUid = this.dataservice.userData.role == "A"? "REPO":this.dataservice.userData.userId
    this.chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(this.chatId);
    this.chat$ = this.cs.joinUsers(source); 
    this.chat$.subscribe((data)=>{
      this.recvNameList = []
      this.recvUidList = []
      this.messages = []
      this.allMeassages = []
      data.messages.forEach(o => {
        this.allMeassages.push(o)
        if(o.senderUid != "REPO" && this.recvUidList.length == 0){
        this.recvNameList.push(o.senderName)
        this.recvUidList.push(o.senderUid)
        }
        else if(o.senderUid != "REPO" && this.recvUidList.findIndex(e=>{return e ==  o.senderUid}) == -1){
          this.recvNameList.push(o.senderName)
          this.recvUidList.push(o.senderUid)
          }
  
        if(this.dataservice.userData.role == "A" && ((o.senderUid == this.selectedRecvUid && o.receiverUid== "REPO") ||(o.senderUid == "REPO" && o.receiverUid== this.selectedRecvUid))){
          this.messages.push(o)
        }
        else if(this.dataservice.userData.role != "A"){
          if(o.senderUid == this.curUid || o.receiverUid== this.curUid){
          this.messages.push(o)
          }
        }
      });

      // console.log(this.selectedRecvName)
      // console.log(this.allMeassages)
      // console.log(this.messages)

    },(error)=>{
      console.log(error)
    })
  
    // // this.scrollBottom();
  }
  recvChange(){
    var index = this.recvNameList.findIndex(e=>{return e ==  this.selectedRecvName})
    if (index>-1){
      this.selectedRecvUid = this.recvUidList[index]
    }
    else{
      this.selectedRecvUid = ""
    }
    this.messages = []
    this.allMeassages.forEach(o => {
      if(this.dataservice.userData.role == "A" && ((o.senderUid == this.selectedRecvUid && o.receiverUid== "REPO") ||(o.senderUid == "REPO" && o.receiverUid== this.selectedRecvUid))){
        this.messages.push(o)
      }
      else if(this.dataservice.userData.role != "A"){
        if(o.senderUid == this.curUid || o.receiverUid== this.curUid){
        this.messages.push(o)
        }
      }
  });

  }
  submit(chatId) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }

    this.cs.sendMessage(this.selectedRecvUid,this.selectedRecvName, this.newMsg);
    this.newMsg = '';
    //this.scrollBottom();
  }


  trackByCreated(i, msg) {
    return msg.createdAt;
  }

}
