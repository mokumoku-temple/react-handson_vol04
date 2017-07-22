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
