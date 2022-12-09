import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SearchResults} from '../types';
import { BackendServiceService } from '../backend-service.service';


@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  @Input() resultsToShow?: SearchResults;

  @Output() showDetailEvent = new EventEmitter<string>();


  constructor(private backendServiceService: BackendServiceService) { }

  ngOnInit(): void {
  }


  tranform(distanceInMeter:number){
    return Math.round(distanceInMeter/1609);
  }

  showDetail(id: string){
    this.showDetailEvent.emit(id);
  }

}
