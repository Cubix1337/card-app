import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight } from 'react-native'
import { Button, Searchbar } from 'react-native-paper';
import styled from 'styled-components/native'
import { CardsContext } from '../../Context'
import Card from '../../Components/Cards'

const Cards = (props) => {
    const [filtered, setFiltered] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([])
    const { data, remove } = useContext(CardsContext)

    const handleDelete = () => {
        selected.forEach(item=> {
            remove(item);          
        })
        selected.clear()        
    }

    const handleCardPress = (id) => {              
        if(selected.size > 0){
            if(selected.has(id)){                
                selected.delete(id)
                setSelected(new Set([...selected]))
            } else{
                setSelected(new Set([...selected,id]))
            }            
        } else {
            setSelected(new Set([id]))
        }             
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        filter(query)
    }

    useEffect(() => {
        setFiltered([...data])
    }, [data])
    

    const filter = (query) => {
        const result = data.filter(value =>
            value.name.includes(query) ||
            value.company.includes(query) ||
            value.jobTitle.includes(query)
        )
        setFiltered(result)
    }

    return (
        <Wrapper>
            {selected.size > 0 && <Button compact={true} onPress={() => handleDelete()}>Delete {selected.size} item(s).</Button>}                       
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            // style={{borderRadius:6, borderColor:'black'}}
            />
            <ScrollableArea>
                {filtered && filtered.map((card) =>
                    <MainArea key={card.id}>
                        <TouchableHighlight
                            onPress={() => handleCardPress(card.id)}
                            underlayColor={'white'}>
                                <>
                                <Card {...card} selected={selected.size > 0 && selected.has(card.id)} />
                            
                            </>
                        </TouchableHighlight>
                    </MainArea>)}
            </ScrollableArea>
        </Wrapper>
    )
}

const Wrapper = styled(View)`
padding-top: 0px

`

const MainArea = styled(View)`
background:green

`
const ScrollableArea = styled(ScrollView)`
background:white;
`

export default Cards