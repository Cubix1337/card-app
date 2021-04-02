import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native'

// Screens
import Home from './Screens/Home'
import QRScreen from './Screens/QR'
import CardsLibrary from './Screens/CardsLibrary'
import Scanner from './Screens/Scanner'

// Contexts
import { CardsContext } from './Context'
import { View, Text } from 'react-native';
// import { UserContext } from './Context'

const Tab = createMaterialTopTabNavigator();

const cards = [
    { id: 0, name: 'Tony', company: 'Gamesys', jobTitle: 'Dev', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1w0wvk5J7oif7X9iT_8gyNWo3hgyRv2F9QSaDpnZeCWdD4caGjux7LrXVQ&usqp=CAc' },
    { id: 1, name: 'Steve', company: 'Airbnb', jobTitle: 'Dev', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1w0wvk5J7oif7X9iT_8gyNWo3hgyRv2F9QSaDpnZeCWdD4caGjux7LrXVQ&usqp=CAc' }
]

const Header = styled(View)`
background: red
display: flex
justify-content: space-around
align-items: center
height: 100px
`


const App = () => {    
    const [data, setData] = useState(cards)
    const set = (arg) => setData([...data, {id:data.length,...arg}])  
    const remove = (arg) => {    
        let search = data.findIndex(element=>element.id===arg)         
        let spliced = data.splice(search,1)
        console.log(spliced)
        
        setData(spliced)   
    }  
   
    useEffect(()=>{
        //console.log(data,'data changed')

    },[data])

    return (
        <CardsContext.Provider value={{
            data,
            set, 
            remove
            }}>
                <Header>
<Text>Header</Text>
                </Header>
             <NavigationContainer>
            <Tab.Navigator tabBarPosition={'bottom'} custom={{ name: 'tony' }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Scanner" component={Scanner} />                
                <Tab.Screen name="QR" component={QRScreen} />   
                <Tab.Screen name="Library" component={CardsLibrary} />
            </Tab.Navigator>
        </NavigationContainer>
      
        </CardsContext.Provider>    
           
    )
}

export default App