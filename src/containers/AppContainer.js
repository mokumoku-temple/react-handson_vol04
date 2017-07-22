import React from 'react';
import styles from './styles/AppContainer.css';

import { Search } from '../components/Search';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  value = '';

  componentDidMount() {
  }



  render() {
    return (
      <div className={styles['search-box']}>
        <Search
          value={this.value}
          onChangeValue={this.onChangeValue}
        />
      </div>
    );
  }

  onChangeValue(e) {
    console.log('value', e.target.value);
  }
}
