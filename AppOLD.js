import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Components
import PressableButton from './Components/PressableButton'

// Screens
import QRScreen from './Screens/QR'
import CardsLibrary from './Screens/CardsLibrary'

//Context
// import { TestContext } from './Context'


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState([])
  // const Stack = createStackNavigator(); 

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const Tab = createMaterialTopTabNavigator();

  const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>

        <View style={{
          bottom: 0,
          flexDirection: 'row',
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>

          {/* <Button
          onPress={() => navigation.navigate('QR')}
          title="Go to QR"
        />
        <Button
          onPress={() => {
            navigation.navigate('Library', {
              cards: []             
            })
          }}
          title="Go to Card Library"
        />
              <PressableButton onPress={()=>alert('hello')} bg={'red'} title={"Test1"}/>
              {/* <Button title="Test2"/> */}
          {/* <Text>I am at the bottom?</Text> */}
        </View>
      </View>
    )
  }

  return (
    // <TestContext.Provider value={data.length > 0 && JSON.parse(data)}>
    <NavigationContainer>     
      <Tab.Navigator tabBarPosition={'bottom'} custom={{name:'tony'}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="QR" component={QRScreen} />
        <Tab.Screen name="Library" component={CardsLibrary} />
      </Tab.Navigator>
    </NavigationContainer>
    // </TestContext.Provider>
  )


  // <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Home" component={HomeScreen} />
  //     <Stack.Screen name="QR" component={QRScreen} />
  //     <Stack.Screen name="Library" component={CardsLibrary} />
  //   </Stack.Navigator>
  // </NavigationContainer>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});