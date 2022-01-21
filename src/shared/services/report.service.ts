import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Report } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  public createReport(body: Report): Observable<Report> {
    body.date = new Date().toLocaleString('fr');
    return this.httpClient.post<Report>(`${environment.URL}/reports`, body);
  }
}
