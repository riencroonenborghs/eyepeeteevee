import * as m3u8FileParser from "m3u8-file-parser";
import { Channel } from "../models/channel";

export class M3u8Service {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  loadURL(url) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).then(
        (data) => {
          let m3u8Data = this._parseData(data.body);
          resolve(this._toChannels(m3u8Data));
        },
        (error) => {
          console.error("ERROR");
          console.error(error);
          reject(error);
        }
      );
    });
  }

  loadFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = e => {
        let m3u8Data = this._parseData(e.target.result);
        resolve(this._toChannels(m3u8Data));
      }
      reader.readAsText(file);
    });
  }
  
  _parseData(data) {
    let parser = new m3u8FileParser();
    parser.read(data);
    let parsedData = parser.getResult();
    parsedData.segments.forEach((segment) => {
      const parts = segment.url.split("|");
      segment.url = parts[0];
      segment.urlAdditional = parts[1];
    });
    return parsedData;
  }

  _toChannels(m3u8Data) {
    return m3u8Data.segments.map((data) => {
      return Object.assign(
        new Channel(),
        {id: data.inf.tvgId, logo: data.inf.tvgLogo, name: data.inf.title, url: data.url}
      );
    });
  }
}