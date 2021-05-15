import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContainersService } from 'src/app/containers.service';
import { ImagesService } from 'src/app/images.service';
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
  imageForm: FormGroup;
  _isDisabled = false;
  container = {} as ContainerResponse
  containerRequest = {} as ContainerRequest
  containers: ContainerResponse[];
  image = {} as ImageResponse
  imageRequest = {} as ImageRequest
  images: ImageResponse[];

  constructor(private fb: FormBuilder, private imageService: ImagesService, private containerService: ContainersService) {
    this.createContainerForm();
    this.createImageForm();
  }

  ngOnInit() {
    this.findAllImages();
    this.findAllContainers()
    console.log(environment.test)
  }


  createContainerForm() {
    this.angForm = this.fb.group({
      transferId: [{ value: 0, disabled: this._isDisabled }, [Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      imageNameTag: ['', Validators.required],
      containerPort: ['', Validators.pattern("[0-9]+:[0-9]+")],
      containerEnvFull: ['',Validators.pattern("(([A-Za-z0-9_]+=[A-Za-z0-9_]+),?)+")],
      containername: ['',''],      
    });
  }

  createImageForm(){
    this.imageForm = this.fb.group({
      imageName: ['', Validators.required],
      imageTag: ['',''],
    })
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
    this.imageService.getAll().subscribe((data: ImageResponse[])=>{
      this.images = data;
    })  
  }

  public findAllContainers(): void {
    this.containerService.getAll().subscribe((data: ContainerResponse[])=>{
      this.containers = data;
    })  
  }


  public deleteImageById(imageId: string): void {
    this.imageService.deleteById(imageId).subscribe(() => {
      this.findAllImages();
    })
  }
  
  public deleteContainerById(imageId: string): void {
    this.containerService.deleteById(imageId).subscribe(() => {
      this.findAllContainers();
    })
  }

  public findImageById(imageID: string): void {
    this.imageService.getById(imageID).subscribe((data: ImageResponse) =>{
      this.image = data;
      // console.log(this.image);      
    });
  }  
  
  public findContainerById(containerId: string): void {
    this.containerService.getById(containerId).subscribe((data: ContainerResponse) =>{
      this.container = data;
      // console.log(this.image);      
    });
  }
  
  public runContainer(): void{
    console.log("running container")
    console.log(this.containerRequest)
    this.containerService.run(this.containerRequest)
  // this.angForm.reset()

  }

  public pullImage(): void {
    console.log("pulling image")
  }

  public enableButton(): boolean{
    return true
  }


  //UTILS

  public extractPort(object: Object): string{
    return Object.entries(object["Ports"])[0][1][0]["HostPort"] + ":" + Object.entries(object["Ports"])[0][0]
  }

  public extractLink(object: Object): string{
    return environment.dockerHost + Object.entries(object["Ports"])[0][1][0]["HostPort"]
  }


  // public createTransfer(): void {
  //   this.validDate();
  //   if (this.transferRequest.id !== 0 && this.transferRequest.id !== undefined && this.transferRequest.id !== null)  {
  //     this.dataService.updateTransfer(this.transferRequest).subscribe(() => {
  //       // this.findAll();
  //     });
  //     this.angForm.reset()
  //   } else {
  //     this.dataService.saveTransfer(this.transferRequest).subscribe(() => {
  //       // this.findAll();
  //     });
  //     this.angForm.reset()
  //   }
  // }

}