import { LoadService } from "@/services/load_service";
import { Channel } from "@/models/channel";

export class ChannelsService extends LoadService {
  constructor(httpClient) {
    super(httpClient);
    this.url = "https://iptv-org.github.io/iptv/channels.json";    
    this._countries = {};
    this._languages = {};
    this._parsed = false;
  }

  async load() {
    await this.loadURL(this.url);
    if(!this._parsed) { this._parseData(); }
  }

  countries() {
    if(this._empty(this._countries)) {
      this._data.forEach((item) => {
        if(this._notIn(this._countries, () => item.country.name)) {
          this._countries[item.country.name] = []
        }
        this._countries[item.country.name].push(item);
      });
    }

    return Object.keys(this._countries).sort();
  }

  languages() {
    if(this._empty(this._languages)) {
      this._data.forEach((item) => {
        item.language.forEach((language) => {
          if(this._notIn(this._languages, () => language.name)) {
            this._languages[language.name] = []
          }
          this._languages[language.name].push(item);
        });
      });
    }

    return Object.keys(this._languages).sort();
  }

  findCountry(country) {
    return this._findBy("countries", country);
  }

  findLanguage(language) {
    return this._findBy("languages", language);
  }

  _empty(list) {
    return Object.keys(list).length == 0;
  }

  _notIn(list, indexF) {
    return Object.keys(list).indexOf(indexF()) == -1;
  }

  _findBy(key, value) {
    let list = this[`_${key}`];
    if(Object.keys(list) == 0) {
      this[key]();
    }
    return list[value];
  }

  _parseData() {
    let index = 0;
    this._data = this._data.map((data) => {
      data.id = index;
      index += 1;
      return Object.assign(
        new Channel(),
        data
      );
    });
    this._parsed = true;
  }
}