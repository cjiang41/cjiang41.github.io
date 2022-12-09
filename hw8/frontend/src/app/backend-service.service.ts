import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map,  switchMap, catchError} from 'rxjs/operators';
import {SuggestKeywords, Coordinate, IpResponse, SearchResults, BusinessDetail, BusinessReview} from './types'

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  private HOST = "https://pythonprojecthw6.wl.r.appspot.com";
  private ipinfo_url = "https://ipinfo.io/?token=5acc8d70ff2f72";
  constructor(private http: HttpClient) { }

  getResult(searchForm: FormGroup):Observable<SearchResults>{
    console.log("searching");
    console.log(searchForm.value);
    return this.getPostion(searchForm).pipe(switchMap(coordinate => {
      const radius = Math.min(Math.round(searchForm.value["distance"]*1609), 4000);
      if(coordinate.latitude == ""){
        console.log("wrong location");
        return of({} as SearchResults) ;
      }
      const serachBusinessUrl = this.HOST +`/searchYelp/${searchForm.value["keyword"]}/${coordinate["latitude"]}/${coordinate["longitude"]}/${searchForm.value["categories"]}/${radius}`;
      console.log(serachBusinessUrl);
      return this.http.get<SearchResults>(serachBusinessUrl);
    }));
  }

  autoKeyword(keyword: String): Observable<SuggestKeywords>{
    const searchKeywordUrl = this.HOST +`/keyword/${keyword}`;
    return this.http.get<SuggestKeywords>(searchKeywordUrl);
  }

  getPostion(searchForm: FormGroup): Observable<Coordinate>{
    if(searchForm.value["autoDetect"]){
      return this.http.get<IpResponse>(this.ipinfo_url).pipe(map( response => {
        const position = response["loc"].split(",");
        const lat= position[0];
        const lng = position[1];
        console.log("geo:", lat, lng);
        return {latitude: lat, longitude: lng};
      }));
    }else{
      const googleGeoApi_url = this.HOST + `/location/${searchForm.value["location"]}`;
      return this.http.get<Coordinate>(googleGeoApi_url);
    }
  }

  getDetail(businessId: string){
    const url = this.HOST + `/searchDetail/${businessId}`;
    return this.http.get<BusinessDetail>(url);
  }

  getReview(businessId: string){
    const url = this.HOST + `/searchReview/${businessId}`;
    return this.http.get<BusinessReview>(url);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }






}
