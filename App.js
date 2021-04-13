import React, { useState, useEffect, useRef } from 'react';
import Constants from "expo-constants";
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native'
import Ionicons from '@expo/vector-icons/Ionicons'

// Screens
import Home from './Screens/Home'
import QRScreen from './Screens/QR'
import CardsLibrary from './Screens/CardsLibrary'
import Scanner from './Screens/Scanner'

// Contexts
import { CardsContext, SnackbarContext } from './Context'
import { View, Text, Touchable, Button } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import fetch from 'node-fetch';

const Tab = createMaterialTopTabNavigator();

const HeaderComponent = (props) => {
    const { dispatch } = props

    return (
        <Header>
            <TouchableOpacity onPress={() => dispatch && dispatch(DrawerActions.toggleDrawer())}>
                <Ionicons name={'menu'} size={30} color={'blue'} />
            </TouchableOpacity>
        </Header>
    )
}

const Header = styled(View)`
background: red
display: flex
justify-content: space-around
height: 80px
`

const QRStack = createStackNavigator();

const QRStackScreen = () => {
    return (
        <QRStack.Navigator>
            <QRStack.Screen name="Scanner" component={Scanner} />
        </QRStack.Navigator>
    );
}

const ImportScreen = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true);

    const handleFetch = async () => {
        const { manifest } = Constants;
        const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
            ? manifest.debuggerHost.split(`:`).shift().concat(`:8080/rest`)
            : `api.example.com`

        let response = await fetch(`http://${api}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json()
        setData(json)
    }

    useEffect(() => {
        try {
            fetch('https://rickandmortyapi.com/api/character/1,2', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(json => setData(json))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])
    return (
        <View>
            {isLoading
                ? <Text>Loading...</Text>
                // : console.log(data)
                : data.map((item, key) => {
                    // console.log(item)
                    return (
                        <View key={key}>
                            <Text >{item.name}</Text>
                            <Button onPress={handleFetch} title={'fetch'} />
                        </View>
                    )
                })
            }
        </View>
    )
}

const Drawer = createDrawerNavigator();

const HomeTabScreen = () => {
    return (
        <>
            <Tab.Navigator
                tabBarPosition={'bottom'}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    labelStyle: { color: 'red', fontSize: 14 },
                    showIcon: true
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={QRScreen}
                    options={{ tabBarIcon: () => <Ionicons name={'home'} size={30} color={'blue'} /> }}
                />
                <Tab.Screen
                    name="Library"
                    options={{ tabBarIcon: () => <Ionicons name={'albums'} size={30} color={'blue'} /> }}
                    component={CardsLibrary}
                />
                <Tab.Screen
                    name="QR"
                    component={Scanner}
                    options={{ tabBarIcon: () => <Ionicons name={'camera'} size={30} color={'blue'} /> }}
                />
            </Tab.Navigator>
        </>
    )
}

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate('Home', { screen: 'Home' })}
            />
            <DrawerItem
                label="Library"
                onPress={() => props.navigation.navigate('Home', { screen: 'Library' })}
            />
            <DrawerItem
                label="QR"
                onPress={() => props.navigation.navigate('Home', { screen: 'QR' })}
            />
            <DrawerItem
                label="Import"
                onPress={() => props.navigation.navigate('Import')}
            />

            <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
            />
        </DrawerContentScrollView>
    );
}

const SnackbarStack = (content) => {
    const [visible, setVisible] = useState(false)    

    useEffect(() => {
        setVisible(!visible)
        // console.log('content', content)
    }, [content])

const setText = (content) => {
    if(content.action === 'remove'){
        return `${content.name} was removed.`
    }
    if(content.action === 'add'){
        return `${content.name} was added.`
    }    
}

    return (
        <Snackbar
            visible={visible}
            onDismiss={() => setVisible(!visible)}
            //miliseconds
            duration={2000}
            // action={{
            //     label: 'Acknowledge',
            //     onPress: () => {
            //         console.log('acknowledged')
            //         setVisible(!visible)
            //     },
            // }}
            theme={{ colors: { onSurface: "red", surface: 'blue' } }}
        >
            {setText(content)}        
        </Snackbar>
    )
}

const App = () => {
    const [data, setData] = useState([])
    const [content, setContent] = useState('')
    const navigationRef = useRef(null);
    const [navLoading, setNavLoading] = useState(true)

    const set = (arg) => setData([...data, { id: data.length, ...arg }])

    const remove = (arg) => {
        let search = data.findIndex(element => element.id === arg)
        setContent({...data[search],action:'remove'})
        data.splice(search, 1)
        setData([...data])        
    }

    useEffect(() => {
        // console.log(data, 'data changed')

    }, [data])

    useEffect(() => {
        setNavLoading(!navLoading)
    }, [])

    return (
        // <CardsContext.Provider value={{
        //     data,
        //     set,
        //     remove
        // }}>
        <NavigationContainer ref={navigationRef}>
            <HeaderComponent {...navigationRef.current} />
            <SnackbarContext.Provider value={{
                content,
                setContent,
            }}>
                <SnackbarStack {...content} />
                <CardsContext.Provider value={{
                    data,
                    set,
                    remove
                }}>
                    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />} >
                        <Drawer.Screen name="Home" component={HomeTabScreen} />                    
                        <Drawer.Screen name="Import" component={ImportScreen} />
                    </Drawer.Navigator>
                </CardsContext.Provider>
            </SnackbarContext.Provider>
        </NavigationContainer>        
    )
}

export default App