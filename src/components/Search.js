// @flow
import React from 'react';
import styles from './styles/Search.css';

type Props = {
  value?: string;
  onChangeValue?: () => void;
}

export const Search: FunctionalComponent<Props, *> = ({
  value,
  onChangeValue,
}) => (
  <div className={styles.search}>
    <input
      size='45'
      defaultValue={value}
      onChange={onChangeValue}
    />
  </div>
)
