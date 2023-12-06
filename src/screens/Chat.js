import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'
import config from '../../config'
const Chat = () => {
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const scrollViewRef = useRef();

  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () =>{
    try {
      setIsLoading(true);
      setMessages([...messages, { text: userInput, sender: 'user' }, { text: <ActivityIndicator size="small" color={COLORS.White} />, sender: 'gpt' }]);
      scrollViewRef.current.scrollToEnd({ animated: true });
      setUserInput('');
      const response = await axios.post(`http://${IPV4}:${PORT}/api/v1/user/chat`,{
        userInput: userInput
      })
      const data = response.data. data[0].text;
      if (data && data.length > 0) {
        const firstSentence = data.split('\n')[0];
        // setMessages([...messages, { text: userInput, sender: 'user' }, { text: firstSentence, sender: 'gpt' }]);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages.pop();
          return [...updatedMessages, { text: firstSentence, sender: 'gpt' }];
        });
        scrollViewRef.current.scrollToEnd({ animated: true });
      } else {
        console.error('No valid data in the response');
      }   
    }catch (error) {
      console.error('Error in handleSend function', error)
    }
  }

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>CHAT</Text>
        <ScrollView         
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: SPACING.space_18*2}}>
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            <Text style={{color: COLORS.White, fontSize: FONTSIZE.size_14, marginLeft: SPACING.space_16}}>{message.sender === 'user' ? "" : "Assistant"}</Text>
            <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.gptMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
          </React.Fragment>
        ))}
      </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput 
            value={userInput} 
            placeholder='Text here' 
            onChangeText={(text) => setUserInput(text)}
            placeholderTextColor={COLORS.White} 
            style={styles.inputBox}/>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSend}>
            <FontAwesome name="send" size={24} color={COLORS.White} />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Chat
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.Black,
    paddingTop: 40
  },
    headerText:{
      color: COLORS.White,
      fontSize: FONTSIZE.size_20,
      textTransform: 'uppercase',
      alignSelf: 'center',
      marginVertical: SPACING.space_10
    },
  inputContainer: {
    backgroundColor: COLORS.Grey,
    width: WIDTH*0.9,
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_18,
    paddingVertical: SPACING.space_10 - 8,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: SPACING.space_16,
    borderRadius: SPACING.space_16,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  inputBox: {
    flex: 1,
    color: COLORS.White,
    fontSize: FONTSIZE.size_16
  },
  buttonContainer: {
    marginLeft: SPACING.space_8,
  },
  userMessage: {
    backgroundColor: COLORS.Grey,
    padding: SPACING.space_8,
    borderRadius: 8,
    marginBottom: SPACING.space_8,
    marginRight: SPACING.space_8,
    alignSelf: 'flex-end',
    maxWidth: WIDTH * 0.7,
  },
  gptMessage: {
    backgroundColor: COLORS.RedRGBA0,
    padding: SPACING.space_8,
    borderRadius: 8,
    marginBottom: SPACING.space_8,
    marginLeft: SPACING.space_8,
    maxWidth: WIDTH * 0.7,
    minWidth: WIDTH*0.2
  },
  messageText: {
    color: 'white',
    fontSize: FONTSIZE.size_16
  },
})