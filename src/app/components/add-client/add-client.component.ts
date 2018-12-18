import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    Prenume: '',
    Nume: '',
    ServiciuComandat: '',
    CodSursa: '',
    CodServiciu: '',
    StatusComanda: '',
    OfertaMester: '',
    Mester: '',
    ModalitatePlata: '',
    TotalPlata: '',
    email: '',
    telefon: '',
    balance: 0
  };

  disableBalanceOnAdd: Boolean;
  @ViewChild('clientForm') from: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
   this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if(this.disableBalanceOnAdd) {
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
      this.clientService.newClient(value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      // Redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
