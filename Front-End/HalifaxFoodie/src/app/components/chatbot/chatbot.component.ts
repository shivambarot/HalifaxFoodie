import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  chatMessages: Array<any> = [{
    Owner: 'ChatBot',
    Message: 'Hello, I can help you order flowers'
  }];
  chatBotFormGroup: FormGroup
  lexUserId: any = 'userID' + Date.now();
  sessionAttributes = {};
  @ViewChild('dvMsg') dvMsg: ElementRef;
  
  constructor(private httpservice: HttpService, private _formBuilder: FormBuilder) { }

  naviagte(){
    alert("called")
  }
  ngOnInit(): void {
    this.chatBotFormGroup = this._formBuilder.group({
      message: [''],
    });
  }

  send() {
    if (!this.chatBotFormGroup.value.message) {
      return
    }

    console.log(this.dvMsg.nativeElement.scrollTop)
    console.log(this.dvMsg.nativeElement.scrollHeight)
    this.chatMessages.push({ Owner: 'You', Message: this.chatBotFormGroup.value.message });
    let req = {
      lexUserId: this.lexUserId,
      chatInput: this.chatBotFormGroup.value.message,
      sessionAttributes: this.sessionAttributes
    }
    this.chatBotFormGroup.setValue({ message: "" })
    this.httpservice.postServiceCall("/chat/send", req)
      .subscribe((result: any) => {
        console.log(result)
        if (result.success) {
          this.sessionAttributes = result.data.sessionAttributes
          result.data.chat.forEach(o => {
            this.chatMessages.push(o)
          });
        }
      }, (error) => {
        console.log(error)
      })
  }

  reset(){
    this.chatMessages = [{
      Owner: 'ChatBot',
      Message: 'Hello, I can help you order flowers'
    }];
    this.chatBotFormGroup.setValue({ message: "" })

  }
}
