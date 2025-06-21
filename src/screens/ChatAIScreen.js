import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ChatAIScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', from: 'ai', text: 'Salut ! Pose-moi une question sur tes repas ou ton planning.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const prompt = `Réponds en tant que diététicien. Voici la question de l'utilisateur : ${userMessage.text}`;
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // remplace par ta clé
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { id: Date.now().toString(), from: 'ai', text: aiResponse }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now().toString(), from: 'ai', text: 'Erreur IA 😓' }]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.message, item.from === 'user' ? styles.userMsg : styles.aiMsg]}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }}
      />
      {loading && <ActivityIndicator size="small" color="#555" />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pose ta question..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatAIScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  message: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#D1E7DD',
  },
  aiMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8D7DA',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  sendBtn: {
    backgroundColor: '#F57C00',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 8,
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold',
  },
});