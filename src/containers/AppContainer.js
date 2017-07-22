import React from 'react';
import styles from './styles/AppContainer.css';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.container}>
        Hello, World!
      </div>
    );
  }
}
