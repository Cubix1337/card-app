import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`  
elevation: 8;
border-radius: 10px;
padding-vertical: 20px;
padding-horizontal: 22px;
background-color: ${props => props.bg};  
`;
const ButtonText = styled.Text`
  font-family: sans-serif
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
const PressableButton = ({ onPress, bg, title }) => (
  <ButtonContainer onPress={onPress} bg={bg}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
export default PressableButton;