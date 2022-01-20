import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  public actionForm: FormGroup = this.formBuilder.group({
    defaultType: ['', Validators.required],
    operatorName: ['', [Validators.required, Validators.pattern('[^0-9]+')]],
    remarks: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

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
}
