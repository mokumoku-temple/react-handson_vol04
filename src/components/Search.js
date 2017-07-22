// @flow
import React from 'react';
import styles from './styles/Search.css';

type Props = {}

export const Search: FunctionalComponent<Props, *> = ({

}) => (
  <div className={styles.search}>
    <input
      size='45'
      defaultValue=''
    />
  </div>
)
