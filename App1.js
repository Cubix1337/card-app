import React, {useState} from 'react';
import styled from 'styled-components/native';
import { View, Text, Button } from 'react-native';

import PressableButton from './Components/PressableButton'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <Container>
      <Title color="palevioletred">Expo with 💅 Styled Components</Title>
      <Title color="chocolate">iOS • Android • web</Title>
      <Title color="rebeccapurple">{count}</Title>

      <PressableButton 
      onPress={()=>setCount(count+1)}
      title='Increment' 
      bg='green'   
      />
      <PressableButton 
      onPress={()=>setCount(count-1)}
      title='Decrement'
      bg='red'
      />     
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const Buttons = styled(Button)`
font-size: 20px;
color: red;
background-color: black;
`;
