import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mester } from '../models/Mester';

@Injectable()
export class MesterService {
  mesterulCollection: AngularFirestoreCollection<Mester>;
  mesterDoc: AngularFirestoreDocument<Mester>;
  mesterul: Observable<Mester[]>;
  mester: Observable<Mester>;

  constructor(private afs: AngularFirestore) {
    this.mesterulCollection = this.afs.collection('mesterul', ref =>
      ref.orderBy('Nume', 'asc'),
    );
  }

  getMesterul(): Observable<Mester[]> {
    // Get clients with id
    this.mesterul = this.mesterulCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Mester;
          data.id = action.payload.doc.id;
          return data;
        });
      }),
    );
    return this.mesterul;
  }

  newMester(mester:  Mester) {
    this.mesterulCollection.add(mester);
  }

  getMester(id: string): Observable<Mester> {
    this.mesterDoc = this.afs.doc<Mester>(`mesterul/${id}`);
    this.mester = this.mesterDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Mester;
          data.id = action.payload.id;
          return data;
        }
      }),
    );
    return this.mester;
  }

  updateMester(mester: Mester) {
    this.mesterDoc = this.afs.doc(`mesterul/${mester.id}`);
    this.mesterDoc.update(mester);
  }

  deleteMester(mester: Mester) {
    this.mesterDoc = this.afs.doc(`mesterul/${mester.id}`);
    this.mesterDoc.delete();
  }
}
