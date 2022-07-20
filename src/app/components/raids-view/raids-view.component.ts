import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-raids-view',
  templateUrl: './raids-view.component.html',
  styleUrls: ['./raids-view.component.scss']
})

export class RaidsViewComponent implements OnInit {
  usersActivity!: any[];
  weeklyActivity!: any[];
  
  constructor(private formService: FormService) {
  
  }

  ngOnInit(): void {
    this.usersActivity = this.formService.getUsersActivity();
    this.weeklyActivity = this.formService.weeklyActivity;
  }

}
