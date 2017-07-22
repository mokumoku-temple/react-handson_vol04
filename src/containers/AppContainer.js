import React from 'react';
import styles from './styles/AppContainer.css';

import { Search } from '../components/Search';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
  }

  value = '';

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['search-box']}>
          <Search
            value={this.value}
            onChangeValue={this.onChangeValue}
            onEnterSearch={this.onEnterSearch}
          />
        </div>
      </div>
    );
  }

  onChangeValue(e) {
    console.log('value', e.target.value);
  }

  onSearch() {
    console.log('検索された');
  }

  onEnterSearch(e) {
    const self = this;
    if (e.keyCode === 13) {
      self.onSearch();
    }
  }


}
