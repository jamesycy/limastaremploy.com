import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
// Interfaces
import { AgencyHelper, Nationality } from '../models/agency-helper.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyHelperService {

  _list = new BehaviorSubject<QueryDocumentSnapshot<{}>[]>([]);
  list = this._list.asObservable().pipe(map(snapshot => {
    return snapshot ? snapshot.map(document => this.formatDocuments(document)) : null;
  }));

  collectionName = 'agency_helper';
  jobsList = ['baby', 'children', 'elderly', 'pets', 'cooking', 'cleaning'];

  constructor(private afs: AngularFirestore) {}

  private formatDocuments(documentSnapshot: QueryDocumentSnapshot<{}>): object {
    const payload = documentSnapshot;
    return {
      ...payload.data() as AgencyHelper,
      id: payload.id,
      doc: payload
    };
  }

  resetList() {
    this._list.next(null);
  }

  fetchList({ limit, op, nationality, jobs, startAfter }) {
    this.afs.collection(this.collectionName, ref => {
      let query: Query | CollectionReference = ref;

      if (op) {
        query = query.where('op', '>=', op).where('op', '<', `${op}\uf8ff`);
      }

      if (nationality) {
        query = query.where('nationality', '==', nationality);
      }

      if (jobs) {
        for (let i = 0; i < jobs.length; i++) {
          if (this.jobsList.indexOf(jobs[i]) > -1) {
            query = query.where(`jobs.${jobs[i]}`, '==', true);
          }
        }
      }

      if (startAfter) {
        query = query.startAfter(startAfter);
      }

      return query.limit(limit).where('private', '==', false);
    }).get().pipe(map(snapshot => snapshot.docs)).toPromise().then(result => {
      if (this._list.getValue()) {
        this._list.next([...this._list.getValue(), ...result]);
      } else {
        this._list.next(result);
      }
    });
  }

  fetchDetail(id): Observable<AgencyHelper> {
    return this.afs.collection(this.collectionName).doc(id).snapshotChanges().pipe(map(doc => ({
      ...doc.payload.data() as AgencyHelper,
      id: doc.payload.id
    })));
  }

  fetchRecommended(tripid): Observable<AgencyHelper[]> {
    return this.afs.collection(this.collectionName, ref => {
      let query: Query | CollectionReference = ref;
      query = query.where('private', '==', false);
      query = query.where('tripid', '==', tripid);
      query = query.limit(20);
      return query;
    }).get().pipe(map(snapshot => {
      return snapshot.docs.map(doc => {
        return {
          ...doc.data() as AgencyHelper,
          id: doc.id
        };
      });
    }));
  }

}
