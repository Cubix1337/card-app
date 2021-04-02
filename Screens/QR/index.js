import React from 'react'
import SvgQRCode from 'react-native-qrcode-svg';
import styled from 'styled-components/native';
import { Text, View } from 'react-native'

const test = {
    name: 'Antonio Roig',   
    jobTitle: 'Developer',
    company: 'Antrosoft'
}

const test2 = {
    name: 'Maks Spogis',   
    jobTitle: 'CEO',
    company: 'Kakuyaki'
}

const Basic = () => {
    return (
        <>
        <Text>Tony</Text>
        <SvgQRCode size={200} value={JSON.stringify(test)} />
        </>
    )
}

const NotBasic = () => {
    return (
        <>
        <Text>Maks</Text>
        <SvgQRCode size={200} value={JSON.stringify(test2)} />
        </>
    )
}
const QRScreen = () => {
    return (
        <Wrapper>
            <Basic />
            <NotBasic/>
        </Wrapper>
    )
}

const Wrapper = styled(View)`
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `

export default QRScreen