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
  year: 'int?',
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

  _addItem (id, model, manufacturer, year, url) {
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
      this._addItem(1, 'RSX', "Acura", 2005, "https://www.cstatic-images.com/car-pictures/maxWidth503/usb50acc111b0101.png");
      this._addItem(2, 'Civic', "Honda", 2000, "https://www.cstatic-images.com/car-pictures/maxWidth503/cab00hoc023b1101.png");
      this._addItem(3, 'RX-8', "Mazda", 2005, "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50mac161b0101.png");
      this._addItem(4, '240SX', "Nissan", 1994, "http://momentcar.com/images/nissan-240sx-1994-9.jpg");
      this._addItem(5, 'Skyline GT-R', "Nissan", 2002, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg/1024px-Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg");
      this._addItem(6, 'A3', "Audi", 2005, "https://www.cstatic-images.com/car-pictures/maxWidth503/usb60auc151a0101.png");
      this._addItem(7, 'Focus', "Ford", 2005, "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50foc124a0101.png");
      this._addItem(8, 'Mustang', "Ford", 2005, "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50foc052b0101.png");
      this._addItem(9, 'H2', "Hummer", 2005, "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50hus041a0101.png");
      this._addItem(10, 'Tiburon', "Hyundai", 2005, "https://www.cstatic-images.com/car-pictures/maxWidth503/cab50hyc041c0101.png");

    }
    return favs;
  }

  _getFiltered(filter){
    console.log( filter['myFilter']);
    var myObj = filter['myFilter'];
    var query = '';
    var keysOfObj = Object.keys(myObj).map(function(key) {
      if (myObj[key]){
        if (key=='year'){
          console.log(key);
          var rightYear = parseInt(myObj[key]);
          var nextYear = parseInt(myObj[key])+1;
          query+=key+' >= '+rightYear+ ' AND ' +key+ ' <= ' +nextYear + ' AND ';
        }
        else query+=key+' BEGINSWITH "' + myObj[key] + '" AND ';
      }
    });
    query = query.slice(0,query.lastIndexOf("AND"));
    console.log(query);
    if (query=='')
      return favs;
    else return favs.filtered(query);
  }
render () {

  }
}

export default AppDB;