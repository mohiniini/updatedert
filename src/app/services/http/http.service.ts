import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { url } from "../../../model/url";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  apiUrl = "https://employeerelocation.azurewebsites.net/api/";
  // apiUrl = "http://localhost:8080/api/"
  url = new url();
  getmethod($url) {
    this.spinner.show();

    var promise = new Promise((resolve, reject) => {
      this.http
        .get($url)
        .pipe(
          map(data => {
            return data;
          }),
          catchError(error => {
            this.toastr.error("Error", "Network Error", {
              progressBar: true,
              positionClass: "toast-bottom-right"
            });
            reject(error);
            this.spinner.hide();
            return error;
          })
        )
        .subscribe(result => {
          this.toastr.success("Success", "Data Fetch Complete", {
            progressBar: true,
            positionClass: "toast-bottom-right"
          });

          resolve(result);
          this.spinner.hide();
        });
    });

    return promise;
  }

  postmethod($url, $data) {
    this.spinner.show();

    var promise = new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };

      this.http
        .post($url, $data, httpOptions)
        .pipe(
          map(data => {
            return data;
          }),
          catchError(error => {
            this.toastr.error("Error", "Network Error", {
              progressBar: true,
              positionClass: "toast-bottom-right"
            });
            reject(error);
            this.spinner.hide();
            return error;
          })
        )
        .subscribe(result => {
          resolve(result);
          this.toastr.success("Success", "Data Inserted", {
            progressBar: true
          });

          this.spinner.hide();
        });
    });

    return promise;
  }

  private getHeaders(): HttpHeaders {
    let header = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return header;
  }

  putmethod($url, $data) {
    console.log($data);
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    this.spinner.show();
    var promise = new Promise((resolve, reject) => {
      this.http
        .put($url, $data, httpOptions)
        .pipe(
          map(data => {
            return data;
          }),
          catchError(error => {
            this.toastr.error("Error", "Network Error", {
              progressBar: true,
              positionClass: "toast-bottom-right"
            });
            reject(error);
            this.spinner.hide();
            return error;
          })
        )
        .subscribe(result => {
          this.toastr.success("Success", "Data Updated", {
            progressBar: true,
            positionClass: "toast-bottom-right"
          });

          resolve(result);
          this.spinner.hide();
        });
    });

    return promise;
  }
  getEmployeeByIdObservable(id: any) {
    return this.http.get<any>("http://localhost:3000" + "/employees/" + id);
  }
  getEmployeeObservable() {
    return this.http.get<any>("http://localhost:3000" + "/employees");
  }
  getRequestObservable(id) {
    return this.http.get<any>(
      "http://localhost:3000" + "/requests?employeeId=" + id
    );
  }
  getAllRequestObservable() {
    return this.http.get<any>("http://localhost:3000" + "/requests");
  }
  getVendorObservable() {
    return this.http.get<any>("http://localhost:3000" + "/vendor ");
  }
  getVendorObservablebyEmail(x) {
    return this.http.get<any>("http://localhost:3000" + "/vendor?email=" + x);
  }
  getProcessorObservable() {
    return this.http.get<any>("http://localhost:3000" + "/processor");
  }
  getProcessorByIdObservable(id: any) {
    return this.http.get<any>("http://localhost:3000" + "/processor/" + id);
  }
  getEmployeeByProcessorIdObservable(id: any) {
    return this.http.get<any>(
      "http://localhost:3000" + "/employees?processorId=" + id
    );
  }

  postEmployee(data) {
    return this.http.post<any>(this.url.baseurl + "employees", data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  putAssignProceesorToEmployee(data, x) {
    return this.http.put<any>(this.url.baseurl + "employees/" + x, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  postVendor(vendor) {
    return this.http.post<any>(this.url.baseurl + "vendor", vendor, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  postUser(user) {
    return this.http.post<any>(this.url.baseurl + "users", user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  // ==========================actual=api's============================================//
  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  postHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    responseType: 'text' as 'json'
  };

  loginVerification(email) {
    return this.http.post<any>(this.apiUrl + "getuser/email", email, this.httpHeader);
  }
  getEmployeeDetail(id) {
    return this.http.post<any>(this.apiUrl + "getuser/id", id, this.httpHeader);
  }
  postRequest(request) {
    return this.http.post<any>(this.apiUrl + "request", request, this.postHeader);
  }
  getRequestByEmployeeId(id) {
    return this.http.post<any>(this.apiUrl + "request/emp", id, this.httpHeader)
  }

  getAllEmployees() {
    return this.http.get<any>(this.apiUrl + "getallemployees")
  }

  getAllRequestGrouped() {
    return this.http.get<any>(this.apiUrl + "admin/getrequest/type")
  }
  getRequestByTypeAndVendorId(obj) {
    return this.http.post<any>(this.apiUrl + "getrequest/type", obj, this.httpHeader)
  }
  getAllProcessor() {
    return this.http.get<any>(this.apiUrl + "getallprocessor")
  }
  updateEmployee(user) {
    return this.http.post<any>(this.apiUrl + "updateuser", user, this.postHeader)
  }
  updateRequest(request) {
    let postData = {
      requestId: request._id,
      userId: localStorage.getItem('userid'),
      date: new Date(),
      request: request
    }
    return this.http.post<any>(this.apiUrl + "updaterequest", postData, this.postHeader)
  }

  postNewEmployee(emp) {
    return this.http.post<any>(this.apiUrl + "user", emp, this.httpHeader)
  }
  getAllVendor() {
    return this.http.get<any>(this.apiUrl + "getallvendor")
  }
  getEmployeeUnderProcessor(processorId) {
    return this.http.post<any>(this.apiUrl + "getuser/processorid", processorId, this.httpHeader)
  }
  getRequestWithprocessorId(processorId) {
    return this.http.post<any>(this.apiUrl + "processor/emp", processorId, this.httpHeader)
  }
  getRequestById(id) {
    return this.http.post<any>(this.apiUrl + "request/id", id, this.httpHeader)
  }
  postQueryResoultion(id) {
    return this.http.post<any>(this.apiUrl + "requests/", id, this.httpHeader)

  }
  uploadResource(fb) {
    return this.http.post<any>("https://nspv.azurewebsites.net/upload", fb)
  }
  // ==============================================================
  // MAIL
  sendTicketByEmail(postData) {
    return this.http.post<any>(this.apiUrl + "mail/send", postData, this.httpHeader)

   }
  WelcomeByMail(postData) {
    return this.http.post<any>(this.apiUrl + "mail/init", postData, this.httpHeader)

   }
  sendTicketByUserId(postData) {
    return this.http.post<any>(this.apiUrl + "mail/ticketById", postData, this.httpHeader)

   }
  MailByUserId(postData) {
    return this.http.post<any>(this.apiUrl + "mail/MailByUserId", postData, this.httpHeader)

   }


}
