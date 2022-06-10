import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react';
import List from './List'

import listStore from '../store/ListStore';

const ListDisplay = () => {
  const { deleteList, lists, time,getData } = listStore;

  // console.log("time",time)
  useEffect(() => {
    getData();
  }, [])
  return (
    <ScrollView >
      {lists.map(list =>
        <List key={list.id}  list={list} deleteList={deleteList} />

      )}

    </ScrollView>
  )
}

export default observer(ListDisplay)


const styles = StyleSheet.create({})