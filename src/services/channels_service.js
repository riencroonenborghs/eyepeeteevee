import { Channel } from "@/models/channel";

export class ChannelsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.url = "https://iptv-org.github.io/iptv/channels.json";
    this._data = null;
    this._countries = {};
    this._languages = {};
  }

  load() {
    return new Promise((resolve, reject) => {
      if(this._data == null) {
        this.httpClient.get(this.url).then(
          (data) => {
            this._data = this._toChannels(data.body);
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
      } else {
        resolve(this._data);
      }
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

  languages() {
    if(Object.keys(this._languages).length == 0) {
      this._data.forEach((item) => {
        item.language.forEach((language) => {
          if(Object.keys(this._languages).indexOf(language.name) == -1) {
            this._languages[language.name] = []
          }
          this._languages[language.name].push(item);
        });
      });
    }

    return Object.keys(this._languages).sort();
  }

  findCountry(country) {
    if(Object.keys(this._countries) == 0) {
      this.countries();
    }

    return this._countries[country];
  }

  findLanguage(language) {
    if(Object.keys(this._languages) == 0) {
      this.languages();
    }

    return this._languages[language];
  }

  _toChannels(list) {
    return list.map((data) => {
      return Object.assign(
        new Channel(),
        data
      );
    });
  }
  
}