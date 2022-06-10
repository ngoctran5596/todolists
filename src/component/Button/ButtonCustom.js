import { StyleSheet, Text,TouchableOpacity,Image, View } from 'react-native'
import React from 'react'

const ButtonText = (props) => {
    const {title,onPress,sourceImage} = props
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={sourceImage}/>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonText


const styles = StyleSheet.create({
    container:{
        // width:'95%',
        borderWidth: 1,
        borderColor: '#cacaca',
        // height: 60,
        backgroundColor:'#fff',
        // alignItems:'center',
        // justifyContent:'center',
        paddingVertical:16,
        borderRadius:8,
        marginBottom:10,
        paddingHorizontal: 15,
        height: 60,
        flexDirection:'row'
    },
    text: {
        // color: "#ffff",
        // fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal:10

    },
    image:{
      width:32,
      height:32
    }
})