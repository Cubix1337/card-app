import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Text, View, Button } from 'react-native';

const Home = ({ navigation }) => {
    // const user = useContext()
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <Text>Home</Text>
            <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
        </View>
    )
}

export default Home