import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent {
  @Input() lastReportInfo = {
    defaultType: '',
    operatorName: '',
    remarks: '',
    date: new Date().toLocaleString('fr'),
  };
}
