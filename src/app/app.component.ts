import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { DataService } from 'src/app/data.service';
import { ContainersService } from 'src/app/containers.service';
import { ImagesService } from 'src/app/images.service';
import { TransferResponse } from "../app/models/transfer-response";
import { TransferRequest } from './models/transfer-request';
import { ContainerResponse } from './models/container-response';
import { ContainerRequest } from './models/container-request';
import { ImageRequest } from './models/image-request';
import { ImageResponse } from './models/image-response';
import { environment } from '../environments/environment';

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
  container = {} as ContainerResponse
  containerRequest = {} as ContainerRequest
  containers: ContainerResponse[];
  image = {} as ImageResponse
  imageRequest = {} as ImageRequest
  images: ImageResponse[];

  constructor(private fb: FormBuilder, private dataService: DataService,
              private imageService: ImagesService, private containerService: ContainersService) {
    this.createForm();
    this.createDeleteForm();
    this.createFindForm();
  }

  ngOnInit() {
    this.findAllImages();
    this.findAllContainers()
    console.log(environment.test)
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

  public findAllImages(): void {
    this.imageService.getImages().subscribe((data: ImageResponse[])=>{
      this.images = data;
    })  
  }

  public findAllContainers(): void {
    this.containerService.getContainers().subscribe((data: ContainerResponse[])=>{
      this.containers = data;
    })  
  }

  public extractPort(object: Object): string{
    return Object.entries(object["Ports"])[0][1][0]["HostPort"] + ":" + Object.entries(object["Ports"])[0][0]
  }

  public extractLink(object: Object): string{
    return environment.dockerHost + Object.entries(object["Ports"])[0][1][0]["HostPort"]
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




}