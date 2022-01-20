import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  public typeDefaults: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder,
    private reportSvc: ReportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTypeDefault();
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

  public getTypeDefault(): void {
    this.reportSvc
      .getTypeDefault()
      .subscribe((data) => (this.typeDefaults = data));
  }

  public sendReportDefault() {
    navigator.onLine
      ? 'online'
      : this.snackBarMessage('You are offline to submit the form ❌');

    if (this.actionForm.valid) {
      this.reportSvc.createReport(this.actionForm.value).subscribe(() => {
        this.snackBarMessage('Your report has been sent successfully ✔️');
      });
    }
  }
}
