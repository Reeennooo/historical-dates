import {FC, memo, ReactNode} from 'react';
import styles from './container.module.scss';

interface ContainerProps {
  children: ReactNode
}

export const Container: FC<ContainerProps> = memo((props) => {
  const {children} = props;
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
});