import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Service } from '../../models/Service';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
})
export class ServiceDetailsComponent implements OnInit {
  id: string;
  service: Service;
  hasBalance: Boolean = false;
  showBalanceUpdateInput: Boolean = false;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit() {
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    // Get service
    this.serviceService.getService(this.id).subscribe(service => {
      if (service != null) {
        if (service.balance > 0) {
          this.hasBalance = true;
        }
      }

      this.service = service;
      console.log(this.service);
    });
  }

  updateBalance() {
    this.serviceService.updateService(this.service);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }

  onDeleteClick() {
    if (confirm('Esti sigura ca vrei sa stergi?')) {
      this.serviceService.deleteService(this.service);
      this.flashMessage.show('Profilul a fost sters', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }
}
