export class ChannelsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.url = "https://iptv-org.github.io/iptv/channels.json";
    this._data = null;
    this._countries = {};
  }

  load() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.url).then(
        (data) => {
          this._data = data.body;
          let index = 0;
          this._data.forEach((item) => {
            item.id = index;
            index += 1;
          });
          resolve(this._data);
        },
        (error) => {
          console.error("ERROR");
          console.error(error);
          reject(error);
        }
      );
    });
  }

  countries() {
    if(Object.keys(this._countries).length == 0) {
      this._data.forEach((item) => {
        if(Object.keys(this._countries).indexOf(item.country.name) == -1) {
          this._countries[item.country.name] = []
        }
        this._countries[item.country.name].push(item);
      });
    }

    return Object.keys(this._countries).sort();
  }

  findCountry(country) {
    if(Object.keys(this._countries) == 0) {
      this.countries();
    }

    return this._countries[country];
  }
  
}