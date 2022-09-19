import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { apiURL } from './apiUrl';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  myForm!: FormGroup;
  submitted = false;
  formDataObj: any;

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public fb: FormBuilder
  ) {
    this.myForm = fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      city: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      mobileNo: new FormControl('', [
        Validators.required,

        Validators.pattern(/^[6-9][0-9]{9}$/),
      ]),
      feedback: new FormControl('', [Validators.required]),
      captureNo: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      product_type: new FormControl(),
      storeCity: new FormControl(),
      storeName: new FormControl(),
      orederNumber: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.generateCapture();
  }

  //randome Number Generator
  random!: number;
  generateCapture() {
    let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.captchaLoad(random);
    this.random = random;
  }

  //Capture load to Canvas
  captchaLoad(random: any) {
    var canvas = <HTMLCanvasElement>document.getElementById('canvastext');
    var context = canvas.getContext('2d');
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context!.font = '30px Arial, Helvetica, sans-serif';
    context!.fillStyle = '#585858';
    context?.fillText(random, 10, 35);
  }

  //capture Validation
  captureError: boolean = false;
  captureValidation(event: any) {
    if (event.target.value != this.random && event.target.value.length > 0) {
      this.captureError = true;
    } else {
      this.captureError = false;
    }
  }

  //radio buttons show
  radioListVisible: boolean = false;
  inputSelectSubject: string = '';
  radioListShow(event: any) {
    this.inputSelectSubject = event.target.value;
    this.inputRadioSelect = '';
  }

  //radio button input show
  inputRadioSelect: string = '';
  radioInputOnlineShow(event: any) {
    this.inputRadioSelect = event.target.value;
  }

  submitData(formData: any) {
    this.submitted = true;
    let sentData: sentDataObj = new sentDataObj();

    if (this.myForm.valid && this.captureError == false) {
      sentData.CaptchaCode = formData.captureNo;
      sentData.City = formData.city;
      sentData.Email = formData.emailId;
      sentData.Enquiry = formData.feedback;
      sentData.FirstName = formData.name;
      sentData.Phone = formData.mobileNo;
      sentData.Subject = this.inputSelectSubject;

      //online radio check
      if (this.inputRadioSelect == 'Online') {
        sentData.IsOnlineOrder = true;
        sentData.OrderNumber = formData.orederNumber;
      } //offline radio check
      else if (this.inputRadioSelect == 'Offline') {
        sentData.IsOnlineOrder = false;
        sentData.StoreName = formData.storeName;
        sentData.StoreCity = formData.storeCity;
      } else {
        sentData.OrderNumber = '';
        sentData.StoreName = '';
        sentData.StoreCity = '';
      }

      this.apiService
        .postService(apiURL, sentData)
        .subscribe((data) => (this.formDataObj = data));

      window.alert('Data Send Successfully');
      this.myForm.reset();
      this.submitted = false;
      this.generateCapture();
    } else {
      return;
    }
  }
}
export class sentDataObj {
  CaptchaCode!: string;
  City!: string;
  CurrencyId: string = '1';
  CustomerToken: string = '';
  Email!: string;
  Enquiry!: string;
  FirstName!: string;
  IsOnlineOrder!: boolean;
  MobileCountryCode: number = 1;
  OrderNumber!: string;
  Phone!: string;
  StoreCity!: string;
  StoreName!: string;
  Subject!: string;
}
