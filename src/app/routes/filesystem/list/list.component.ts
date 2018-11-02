import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import * as Base64 from "../../../../../node_modules/tus-js-client/lib/node/base64.js";
import { forkJoin, Observable, of, Subscription } from 'rxjs';
//import { Upload } from 'tus-js-client'

var tus = require("tus-js-client");
//declare var tus;
var upload;

@Component({
  selector: 'app-filesystem-list',
  templateUrl: './list.component.html',
})
export class FilesystemListComponent implements OnInit {
  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() {
    console.log(tus);
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  tusUpload(item: UploadXHRArgs): Subscription {
    // console.log(item);
    var file: UploadFile = item.file;

    upload = new tus.Upload(file,
    {
      //uploadUrl: 'http://localhost:21021/files/',
      endpoint: 'http://localhost:21021/files/',
      onError: this.onTusError,
      onProgress: (bytesUploaded, bytesTotal) => {
        const percent = (bytesUploaded / bytesTotal * 100).toFixed(2);
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress({percent}, file);
      },
      onSuccess: () => {
        item.file.status =  "success";
        item.onSuccess({fileName: file.name}, file, item);
      },
      metadata: {
        name: file.name,
        contentType: file.type || 'application/octet-stream'
      }
    });
    upload.start();

    return of().subscribe(() => {});
  }

  onTusError(error) {

  }
  onTusProgress(bytesUploaded, bytesTotal) {
    
  }
  onTusSuccess() {
  }

  encodeMetadata(metadata) {
    if (!Base64.isSupported) {
      return "";
    }

    var encoded = [];

    for (var key in metadata) {
      encoded.push(key + " " + Base64.encode(metadata[key]));
    }

    return encoded.join(",");
  }
}
