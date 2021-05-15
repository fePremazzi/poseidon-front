import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { DataService } from 'src/app/data.service';
import { TransferResponse } from "../app/models/transfer-response";
import { TransferRequest } from './models/transfer-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Poseidon!';
  angForm: FormGroup;
  angDeleteForm: FormGroup;
  angFindForm: FormGroup;
  _isDisabled = true;
  transfer = {} as TransferResponse;
  transferRequest = {} as TransferRequest;
  transferList: TransferResponse[];
  
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.createForm();
    this.createDeleteForm();
    this.createFindForm();
  }

  ngOnInit() {
    this.findAll();
  }


  createForm() {
    this.angForm = this.fb.group({
      transferId: [{ value: 0, disabled: this._isDisabled }, [Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      originAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required],
      transferValue: ['', [Validators.pattern("^[0-9]*.[0-9]*$"), Validators.min(0.01)]],
      scheduledDate: ['', [CustomValidators.date, Validators.required]]
    });
  }
  createDeleteForm() {
    this.angDeleteForm = this.fb.group({
      transferId: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1)]]
    });
  }
  createFindForm() {
    this.angFindForm = this.fb.group({
      transferId: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1)]]
    });
  }


  public createTransfer(): void {
    this.validDate();
    if (this.transferRequest.id !== 0 && this.transferRequest.id !== undefined && this.transferRequest.id !== null)  {
      this.dataService.updateTransfer(this.transferRequest).subscribe(() => {
        this.findAll();
      });
      this.angForm.reset()
    } else {
      this.dataService.saveTransfer(this.transferRequest).subscribe(() => {
        this.findAll();
      });
      this.angForm.reset()
    }
  }

  public deleteById(id: number): void {
    this.dataService.deleteTransfer(id).subscribe(() => {
      this.findAll();
    })
  }

  public findById(id: number): void {
    this.dataService.getTransferById(id).subscribe((data: TransferResponse) =>{
      this.transfer = data;
      console.log(this.transfer);
      
    });
  }

  public findAll(): void {
    this.dataService.getTransfers().subscribe((data: TransferResponse[])=>{
      this.transferList = data;
    })  
  }

  public validDate():void{
    this.transferRequest.scheduledDate = this.transferRequest.scheduledDate.replace(/\./gi, "-").replace(/\//gi, "-");
  }

  public editTransfer(transferRequest: TransferRequest) {
    this.transferRequest = transferRequest;
  }


  isDisabled() {
    if (this._isDisabled) {
      this.angForm.controls['transferId'].enable();
      this._isDisabled = false;
    } else {
      this.angForm.controls['transferId'].disable();
      this.angForm.controls['transferId'].setValue(0);
      this._isDisabled = true;
    }
  }

}