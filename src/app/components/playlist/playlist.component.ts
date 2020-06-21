import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PlaylistService } from "@services/playlist.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.sass']
})
export class PlaylistComponent implements OnInit {

  playlistURLControl = new FormControl();
  streamURL: string = null;

  constructor(
    public playlistService: PlaylistService
  ) { }

  ngOnInit(): void {
    this.playlistURLControl.setValue("http://i.mjh.nz/nzau/kodi-tv.m3u8");
  }

  loadPlaylist() {
    this.playlistService.loadURL(this.playlistURLControl.value);
  }

  playStream(streamURL: string) {
    this.stopPlaying();
    setTimeout(()=> {
      this.streamURL = streamURL.split("|")[0];
    }, 500);
  }

  stopPlaying() {
    this.streamURL = null;
  }
}
