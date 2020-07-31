export class LoadService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this._busy = false;
    this._data = null;
  }

  async loadURL(url) {
    while(this._busy) { await this._sleep(); }

    this._busy = true;
    return new Promise((resolve, reject) => {
      if(this._data == null) {
        this.httpClient.get(url).then(
          (data) => {
            this._data = data.body;
            this._busy = false;
            resolve(this._data);
          },
          (error) => {
            console.error("ERROR");
            console.error(error);
            this._busy = false;
            reject(null);
          }
        );
      } else {
        this._busy = false;
        resolve(this._data);
      }
    });
  }

  _sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}