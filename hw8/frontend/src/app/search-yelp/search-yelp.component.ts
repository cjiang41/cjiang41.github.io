import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, filter} from 'rxjs/operators';
import { switchMap, debounceTime, tap, finalize, } from 'rxjs/operators';
import {SearchResults, BusinessDetail, BusinessReview} from '../types';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-search-yelp',
  templateUrl: './search-yelp.component.html',
  styleUrls: ['./search-yelp.component.css']
})
export class SearchYelpComponent implements OnInit {


  @ViewChild('detailArea', { static: true }) detailArea!: ElementRef;
  @ViewChild('tableArea', { static: true }) tableArea!: ElementRef;


  searchForm = this.fb.group({
    keyword: [''],
    distance: ['10'],
    categories: ['Default'],
    location: [''],
    autoDetect: [''],
  });

  categoryOptions = [
    {value: 'all',  category: 'Default'},
    {value: 'arts,All',  category: 'Arts & Entertainment'},
    {value: 'health,All',  category: 'Health & Medical'},
    {value: 'hotelstravel,All',  category: 'Hotels & Travel'},
    {value: 'food,All',  category: 'Food'},
    {value: 'professional,All',  category: 'Professional Services'}
  ]

  selectedCategory = "all";


  autoKeywords:String[] = [];
  showResultTable: boolean = false;
  showNoResult: boolean = false;
  showDetail:boolean = false;
  searchResults: SearchResults = {} as SearchResults;
  bisDetails: BusinessDetail = {} as BusinessDetail;
  bisReviews: BusinessReview = {} as BusinessReview;


  constructor(private backendServiceService: BackendServiceService, private fb: FormBuilder) { 
   
  }

  ngOnInit(): void {

  this.searchForm.get('categories')!.setValue("all", {onlySelf: true});
  // this.searchForm.get('categories');

  this.searchForm
    .get('keyword')!
    .valueChanges.pipe(
      debounceTime(300),
      filter((x): x is NonNullable<string> => !!x),
      switchMap((value) =>
        this.backendServiceService
          .autoKeyword(value))
    ).subscribe((keywords) => {this.autoKeywords = keywords["categories"].concat(keywords["terms"]);
      console.log(keywords);
    });
  }

  ngAfterViewInit() {

  }

  onSubmit():void{
    this.showResultTable = false;
    this.showNoResult = false;
    this.showDetail = false;
    this.searchResults = {} as SearchResults;
    this.backendServiceService.getResult(this.searchForm).subscribe(
      
      result => {this.searchResults = result;
      console.log(this.searchResults);
      if(!result.hasOwnProperty("businesses") || result["businesses"].length == 0){
        this.showNoResult = true;
        this.showResultTable = false;

      }else{
        this.showResultTable = true;
        // var top = this.formArea.nativeElement.offsetTop; //Getting Y of target element

      }});
    
  }

  checkAutoDetect():void{

    if(this.searchForm.value["autoDetect"]){
      this.searchForm.get("location")!.enable();
    }else{
      this.searchForm.get("location")!.disable();
      this.searchForm.get("location")!.setValue("");
    }

  }

  clear():void{

    this.searchForm.reset();
    this.showResultTable = false;
    this.showNoResult = false;
    this.showDetail = false;
    this.searchResults = {} as SearchResults;
    this.searchForm.get('categories')!.setValue("all", {onlySelf: true});

  }


  getAndShowDetail(id: string){
    
    console.log(id);
    this.backendServiceService.getDetail(id).subscribe(details => {this.bisDetails = details; console.log(details);
      
      this.backendServiceService.getReview(id).subscribe(reveiws => {this.bisReviews = reveiws; console.log(reveiws);
        this.showDetail = true;
        this.showResultTable = false;
        // this.detailArea.nativeElement.scrollIntoView();

        var top = this.detailArea.nativeElement.offsetTop; //Getting Y of target element
        var tableHeight = this.tableArea.nativeElement.offsetHeight;
        console.log(top);
        console.log(tableHeight);
        window.scrollTo(0, top - tableHeight); 

        
      });
    });

    
  }

  showTable(){
    this.showDetail = false;
    this.showResultTable = true;

  }

}
