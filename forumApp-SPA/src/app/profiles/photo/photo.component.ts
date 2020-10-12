import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
@Input() photo: Photo;
@Output() getNewPhoto = new EventEmitter<string>();
uploader: FileUploader;
hasBaseDropZoneOver: boolean;
baseUrl = environment.apiUrl;
response: string;

constructor(private authService: AuthService) {
  this.uploader = new FileUploader({
    // url: URL,
    disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    formatDataFunctionIsAsync: true,
    formatDataFunction: async (item) => {
      return new Promise( (resolve, reject) => {
        resolve({
          name: item._file.name,
          length: item._file.size,
          contentType: item._file.type,
          date: new Date()
        });
      });
    }
  });

  this.hasBaseDropZoneOver = false;

  this.response = '';

  this.uploader.response.subscribe( res => this.response = res );
}

ngOnInit() {
  this.initializeUploader();
}

fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}

initializeUploader() {
  this.uploader = new FileUploader({
    url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photo',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    isHTML5: true,
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 10 * 1024 * 1024 // 10MB
  });

  this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

  this.uploader.onSuccessItem = (item, response, status, headers) => {
    if (response) {
      const res: Photo = JSON.parse(response);
      const photo = {
        id: res.id,
        url: res.url,
        date: res.date
      };
      this.photo = photo;
      this.getNewPhoto.emit(photo.url);
    }
  };
}
}
