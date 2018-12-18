import { Component, OnInit } from '@angular/core';
import { MesterService } from '../../services/mester.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Mester } from '../../models/Mester';

@Component({
  selector: 'app-mester-details',
  templateUrl: './mester-details.component.html',
  styleUrls: ['./mester-details.component.css'],
})
export class MesterDetailsComponent implements OnInit {
  id: string;
  mester: Mester;
  hasBalance: Boolean = false;
  showBalanceUpdateInput: Boolean = false;

  constructor(
    private mesterService: MesterService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit() {
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.mesterService.getMester(this.id).subscribe(mester => {
      if (mester != null) {
        if (mester.balance > 0) {
          this.hasBalance = true;
        }
      }

      this.mester = mester;
      console.log(this.mester);
    });
  }

  updateBalance() {
    this.mesterService.updateMester(this.mester);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }

  onDeleteClick() {
    if (confirm('Esti sigura ca vrei sa stergi?')) {
      this.mesterService.deleteMester(this.mester);
      this.flashMessage.show('Profilul a fost sters', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }
}
