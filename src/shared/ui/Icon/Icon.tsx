import {FC, memo, SVGAttributes} from 'react';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import ChevronRight from '../../assets/icons/chevron-right.svg';

export type IconList =
  | 'chevron-right'
  | 'chevron-left'

interface IProps {
  name: IconList;
  properties?: SVGAttributes<unknown>;
}


export const Icon: FC<IProps> = memo(function Icon(props) {
  const { name, properties = {} } = props;


  switch (name) {
    case 'chevron-right':
      return <ChevronRight {...properties} />;
    case 'chevron-left':
      return <ChevronLeft {...properties} />;
    default:
      return null;
  }
});