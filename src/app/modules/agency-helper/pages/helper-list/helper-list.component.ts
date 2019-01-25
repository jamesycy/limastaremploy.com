import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AgencyHelperService } from '@core/services/agency-helper.service';
import { Nationality } from '@core/models/agency-helper.model';

@Component({
  selector: 'app-helper-list',
  templateUrl: './helper-list.component.html',
  styleUrls: ['./helper-list.component.sass']
})
export class HelperListComponent implements OnInit {

  query: object;
  filter = {
    op: null,
    nationality: null,
    jobs: []
  };
  limit = 10;
  n = Nationality;

  imageModalFile: string;


  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helperService: AgencyHelperService
  ) {}

  ngOnInit() {
    this.query = this.formatQuery(this.route.snapshot.queryParams);

    if (typeof(this.query['jobs']) === 'string') {
      const jobs = this.query['jobs'];
      this.query['jobs'] = [jobs];
    }

    this.helperService.resetList();
    this.helperService.fetchList({
      limit: this.limit,
      op: this.query['op'],
      nationality: this.query['nationality'],
      jobs: this.query['jobs'],
      startAfter: null
    });
  }

  formatQuery(query: Params) {
    let jobsQuery = [];
    if (typeof(query['jobs']) === 'string') {
      jobsQuery.push(query['jobs']);
    } else {
      jobsQuery = query['jobs'];
    }
    return {
      op: query['op'] || null,
      nationality: query['nationality'] || null,
      jobs: jobsQuery
    };
  }

  toggleJobs(jobName) {
    if (this.filter.jobs.indexOf(jobName) > -1) {
      this.filter.jobs.splice(this.filter.jobs.indexOf(jobName), 1);
    } else {
      this.filter.jobs.push(jobName);
    }
  }

  applyFilter(startAfter) {
    this.router.navigate([], { queryParams: this.filter, queryParamsHandling: 'merge' });

    this.helperService.resetList();
    this.helperService.fetchList({
      limit: this.limit,
      op: this.filter.op,
      nationality: this.filter.nationality,
      jobs: this.filter.jobs,
      startAfter: startAfter
    });
  }

  loadMore(lastElement) {
    this.applyFilter(lastElement);
  }

  setImageModal(url: string) {
    this.imageModalFile = url;
  }

}
