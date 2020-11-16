import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss'],
})
export class AddAlbumComponent implements OnInit {
  addAlbumForm = this.fb.group({
    name: ['', Validators.required],
    year: ['', Validators.required],
    genre: ['', Validators.required],
    coverUrl: [''],
  });

  public selectedFile = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // this.addAlbumForm.valueChanges.subscribe(value => this.updateStore(value));
  }

  onSubmit(): void {
    alert('it worked');
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.addAlbumForm.patchValue({
        coverUrl: file,
      });

      this.selectedFile = file.name;
    }
  }

  submit(): void {
    const formData = new FormData();
    formData.append('name', this.addAlbumForm?.get('name')?.value);
    formData.append('year', this.addAlbumForm?.get('year')?.value);
    formData.append('genre', this.addAlbumForm?.get('genre')?.value);
    formData.append('file', this.addAlbumForm?.get('coverUrl')?.value);

    this.http
      .post('http://localhost:8001/upload.php', formData)
      .subscribe((res) => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }
}
