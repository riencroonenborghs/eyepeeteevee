import { Injectable } from '@angular/core';
import * as m3u8FileParser from "m3u8-file-parser";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  hasPlaylist: boolean = false;
  playlist;

  constructor(
    private _httpClient: HttpClient
  ) { }

  loadURL(url: string) {
    this.hasPlaylist = true;
    this._httpClient.get(url, {responseType: 'text'}).subscribe(
      data => {
        let parser = new m3u8FileParser();
        parser.read(data);
        this.playlist = parser.getResult();
        console.log(this.playlist);
      }
    );
  }
}
