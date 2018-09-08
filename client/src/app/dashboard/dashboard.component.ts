import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { auth } from 'firebase';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Note {
  note: string;
  date: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() competition: any;
  @Input() matches: any;
  @Output() matchSelected = new EventEmitter<any>();

  constructor(
    public afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  logout() {
    this.afAuth.auth.signOut();
  }

  selectMatch(match){
    this.matchSelected.emit(match);
  }

  addNote(match){
    let dialog = this.dialog.open(AddNoteDialog, {
      width: '250px',
      data: match
    });
    dialog.afterClosed().subscribe(data => {
      console.log(data);
    });
  }

}

@Component({
  selector: 'app-add-match-note',
  templateUrl: 'match-note-template.html',
})
export class AddNoteDialog {
  note : string = '';
  constructor(
    public dialogRef: MatDialogRef<AddNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Note
  ) {}

  add(): void {
    this.dialogRef.close(this.note);
  }

  discard(): void {
    this.dialogRef.close();
  }
}
