import { Component, OnInit } from '@angular/core';
import { MesterService } from '../../services/mester.service';
import { Mester } from '../../models/Mester';

@Component({
  selector: 'app-mesteri',
  templateUrl: './mesteri.component.html',
  styleUrls: ['./mesteri.component.css'],
})
export class MesteriComponent implements OnInit {
  mesterul: Mester[];
  totalOwed: number;

  constructor(private mesterService: MesterService) {}


  ngOnInit() {
    this.mesterService.getMesterul().subscribe(mesterul => {
      this.mesterul = mesterul;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.mesterul.reduce((total, mester) => {
      return total + parseFloat(mester.balance.toString());
    }, 0);
  }

}
