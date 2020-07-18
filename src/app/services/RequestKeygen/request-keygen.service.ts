import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RequestKeygenService {
  constructor() {}

  private makeid() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }

  flightKeygen() {
    let prefix = "FgTBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }

  hotelBookkingKeygen() {
    let prefix = "HoTBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }

  movementOfGoodsKeygen() {
    let prefix = "MvMtGBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }

  movementOfVehicleKeygen() {
    let prefix = "MvtVBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }

  expenseReimbersementKeygen() {
    let prefix = "ExPrBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }

  queryResolutionKeygen() {
    let prefix = "QyRsBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }

  grievancesKeygen() {
    let prefix = "GrVBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }
  cabKeygen() {
    let prefix = "CabBk";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }
  vendorKeygen() {
    let prefix = "vNdR";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }
  processorKeygen() {
    let prefix = "pRcSr ";
    let suffix = this.makeid();
    let result = prefix + suffix;
    console.log(result, "requestUniqueID");
    return result;
  }
}
