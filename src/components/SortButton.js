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
