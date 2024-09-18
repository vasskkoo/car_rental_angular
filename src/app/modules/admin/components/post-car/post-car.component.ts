import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {
  postCarForm!: FormGroup | any;
  isSpinning: boolean=false;
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null | undefined;

  listOfOption: Array<{label: string; value: string}> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLKSWAGEN", "TOYOTA", "SKODA", "NISSAN", "HYUNDAI", "KIA", "LEXUS", "MAZDA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric"];
  listOfColor = ["White", "Black", "Red", "Blue", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  validateForm: any;

  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private message:NzMessageService,
    private router:Router
){

  }

  ngOnInit(){
    this.postCarForm = this.fb.group({
      name:[null,Validators.required],
      brand:[null,Validators.required],
      type:[null,Validators.required],
      color:[null,Validators.required],
      transmission:[null,Validators.required],
      price:[null,Validators.required],
      description:[null,Validators.required],
      year:[null,Validators.required],
    })
  }
  postCar() {
    if (this.postCarForm.invalid) {
      this.message.error('Please fill all required fields correctly');
      this.postCarForm.markAllAsTouched();
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);  // Додає файл зображення
    formData.append('brand', this.postCarForm.get('brand').value);
    formData.append('name', this.postCarForm.get('name').value);
    formData.append('type', this.postCarForm.get('type').value);
    formData.append('color', this.postCarForm.get('color').value);
    formData.append('year', this.postCarForm.get('year').value.toString());  // Переконайтесь, що рік у правильному форматі
    formData.append('transmission', this.postCarForm.get('transmission').value);
    formData.append('description', this.postCarForm.get('description').value);
    formData.append('price', this.postCarForm.get('price').value.toString());
  
    this.isSpinning = true;
    this.adminService.postCar(formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Car posted successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      (error) => {
        this.isSpinning = false;
        console.error('Error Response:', error);
        this.message.error(`Error while posting car: ${error.status} - ${error.statusText}: ${error.message || 'Unknown error'}`);
      }
    );
  }  
  
  
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();

  }

  previewImage(){
    const reader = new FileReader();
    reader.onload=()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
