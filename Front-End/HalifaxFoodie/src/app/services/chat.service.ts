import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map, switchMap } from 'rxjs/operators'
import { Observable, combineLatest, of } from 'rxjs'
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatId = "QVPa0JeYkcMDFgShsEXs"
  constructor(private dataservice: DataService, private afs: AngularFirestore, private router: Router) { }

  get(chatId) {
    return this.afs
      .collection<any>('chats')
      .doc(this.chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      )
  }

  async create() {
    const data = {
      createdAt: Date.now(),
      count: 0,
      messages: []
    }

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['/main/connect', docRef.id])
  }

  async sendMessage(receiverUID, receiverNm, content) {
    var receiverName, senderName, receiverUid, senderUid
    if(this.dataservice.userData.role == "A"){
      senderName = "Representative"
      receiverName = receiverNm
      senderUid = "REPO"
      receiverUid = receiverUID
    }
    else{
      senderName = this.dataservice.userData.lastName +", "+ this.dataservice.userData.firstName
      receiverName = "Representative"
      senderUid = this.dataservice.userData.userId
      receiverUid = "REPO"

    }

    const data = {
      receiverName, 
      senderName, 
      receiverUid, 
      senderUid,
      createdAt: Date.now(),
      content
    }

    if (senderUid || receiverUid) {
      const ref = this.afs.collection('chats').doc(this.chatId)

      return ref.update({
        messages: firebase.default.firestore.FieldValue.arrayUnion(data)
      })
    }
  }

  async deleteMessage(chat, msg) {
    const senderUid = this.dataservice.userData.userId;

    const ref = this.afs.collection('chats').doc(chat.id);
    //if (chat.senderUid === uid || msg.senderUid === uid) {
      // Allowed to delete
      delete msg.user;
      return ref.update({
        messages: firebase.default.firestore.FieldValue.arrayRemove(msg)
      });
    //}
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.senderUid)));

        // Firestore User Doc Reads
        // const userDocs = uids.map(u =>
        //   this.afs.doc(`users/${u}`).valueChanges()
        // );

        return uids.length ? combineLatest(uids) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).senderUid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.senderUid] };
        });

        return chat;
      })
    );
  }
}
