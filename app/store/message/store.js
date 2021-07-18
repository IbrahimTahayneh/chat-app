import {action, observable, makeObservable} from 'mobx';
import {MESSAGES} from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MessagesStore {
  @observable messages = MESSAGES;

  constructor() {
    this.messages = JSON.parse(AsyncStorage.getItem('messages')) || MESSAGES;
    makeObservable(this);
  }

  @action addNewMessage(message) {
    this.messages.push(message);
    AsyncStorage.setItem('messages', JSON.stringify(this.messages));
  }
}

export default new MessagesStore();
