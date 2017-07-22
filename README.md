install
----

```sh
npm install -g yarn & yarn install
```

or

```sh
npm install .
```

Lunch server (localhost:3000)
----

```sh
npm start or yarn start
```

Hello, World
----

src/containers/AppContainer.js

```js

import React from 'react';
import styles from './styles/AppContainer.css';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        Hello, World!
      </div>
    );
  }
}

```

検索コンポーネントを作る
----


/containers/AppContainer.js

```js

import React from 'react';
import { Search } from '../components/Search';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
  }

  value = '';

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
        {searchText &&
          <h2 className={styles['search-header']}>{searchText}の検索結果</h2>
        }
      </div>
    );
  }

  onSearch() {
    const text = this.value;
    this.setState({
      searchText: text,
    });
  }

  onChangeValue(e) {
    console.log(e);
  }

  onEnterSearch(e) {
    // Enterで検索
    if (e.keyCode === 13) {
      // 検索メソッド
    }
  }
}
```


src/components/Search.js

```js
// @flow
import React from 'react';
import styles from './styles/Search.css';

type Props = {
  value?: string;
  onChangeValue: () => void;
  onEnterSearch: () => void;
};

export const Search: FunctionalComponent<Props, *> = ({
  value = '',
  onChangeValue,
  onEnterSearch,
}) => (
  <div className={styles.search}>
    <input
      size="45"
      defaultValue={value}
      onChange={onChangeValue}
      onKeyUp={onEnterSearch}
    />
  </div>
);

```

検索ボタンを作る
---


components/AppContainer.js

```js
import React from 'react';
import { Search } from '../components/Search';
import { SubmitButton } from '../components/SubmitButton';

constructor(props) {
  super(props);
  this.state = {
    searchText: '',
    disabled: true,
  }
}

render() {
  const {
    disabled,
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
```

components/SubmitButton.js

```js
// @flow
import React from 'react';
import styles from './styles/SubmitButton.css';

type Props = {
  onSearch?: () => void;
  disabled?: boolean;
};

export const SubmitButton: FunctionalComponent<Props, *> = ({
  onSearch,
  disabled,
}) => (
  <button
    className={styles.button}
    onClick={onSearch}
    disabled={disabled}
  >
    検索
  </button>
);
```

検索内容を表示

```js
render() {
  const = {
    searchText,
    disabled,
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
    </div>
  );
}
```

Containerで入力した値をもとに、GitHub APIをCallする
---

AppContainer.js

```js

import React from 'react';
import { Search } from '../components/Search';
import { SubmitButton } from '../components/SubmitButton';
import styles from './styles/AppContainer.css';

import { fetchRepository } from '../actions/repositoryAction'; //追加

onSearch() {
  const text = this.value;
  this.setState({
    searchText: text,
  });
  fetchRepository(text).then((res) => {
    console.log('検索したデータ', res);
  });
}

onEnterSearch(e) {
  const self = this;
  // Enterで検索
  if (e.keyCode === 13) {
    self.onSearch();
  }
```

actions/repositoryAction.js

```js
import { EventEmitter } from 'events';

/**
* @return {Array<Object>} An array of repository fetched from GitHub API
*/

const key = '?client_id=b7a7f8cf2c77acf4f4c8&client_secret=5b8fb8b6b633f294aef29bb5520b8c766de157d9';

export function fetchRepository(id: string) {
  return fetch(`https://api.github.com/users/${id}/repos${key}`)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return console.log('res bad');
    }
  });
}

```


データの状態を管理するStoreを作る
---

```js
import { EventEmitter } from 'events';

class RepositoryStore extends EventEmitter {
  constructor() {
    super();
    this.repositoryList = [];
  }

  getRepository() {
    return this.repositoryList;
  }

  updateRepositoryList(repositoryList) {
    this.repositoryList = repositoryList;
    this.emit('changed');
  }
}

export default new RepositoryStore();

```

更新されたStoreのデータをsetStateでViewに反映

AppContainer.js

```js

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
      repositoryList: [], //追加
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
  }

  value = '';

  componentDidMount() {
    RepositoryStore.on('changed', () => {
      this.setState({ repositoryList: RepositoryStore.getRepository() });
    });
  }

  onSearch() {
    const text = this.value;
    this.setState({
      searchText: text,
    });
    fetchRepository(text).then((res) => {
      RepositoryStore.updateRepositoryList(res); //追加
    });
  }

}

```

更新されたデータを表示する
---

AppContainer.js

```js
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
      {repositoryList.map(v =>
        this.renderSearchResults(v),
      )}
    </div>
  );
}

```


並び替えボタンを作る

components/SortButton.js

```js
// @flow
import React from 'react';
import styles from './styles/SortButton.css';

type Props = {
  onClick: () => void;
  isLatest: boolean;
};

export const SortButton: FunctionalComponent<Props, *> = ({
  onClick,
  isLatest,
}) => (
  <button
    className={styles.sort}
    onClick={onClick}
  >
    {isLatest ? (
      <span>古い順に並び替える</span>
      ) : (
        <span>新しい順に並び替える</span>
      )
    }
  </button>
);

```

Storeで並び替え機能を作る
---

stores/repositoryStore

```js
import { EventEmitter } from 'events';

class RepositoryStore extends EventEmitter {
  constructor() {
    super();
    this.repositoryList = [];
    this.isLatest = true;
  }

  getRepository() {
    return this.repositoryList;
  }

  getOrderType() {
    return this.isLatest;
  }

  updateRepositoryList(repositoryList) {
    this.repositoryList = repositoryList;
    this.isLatest = true;
    this.emit('changed');
  }

  orderChange(repositoryList) {
    this.repositoryList = repositoryList.reverse();
    this.isLatest = !this.isLatest;
    this.emit('changed');
  }
}

export default new RepositoryStore();

```

containers/AppContainer.js

```js
import { SortButton } from '../components/SortButton';

constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      disabled: true,
      repositoryList: [],
      isLatest: true,  // 追加
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
    this.onClickChangeOrder = this.onClickChangeOrder.bind(this); // 追加
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

onClickChangeOrder() {
    const list = [...this.state.repositoryList];
    RepositoryStore.orderChange(list);
  }
```
