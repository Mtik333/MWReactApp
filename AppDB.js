import React, { Component } from 'react';

import Realm from 'realm'
import _ from 'lodash'

let realm = new Realm({
  schema: [{name: 'Categories', properties: {name: 'string'}}]
})

let favs = realm.objects('Categories')

class AppDB extends Component {

  constructor (props) {
    super(props);
    this.state = {
      input: ''
    }
}

  _addItem () {
    realm.write(() => {
      realm.create('Categories', { name: 'eee' })
    })
  }

  _getAll () {
    return favs;
  }
render () {

}
}

export default AppDB;