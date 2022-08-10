import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { eventsViewModel } from "./events";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }

  getEventsDigitals(idTypeEvent?: string) {
    let url;
    if (idTypeEvent) {
      url = `http://localhost:8080/eventos/buscar?origin=${idTypeEvent}`;
    } else {
      url = 'http://localhost:8080/eventos/';
    }
    return this.httpClient.get<eventsViewModel>(url);
  }
}


/* Get(url: string): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
    this.http.get(`${this.baseUrl}${url}`).subscribe(
      data => {
        resolve(data as CommandResult);
      },
      res => {
        if (res.status === 401) {
          this.store.dispatch(new Logout());
        } else {
          resolve(res.error as CommandResult);
        }
      }
    );
  });
} */
