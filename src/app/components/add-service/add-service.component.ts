import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/Service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent implements OnInit {
  service: Service = {
    id: '',
    DenumireServiciu: '',
    SubCategorie: '',
    TipServiciu: '',
    UnitateMasura: '',
    CodServiciu: '',
    Pret: '',
    Valabilitate: '',
    balance: 0,
  };

  disableBalanceOnAdd: Boolean;
  @ViewChild('serviceForm') from: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private serviceService: ServiceService,
    private router: Router,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Service; valid: boolean }) {
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
      // Add new service
      this.serviceService.newService(value);
      // Show message
      this.flashMessage.show('New service added', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      // Redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
