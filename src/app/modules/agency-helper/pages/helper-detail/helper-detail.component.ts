import { Component, OnInit } from '@angular/core';
import { AgencyHelperService } from '@core/services/agency-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AgencyHelper, Jobs } from '@core/models/agency-helper.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-helper-detail',
  templateUrl: './helper-detail.component.html',
  styleUrls: ['./helper-detail.component.sass']
})
export class HelperDetailComponent implements OnInit {

  helperDetail: Observable<AgencyHelper>;
  recommendedList: Observable<AgencyHelper[]>;

  constructor(
    private helperService: AgencyHelperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.fetch(id);
  }

  fetch(id: string) {
    this.helperDetail = this.helperService.fetchDetail(id);
    this.helperDetail.pipe(take(1)).subscribe(result => {
      this.recommendedList = this.helperService.fetchRecommended(result.tripid);
    });
  }

  getRecommended(tripid): Observable<AgencyHelper[]> {
    return this.helperService.fetchRecommended(tripid);
  }

  viewThisHelper(id: string) {
    this.router.navigate(['../' + id], { relativeTo: this.route });
    this.fetch(id);
  }

  formatJobs(jobs: Jobs) {
    let formatted = '';
    for (const key in jobs) {
      if (jobs[key]) {
        formatted += this.jobsToText(key);
        formatted += ' ';
      }
    }
    return formatted;
  }

  jobsToText(job: string) {
    switch (job) {
      case 'baby':
        return '照顧嬰兒';
        break;

      case 'children':
        return '幼兒護理(3歲或以上)';
        break;

      case 'elderly':
        return '老人護理';
        break;

      case 'pets':
        return '照顧竉物';
        break;

      case 'cooking':
        return '煮食';
        break;

      case 'cleaning':
        return '打掃衛生/清潔';
        break;
    }
  }

}
