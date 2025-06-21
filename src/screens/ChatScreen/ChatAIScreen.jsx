/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  askAI,
  saveMessage,
  loadMessages,
  clearMessages,
} from '../../services/IAServices';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatAIScreen = () => {
  const [messages, setMessages] = useState();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const history = await loadMessages();
      if (history.length === 0) {
        setMessages([
          {
            id: '1',
            from: 'ai',
            text: 'Salut ! Pose-moi une question sur tes repas ou ton planning.',
          },
        ]);
      } else {
        setMessages(history);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) {
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      from: 'user',
      text: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    await saveMessage('user', userMessage.text);

    try {
      const aiResponse = await askAI(userMessage.text);

      const aiMessage = {
        id: Date.now().toString(),
        from: 'ai',
        text: aiResponse,
      };

      setMessages(prev => [...prev, aiMessage]);
      await saveMessage('ai', aiMessage.text); // 💾
    } catch (err) {
      const failMessage = {
        id: Date.now().toString(),
        from: 'ai',
        text: 'Erreur de réponse de l’IA 😓',
      };
      setMessages(prev => [...prev, failMessage]);
      await saveMessage('ai', failMessage.text); // 💾
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    await clearMessages();
    setMessages([
      {
        id: '1',
        from: 'ai',
        text: 'Historique vidé. Pose-moi une nouvelle question !',
      },
    ]);
    await saveMessage(
      'ai',
      'Historique vidé. Pose-moi une nouvelle question !',
    );
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.message,
        item.from === 'user' ? styles.userMsg : styles.aiMsg,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Conseiller Dietétique</Text>
        <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
          <Icon name="trash" size={20} color="#fff" />
          <Text style={styles.clearText}>Vider</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({animated: true})
        }
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 12, paddingBottom: 80}}
      />

      {loading && <ActivityIndicator size="small" color="#F57C00" />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pose ta question..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={!input.trim() || loading}
          style={[
            styles.sendBtn,
            (!input.trim() || loading) && {opacity: 0.5},
          ]}>
          <Text style={styles.sendText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatAIScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#F57C00',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  clearBtn: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,
    top: 7,
    padding: 5,
    borderRadius: 5,
  },
  clearText: {
    fontSize: 12,
    color: '#fff',
  },
  message: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 2,
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  aiMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
  },
  senderLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#555',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  sendBtn: {
    backgroundColor: '#F57C00',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
