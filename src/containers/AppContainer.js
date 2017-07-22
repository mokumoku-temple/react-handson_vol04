import React from 'react';
import styles from './styles/AppContainer.css';

import { Search } from '../components/Search';
import RepositoryStore from '../stores/repositoryStore';
import { fetchRepository } from '../actions/repositoryAction';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
  }

  value = '';

  componentDidMount() {
  }

  render() {
    const {
      searchText,
    } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles['search-box']}>
          <Search
            value={this.value}
            onChangeValue={this.onChangeValue}
            onEnterSearch={this.onEnterSearch}
          />
        </div>
        {searchText &&
          <h2 className={styles['search-header']}>{searchText}の検索結果</h2>
        }
      </div>
    );
  }

  onChangeValue(e) {
    this.value = e.target.value;
  }

  onSearch() {
    const text = this.value;
    this.setState({
      searchText: text,
    });
    fetchRepository(text).then((res) => {
      RepositoryStore.updateRepositoryList(res);
      console.log(res);
    });
  }

  onEnterSearch(e) {
    const self = this;
    if (e.keyCode === 13) {
      self.onSearch();
    }
  }


}
