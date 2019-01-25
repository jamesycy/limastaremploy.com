import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.sass']
})
export class CloseButtonComponent implements OnInit {

  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}
