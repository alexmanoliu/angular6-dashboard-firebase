import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../models/Service';

@Injectable()
export class ServiceService {
  serviciuCollection: AngularFirestoreCollection<Service>;
  serviceDoc: AngularFirestoreDocument<Service>;
  serviciu: Observable<Service[]>;
  service: Observable<Service>;

  constructor(private afs: AngularFirestore) {
    this.serviciuCollection = this.afs.collection('serviciu', ref =>
      ref.orderBy('DenumireServiciu', 'asc'),
    );
  }

  getServiciu(): Observable<Service[]> {
    // Get clients with id
    this.serviciu = this.serviciuCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Service;
          data.id = action.payload.doc.id;
          return data;
        });
      }),
    );
    return this.serviciu;
  }

  newService(service: Service) {
    this.serviciuCollection.add(service);
  }

  getService(id: string): Observable<Service> {
    this.serviceDoc = this.afs.doc<Service>(`serviciu/${id}`);
    this.service = this.serviceDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Service;
          data.id = action.payload.id;
          return data;
        }
      }),
    );
    return this.service;
  }

  updateService(service: Service) {
    this.serviceDoc = this.afs.doc(`serviciu/${service.id}`);
    this.serviceDoc.update(service);
  }

  deleteService(service: Service) {
    this.serviceDoc = this.afs.doc(`serviciu/${service.id}`);
    this.serviceDoc.delete();
  }
}
