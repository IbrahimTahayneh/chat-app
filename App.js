import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import KeyboardState from './components/KeyboardState';
import MeasureLayout from './components/MeasureLayout';
import ActionBar from './components/ActionBar';
import MessagingContainer, {
  INPUT_METHOD,
} from './components/MessagingContainer';
import {createImageMessage, createTextMessage} from './utils/MessageUtils';

export default class App extends Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
    ],
    isInputFocused: false,
    inputMethod: INPUT_METHOD.NONE,
  };
  handleChangeFocus = isFocused => {
    this.setState({isInputFocused: isFocused});
  };
  handleSubmit = text => {
    const {messages} = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };
  handleChangeInputMethod = inputMethod => {
    this.setState({inputMethod});
  };
  handlePressToolbarCamera = () => {
    this.setState({
      isInputFocused: false,
      inputMethod: INPUT_METHOD.CUSTOM,
    });
  };
  renderToolbar() {
    const {isInputFocused} = this.state;
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  handlePressToolbarLocation = () => {};
  handlePressMessage = ({id, type}) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const {messages} = this.state;
                this.setState({
                  messages: messages.filter(message => message.id !== id),
                });
              },
            },
          ],
        );
        break;
      default:
        break;
    }
  };
  renderMessageList() {
    const {messages} = this.state;
    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }
  renderInputMethodEditor() {
    return <View style={styles.inputMethodEditor} />;
  }
  render() {
    const {inputMethod} = this.state;
    return (
      <View style={styles.container}>
        <ActionBar />
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MessagingContainer
                  {...keyboardInfo}
                  inputMethod={inputMethod}
                  onChangeInputMethod={this.handleChangeInputMethod}
                  renderInputMethodEditor={this.renderInputMethodEditor}>
                  {this.renderMessageList()}
                  {this.renderToolbar()}
                </MessagingContainer>
              )}
            </KeyboardState>
          )}
        </MeasureLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
});
