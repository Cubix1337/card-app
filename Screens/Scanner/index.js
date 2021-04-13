import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Platform, Image } from 'react-native';
import PressableButton from '../../Components/PressableButton'
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native'
import { CardsContext, SnackbarContext } from "../../Context";

const DisplayContactCard = (props) => {
    const { name, company, jobTitle, setScanned } = props
    const { set } = useContext(CardsContext)
    const { setContent } = useContext(SnackbarContext)    

    return (
        <Wrapper>
            <ContactInfoContainer>
                <ContactImage                   
                    source={{ uri: 'https://atlncs.org/wp-content/themes/ancs-sixteen/images/img_headshot.png' }} />
                <ContactName>{name}</ContactName>
                <CompanyName>{company}</CompanyName>
                <Text>{jobTitle}</Text>
            </ContactInfoContainer>
            <ButtonContainer>
            <PressableButton title={'Scan Again'} onPress={() => setScanned(false)} bg={'red'} />               
            <PressableButton title={'Add to Library'} onPress={() => {set(props);setContent({name:props.name, action:'add'})}}  bg={'red'}/>                              
            </ButtonContainer>
        </Wrapper>
    )
}

const Scanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState([])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setData(data)
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            }
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            {scanned
                ? <DisplayContactCard {...JSON.parse(data)} setScanned={setScanned} />
                : <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />}
        </View>
    )
}


const Wrapper = styled(View)`
background: white
display: flex
justify-content: space-around
width: 100%
height: 100%
`

const ContactInfoContainer = styled(View)`
display: flex;
align-items: center
`

const ContactImage = styled(Image)`
height: 300px;
width: 300px;
margin-bottom: 20px;
`

const ContactName = styled(Text)`
font-size: 24px;
font-weight: bold;
`

const CompanyName = styled(Text)`
font-size: 20px;
`

const ButtonContainer = styled(View)`
display: flex;
margin-top: 20px;
flex-direction: row;
alignItems: center;
justifyContent: space-around;
width 100%;
`

export default Scanner