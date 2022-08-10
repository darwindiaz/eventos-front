import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { DataSource } from '@angular/cdk/collections';
import { eventsViewModel } from './events';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  typeEventSelect = new FormControl('');
  typeEvents = [
    { value: 'F001', viewValue: 'Consulta de información bursátil' },
    { value: 'F002', viewValue: 'Emisión de título valor' },
    { value: 'F003', viewValue: 'Generación de reportes operativos' },
    { value: 'F004', viewValue: 'Custodia de título valor' },
    { value: 'F005', viewValue: 'Complementación de operación' }
  ];

  displayedColumns: string[] = ['event', 'date', 'count', 'cost'];
  dataToDisplay = [];
  dataSource = new EventsDataSource(this.dataToDisplay);
  buttonDisabled = false;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.buttonDisabled = !this.buttonDisabled;
    this.appService.getEventsDigitals().subscribe(data => this.sendDataSourceTable(data));
  }

  searchEvent() {
    this.buttonDisabled = !this.buttonDisabled;
    this.appService.getEventsDigitals(this.typeEventSelect.value).subscribe(data => {
      this.sendDataSourceTable(data)
    });
  }

  sendDataSourceTable(data: any) {
    this.dataSource.setData(data)
    this.buttonDisabled = !this.buttonDisabled;
  }
}


class EventsDataSource extends DataSource<eventsViewModel> {
  private _dataStream = new ReplaySubject<eventsViewModel[]>();

  constructor(initialData: eventsViewModel[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<eventsViewModel[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: eventsViewModel[]) {
    this._dataStream.next(data);
  }
}
