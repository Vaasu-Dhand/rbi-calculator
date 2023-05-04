import { FC } from 'react';

import * as Styled from './styles';
import { useStore } from '../../hooks/useStore';

export const Display: FC = (props) => {
  const {
    state: { primaryExpression, secondaryExpression },
  } = useStore((state) => state.calculator);

  console.log(props);
  return (
    <Styled.Screen>
      {/* TODO: Both of these would format big numbers */}
      <Styled.SecondaryScreen>{secondaryExpression}</Styled.SecondaryScreen>
      <Styled.PrimaryScreen>{primaryExpression}</Styled.PrimaryScreen>
    </Styled.Screen>
  );
};
