import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MessageList from './app/components/MessageList';
import Toolbar from './app/components/Toolbar';
import KeyboardState from './app/components/KeyboardState';
import MeasureLayout from './app/components/MeasureLayout';
import ActionBar from './app/components/ActionBar';
import MessagingContainer, {
  INPUT_METHOD,
} from './app/components/MessagingContainer';
import {createTextMessage} from './app/utils/MessageUtils';

export default class App extends Component {
  state = {
    messages: [createTextMessage('Hi Guest'), createTextMessage('How are you')],
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
  renderToolbar() {
    const {isInputFocused} = this.state;
    return (
      <View style={styles.toolbar}>
        <Toolbar isFocused={isInputFocused} onSubmit={this.handleSubmit} />
      </View>
    );
  }
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
