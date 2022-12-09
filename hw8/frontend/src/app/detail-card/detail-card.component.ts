import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { BackendServiceService } from '../backend-service.service';
import { BusinessDetail, BusinessReview, Reservation} from '../types';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DetailCardComponent implements OnInit {

  @Output() showTableEvent = new EventEmitter();

  // details: BusinessDetail = {} as BusinessDetail;
  // reviews: BusinessReview = {} as BusinessReview;

  @Input() details?: BusinessDetail;
  @Input() reviews?: BusinessReview;

  minDate: Date;
  submitted = false;
  hourOptions = ["10", "11", "12", "13", "14", "15", "16", "17"];
  minuteOptions = ["00", "15", "30", "45"];

  resForm = this.fb.group({
    email: ['',[Validators.required,
  	Validators.email]],
    date:['', [Validators.required]],
    hour: ['', [Validators.required]],
    minute: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { 

    this.minDate = new Date();

  }

  ngOnInit(): void {

  }

  getCategories():string{
    let categoriesS = this.details!["categories"][0]["title"];
    for(let i = 1; i < this.details!["categories"].length; i++){
        categoriesS += "|" + this.details!["categories"][i]["title"];
    }
    return categoriesS;
  }
  getStatus():string{
    if(this.details!["hours"][0]["is_open_now"]){
      return "open";
    
    }
    return "closed";

  }

  shareTwitter():string{
    return `https://twitter.com/share?url=${this.details!.url}&text=Check ${this.details!.name} on Yelp`;
  }

  shareFaceBook():string{

    return `https://www.facebook.com/sharer/sharer.php?u=${this.details!.url}`;
  }

  scroll(event: MatTabChangeEvent) {
    console.log('MAP!!!!!');

    let el = document.getElementById(`mat-tab-label-0-${event.index}`);

    console.log(document.getElementById("mat-tab-label-0-1"));
    console.log(document.getElementById("mat-tab-content-0-0"));
    console.log(document.getElementById("mat-tab-content-0-1"));

    console.log(event.index);

    // el!.scrollTop = el!.scrollHeight;

    // el!.scrollIntoView();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.resForm.controls;
  }

  // @ViewChild('testForm') testFormElement!:NgForm;
  onSubmit(){
    
    this.submitted = true;

    if (this.resForm.invalid) {
      return;
    }
    alert("Reservation created!");
      // this.testFormElement.ngSubmit.emit();

    // this.formValues.email = this.resForm.value['email']!;
  
    localStorage.setItem(this.details!.id, JSON.stringify({name: this.details!.name, date: this.resForm.value['date'], time: `${this.resForm.value['hour']}:${this.resForm.value['minute']}`, email: this.resForm.value['email'], id:this.details!.id}));
    
    document.getElementById("closeModel")?.click();
    
    this.submitted = false;

  }

  isReserved(){
    return localStorage.getItem(this.details!.id) != null;
  }

  cancel(){
    alert("Reservation cancelled!");
    localStorage.removeItem(this.details!.id);

  }

  resetForm(){
    this.resForm.reset();
  }

  showTable(){
    this.showTableEvent.emit();

  }

  showForm(){
  
 

  }




}
