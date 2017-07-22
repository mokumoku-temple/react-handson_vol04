import React from 'react';
import { Search } from '../components/Search';
import { SubmitButton } from '../components/SubmitButton';
import { SortButton } from '../components/SortButton';
import styles from './styles/AppContainer.css';
import RepositoryStore from '../stores/repositoryStore';
import { fetchRepository } from '../actions/repositoryAction';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      disabled: true,
      repositoryList: [],
      isLatest: true,
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
    this.onClickChangeOrder = this.onClickChangeOrder.bind(this);
  }

  value = '';

  componentDidMount() {
    RepositoryStore.on('changed', () => {
      this.setState({ repositoryList: RepositoryStore.getRepository() });
    });
    RepositoryStore.on('changed', () => {
      this.setState({ isLatest: RepositoryStore.getOrderType() });
    });
  }

  renderSearchResults(v) {
    const el = (
      <div key={v.id}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={v.html_url}
        >
          {v.name}
        </a> ★{v.stargazers_count}
      </div>
    );
    return el;
  }

  render() {
    const {
      disabled,
      repositoryList,
      isLatest,
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
          <SubmitButton
            onSearch={this.onSearch}
            disabled={disabled}
          />
        </div>
        {searchText &&
          <h2 className={styles['search-header']}>{searchText}の検索結果</h2>
        }
        {repositoryList.length > 0 &&
          <SortButton
            onClick={this.onClickChangeOrder}
            isLatest={isLatest}
          />
        }
        {repositoryList.map(v =>
          this.renderSearchResults(v),
        )}
      </div>
    );
  }

  onChangeValue(e) {
    this.value = e.target.value;
    if (Object.keys(this.value).length === 0) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  }

  onSearch() {
    const text = this.value;
    this.setState({
      searchText: text,
    });
    fetchRepository(text).then((res) => {
      RepositoryStore.updateRepositoryList(res);
    });
  }

  onEnterSearch(e) {
    const self = this;
    // Enterで検索
    if (e.keyCode === 13) {
      self.onSearch();
    }
  }

  onClickChangeOrder() {
    const list = [...this.state.repositoryList];
    RepositoryStore.orderChange(list);
  }
}
