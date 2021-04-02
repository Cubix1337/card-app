import React from 'react'
import styled from 'styled-components/native'
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native'

const Wrapper = styled(View)`
border-color: black
background-color: ${props=> props.selected ? 'green' : 'white'}
border-width: 1px
display: flex

flex-direction: row
`

const ImageWrapper = styled(View)`
left: 0
`

const TextWrapper = styled(View)`
padding: 20px
`

const testImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1w0wvk5J7oif7X9iT_8gyNWo3hgyRv2F9QSaDpnZeCWdD4caGjux7LrXVQ&usqp=CAc'

const Card = (props) => {   
    return (
       
            <Wrapper selected={props.selected}>

            <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: props.logo || 'https://atlncs.org/wp-content/themes/ancs-sixteen/images/img_headshot.png' }} />
           
            <TextWrapper>
            
            <Text>{props.name}</Text>
            <Text>{props.jobTitle}</Text>
                <Text>{props.company}</Text>
                                           
            </TextWrapper>
           

        </Wrapper>
      
    )
}

export default Card