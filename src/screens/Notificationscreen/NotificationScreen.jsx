import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './NotificationScreenStyle';
import Notification from '../../models/Notification';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      setLoading(false);
      return;
    }
    // Écoute les notifications de l'utilisateur courant
    const unsubscribe = firestore()
      .collection('notifications')
      .where('userId', '==', user.uid)
      .orderBy('dateCreation', 'desc')
      .onSnapshot(snapshot => {
        const notifList = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          notifList.push({
            id: doc.id,
            ...data,
          });
        });
        setNotifications(notifList);
        setLoading(false);
      }, () => setLoading(false));
    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (notifId) => {
    await firestore().collection('notifications').doc(notifId).update({ lue: true });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Chargement des notifications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationItem, item.lue && styles.notificationRead]}
            onPress={() => handleMarkAsRead(item.id)}
          >
            <Text style={styles.notificationTitle}>{item.titre}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationDate}>{new Date(item.dateCreation).toLocaleString()}</Text>
            {!item.lue && <Text style={styles.unreadBadge}>Non lu</Text>}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune notification</Text>}
      />
    </View>
  );
};

export default NotificationScreen;