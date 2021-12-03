import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPlayerComponent } from '../../dialogs/add-player/add-player.component';

@Component({
  selector: 'app-menu-widget',
  templateUrl: './menu-widget.component.html',
  styleUrls: ['./menu-widget.component.scss']
})
export class MenuWidgetComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddPlayer(): void {
    this.dialog.open(AddPlayerComponent, {
      width: '325px'
    });
  }

}
