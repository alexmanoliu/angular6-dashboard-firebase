import { Component, OnInit } from '@angular/core';
import { MesterService } from '../../services/mester.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Mester } from '../../models/Mester';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-mester',
  templateUrl: './edit-mester.component.html',
  styleUrls: ['./edit-mester.component.css'],
})
export class EditMesterComponent implements OnInit {
  id: string;
  mester: Mester = {
    Prenume: '',
    Nume: '',
    Aptitudini: '',
    OfertaMester: '',
    email: '',
    telefon: '',
    Adresa: '',
    Firma: '',
    Contract: '',
    balance: 0,
  };
  disableBalanceOnEdit: Boolean;

  constructor(
    private mesterService: MesterService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.mesterService
      .getMester(this.id)
      .subscribe(mester => (this.mester = mester));
  }

  onSubmit({ value, valid }: { value: Mester; valid: Boolean }) {
    if (!valid) {
      this.flashMessage.show('Te rog completeaza spatiile ramase', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // Add id to client
      value.id = this.id;
      // update client
      this.mesterService.updateMester(value);
      this.flashMessage.show('Informatiile au fost updatate', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/mester/' + this.id]);
    }
  }
}
