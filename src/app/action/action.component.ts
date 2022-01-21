import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Report } from 'src/shared/interfaces/report.interface';
import { ReportService } from 'src/shared/services/report.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  public actionForm: FormGroup = this.formBuilder.group({
    defaultType: [null, Validators.required],
    operatorName: [null, [Validators.required, Validators.pattern('[^0-9]+')]],
    remarks: [null],
  });

  public buttonState = true;
  public offlineMode = false;
  public offlineMessage = 'You are offline to submit the form ❌';
  public lastReportView = false;
  public lastReportInfo: Report = {
    defaultType: '',
    operatorName: '',
    remarks: '',
    date: new Date().toLocaleString('fr'),
  };
  public typeDefaults: Array<string> = [
    'Delamination',
    'Porosity',
    'Inclusion',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private reportSvc: ReportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.connectionStatus();

    this.actionForm.valueChanges.subscribe(() => {
      this.buttonState = this.actionForm.valid ? false : true;
    });
  }

  public connectionStatus() {
    const updateOnlineStatus = () => {
      this.offlineMode = navigator.onLine ? false : true;
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  public errorDefaultTypeMessage() {
    return this.actionForm.controls['defaultType'].invalid
      ? 'Please choose type of default'
      : null;
  }

  public errorOperatorNameMessage() {
    return this.actionForm.controls['operatorName'].hasError('required')
      ? 'Please enter operator name'
      : this.actionForm.controls['operatorName'].hasError('pattern')
      ? 'The field cannot contain numbers'
      : null;
  }

  public snackBarMessage(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  public sendReportDefault() {
    if (this.actionForm.valid && navigator.onLine) {
      this.reportSvc.createReport(this.actionForm.value).subscribe((data) => {
        if (!data.remarks) {
          data.remarks = 'No remarks';
        }
        this.lastReportInfo = data;
        this.lastReportView = true;
        this.snackBarMessage('Your report has been sent successfully ✔️');
      });
    } else if (!navigator.onLine) {
      this.snackBarMessage(this.offlineMessage);
    }
  }
}
