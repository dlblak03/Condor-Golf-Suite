import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPlayerComponent } from '../../dialogs/add-player/add-player.component';
import { AddEventComponent } from '../../dialogs/add-event/add-event.component';

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

  openAddEvent(): void {
    this.dialog.open(AddEventComponent, {
      width: '325px'
    });
  }

}
