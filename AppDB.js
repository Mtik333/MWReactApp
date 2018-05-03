import React, { Component } from 'react';

import Realm from 'realm'
import _ from 'lodash'

let realm = new Realm({
  schema: [{name: 'Cars', 
  primaryKey: 'id',
  properties: 
  {
  id: 'int',
  model: 'string',
  manufacturer : 'string',
  year: 'date?',
  pictureUrl : 'string'
  },
  }]
})

let favs = realm.objects('Cars')

class AppDB extends Component {

  constructor (props) {
    super(props);
    this.state = {
      input: ''
    }
}

  _addItem (id, manufacturer, model, year, url) {
    realm.write(() => {
      realm.create('Cars', { 
        id: id,
        model: model,
        manufacturer: manufacturer,
        year: year,
        pictureUrl: url})
    })
  }

  _getAll () {
    if (favs.length==0){
      console.log("creatin");
      this._addItem(1, 'RSX', "Acura", new Date(2005,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/usb50acc111b0101.png");
      this._addItem(2, 'Civic', "Honda", new Date(2000,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/cab00hoc023b1101.png");
      this._addItem(3, 'RX-8', "Mazda", new Date(2005,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50mac161b0101.png");
      this._addItem(4, '240SX', "Nissan", new Date(1994,0), "http://momentcar.com/images/nissan-240sx-1994-9.jpg");
      this._addItem(5, 'Skyline GT-R', "Nissan", new Date(2002,0), "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg/1024px-Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg");
      this._addItem(6, 'A3', "Audi", new Date(2005,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/usb60auc151a0101.png");
      this._addItem(7, 'Focus', "Ford", new Date(2005,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50foc124a0101.png");
      this._addItem(8, 'Mustang', "Ford", new Date(2005,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50foc052b0101.png");
      this._addItem(9, 'H2', "Hummer", new Date(2005,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50hus041a0101.png");
      this._addItem(10, 'Tiburon', "Hyundai", new Date(2005,0), "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50hyc041c0101.png");

    }
    return favs;
  }

  _getFiltered(filter){
    var chuj = filter['myFilter'];
    var query = '';
    var tifOptions = Object.keys(chuj).map(function(key) {
      if (chuj[key]!=''){
        query+=key+' BEGINSWITH "' + chuj[key] + '" AND ';
      }
      console.log(key+";"+chuj[key]);
    });
    query = query.slice(0,query.lastIndexOf("AND"));
    console.log(query);
    if (query!='')
      return favs.filtered(query);
    else return favs;
  }
render () {

}
}

export default AppDB;