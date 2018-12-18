import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Service } from '../../models/Service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
})
export class EditServiceComponent implements OnInit {
  id: string;
  service: Service = {
    DenumireServiciu: '',
    SubCategorie: '',
    TipServiciu: '',
    UnitateMasura: '',
    CodServiciu: '',
    Pret: '',
    Valabilitate: '',
    balance: 0,
  };
  disableBalanceOnEdit: Boolean;

  constructor(
    private serviceService: ServiceService,
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
    this.serviceService
      .getService(this.id)
      .subscribe(service => (this.service = service));
  }

  onSubmit({ value, valid }: { value: Service; valid: Boolean }) {
    if (!valid) {
      this.flashMessage.show('Te rog completeaza spatiile ramase', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // Add id to client
      value.id = this.id;
      // update client
      this.serviceService.updateService(value);
      this.flashMessage.show('Informatiile au fost updatate', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/service/' + this.id]);
    }
  }
}
