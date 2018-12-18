import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MesterService } from '../../services/mester.service';
import { Mester } from '../../models/Mester';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-mester',
  templateUrl: './add-mester.component.html',
  styleUrls: ['./add-mester.component.css'],
})
export class AddMesterComponent implements OnInit {
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

  disableBalanceOnAdd: Boolean;
  @ViewChild('mesterForm') from: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private mesterService: MesterService,
    private router: Router,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Mester; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      // show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // Add new client
      this.mesterService.newMester(value);
      // Show message
      this.flashMessage.show('New mester added', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      // Redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
