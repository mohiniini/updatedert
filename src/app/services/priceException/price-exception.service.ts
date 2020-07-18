import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceExceptionService {

  constructor() { }
  private flightExpense;
  private HotelExpense;
  private MogExpense;
  private MovExpense;
  private CabExpense;
  
  getFlightLimit(){
    this.flightExpense=15000;
    return this.flightExpense
  }
  getHotelLimit(){
    this.HotelExpense=15000;
    return this.HotelExpense
  }
  getMogLimit(){
    this.MogExpense=15000;
    return this.MogExpense
  }
  getMovLimit(){
    this.MovExpense=15000;
    return this.MovExpense
  }
  getCabLimit(){
    this.CabExpense=5000;
    return this.CabExpense
  }


}
