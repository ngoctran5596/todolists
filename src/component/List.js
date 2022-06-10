import { StyleSheet, Image, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import listStore from '../store/ListStore';
import { observer } from 'mobx-react';
import moment from 'moment'
import { toJS } from 'mobx'
const List = (props) => {
  const { deleteList, editField, modalField, getData } = listStore;


  const { value, id, createdAt } = props.list

  const date = moment(createdAt).format('DD-MM-YYYY');
  const hours = moment(createdAt).format('HH:mm');

  return (

    <View style={[styles.mainCardViewRed, (value.priority === "Normal") && styles.mainCardView]}>
      <View style={styles.cardContainer}>
        <View style={styles.subCardView}>
          <Image
            source={{ uri: value.path }}
            resizeMode="contain"
            style={styles.image}
            alt="Avatar me"
          />
        </View>
        <View style={styles.mrL}>
          <Text style={styles.textValue} >
            {value.title}
          </Text>
          <Text style={styles.textP} >
            Date : <Text style={styles.textTime}>{date}</Text>
          </Text>
          <Text>
            Hours : <Text style={styles.textTime}>{hours}</Text>

          </Text>
        </View>
      </View>
      <View style={{}}>
        <TouchableOpacity
          onPress={() => deleteList(id)}
          style={styles.btn}>
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>

      </View>


    </View>

  );

}

export default observer(List)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textTime: {
    fontWeight: 'bold'
  },
  text: {
    fontWeight: '600',
    color: 'white'
  },
  textP: {
    fontWeight: '400'
  },
  btnEd: {
    height: 50,
    borderWidth: 0,
    width: 100,
    marginBottom: 5,

    marginLeft: -26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#33CCFF'
  },

  mrL: {
    marginLeft: 12
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    borderRadius: 40,
    height: 40,
    width: 40,
  },
  mainCardView: {
    backgroundColor: 'white'
  },
  mainCardViewRed: {
    // height: 150,
    // width:'95%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCCFF',
    borderRadius: 10,
    shadowColor: '#cccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    // marginLeft: 16,
    // marginRight: 16,
  },


  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    // height: 50,
    backgroundColor: '#FF9999',
    // borderWidth: 0,
    // width: 100,
    // marginBottom: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,

    marginLeft: -26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textValue: {
    width: 130,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  }
})