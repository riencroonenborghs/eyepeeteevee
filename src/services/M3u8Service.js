import * as m3u8FileParser from "m3u8-file-parser";

export class M3u8Service {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  load(url) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).then(
        (data) => {
          let m3u8Data = this._parseData(data.body);
          resolve(m3u8Data);
        },
        (error) => {
          console.error("ERROR");
          console.error(error);
          reject(error);
        }
      );
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
}