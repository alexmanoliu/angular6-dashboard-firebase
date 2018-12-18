import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/Service';

@Component({
  selector: 'app-serviciu',
  templateUrl: './serviciu.component.html',
  styleUrls: ['./serviciu.component.css'],
})
export class ServiciuComponent implements OnInit {
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
