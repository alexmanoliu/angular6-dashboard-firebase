import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/Service';

@Component({
  selector: 'app-servicii',
  templateUrl: './servicii.component.html',
  styleUrls: ['./servicii.component.css'],
})
export class ServiciiComponent implements OnInit {
  serviciu: Service[];
  totalOwed: number;

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.serviceService.getServiciu().subscribe(serviciu => {
      this.serviciu = serviciu;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.serviciu.reduce((total, service) => {
      return total + parseFloat(service.balance.toString());
    }, 0);
  }
}
