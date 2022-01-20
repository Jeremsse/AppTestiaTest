import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  public actionForm: FormGroup = this.formBuilder.group({
    defaultType: [''],
    operatorName: [''],
    remarks: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
