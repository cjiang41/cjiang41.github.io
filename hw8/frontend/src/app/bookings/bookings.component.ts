import { Component, OnInit } from '@angular/core';
import {Reservation} from '../types';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  allStorage():Reservation[] {

    var values: Reservation[] = [] ,
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {

      
      let value =JSON.parse(localStorage.getItem(keys[i]) || '{}');
      
  
      let reservation: Reservation = {name: value.name, date: value.date, time: value.time, email: value.email, id:value.id};
      values.push(reservation);
    }

    return values;
  }

  cancel(id:string){

    alert("Reservation cancelled!");

    console.log(id);

    localStorage.removeItem(id);

    console.log("delete!!!");





  }

}
