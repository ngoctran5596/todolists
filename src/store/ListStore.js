import { observable, action, computed, makeAutoObservable,runInAction } from "mobx";

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import _ from 'lodash'

import { v4 as uuidv4 } from 'uuid';

class List {
  value
  done

  constructor(value) {
    this.id = new Date().toString()
    this.createdAt = _.now()
    this.value = value
  }
}

class ListStore {

  lists = [];
  setModal = false;
  taskDetail = [];

  constructor() {
    makeAutoObservable(this, {
      addList: action.bound,
      deleteList: action.bound,
      editField: action.bound,
      modalField: action.bound,
      getData: action.bound,
      sortLists:action.bound,
    })
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@item')
      if (value !== null) {
        runInAction(()=>{
          this.lists = JSON.parse(value)
        })
      }
    } catch (e) {
      
    }
  }

  addList = async (value) => {
    if (value.priority === "Importance") {
      let newList = [...this.lists];
      newList.unshift(new List(value));
      this.lists = newList;
      try {
        await AsyncStorage.setItem('@item', JSON.stringify(newList))
      } catch (e) {
        console.log('Loi local')
      }
    } else {
      let newList = [...this.lists];
      newList.push(new List(value));
      this.lists = newList;
      try {
        await AsyncStorage.setItem('@item', JSON.stringify(newList))
      } catch (e) {
        console.log('Loi local')
      }
    }

  }

  editField = (id) => {
    this.taskDetail = this.lists.filter(t => t.id === id)
  }
  modalField = () => {
    this.setModal = !this.setModal;
  }

  deleteList = async(id) => {
    this.lists = this.lists.filter(t => t.id !== id);
    try {
      await AsyncStorage.setItem('@item', JSON.stringify(this.lists))
    } catch (e) {
      console.log('Loi local')
    }
  }

  get getEnemy() {
    return computed(() => this.taskDetail).get();
  }
  get taskDetail() {
    return computed(() => this.taskDetail).get();
  }

  filteredLists() {
    return this.lists.sort((a, b) => (a.sort > b.sort) ? 1 : ((b.sort > a.sort) ? -1 : 0));
  }

  sortLists() {
    return this.lists = _.sortBy(this.lists , function(o){ return o.id });
  }


}

export default new ListStore();

