import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Platform, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native'
import { CardsContext } from "../../Context";

const DisplayContactCard = (props) => {    
    const { name, company, jobTitle, setScanned } = props
    const {set} = useContext(CardsContext)

    return (
        <Wrapper>
            <Image            
            style={{ height: 200, width: 200 }}
            source={{ uri: 'https://atlncs.org/wp-content/themes/ancs-sixteen/images/img_headshot.png' }} />                        
            <Text>{name}</Text>
            <Text>{company}</Text>
            <Text>{jobTitle}</Text>
            <ButtonContainer>
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
            <Button title={'Add to Library'} onPress={() => set(props)} />
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
padding-top: 30px
display: flex
align-items: center
background: blue
width: 100%
height: 100%
`

const ButtonContainer = styled(View)`
position: absolute;
bottom: 0;
background: blue;
width 100%;
`

export default Scanner