import { Country } from "./country";
import { Language } from "./language";
import { Tvg } from "./tvg";

export class Channel {
  get id() { return this._id; }
  set id(id) { this._id = id; }

  get category() { return this._category; }
  set category(category) { this._category = category; }

  get country() { return this._country; }
  set country(country) { this._country = Object.assign(new Country(), country); }

  get language() { return this._language; }
  set language(languages) { 
    this._language = languages.map((language) => Object.assign(new Language(), language));
  }

  get logo() { return this._logo; }
  set logo(logo) { this._logo = logo; }

  get name() { return this._name; }
  set name(name) { this._name = name; }

  get tvg() { return this._tvg; }
  set tvg(tvg) { this._tvg = Object.assign(new Tvg(), tvg); }

  get url() { return this._url; }
  set url(url) { this._url = url; }
}