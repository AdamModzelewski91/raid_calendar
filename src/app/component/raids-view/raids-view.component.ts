import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raids-view',
  templateUrl: './raids-view.component.html',
  styleUrls: ['./raids-view.component.scss']
})

export class RaidsViewComponent implements OnInit {
  usersActivity: any[];
  constructor() {
    this.usersActivity = JSON.parse(localStorage.getItem('calendar') || '{}')
  }

  ngOnInit(): void {
  }

}
