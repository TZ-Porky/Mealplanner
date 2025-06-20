/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import GooglePlacesService from '../../services/GooglePlacesServices'; // Assurez-vous que ce service est correctement configuré

const MarketModal = ({market, visible, onClose, onComment}) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    if (comment.trim() && onComment) {
      onComment(market, comment.trim());
      setComment('');
    }
  };

  const openDirections = () => {
    if (!market) {return;}

    const {lat, lng} = market.geometry.location;
    const url = Platform.select({
      ios: `maps://app?daddr=${lat},${lng}`,
      android: `google.navigation:q=${lat},${lng}`,
    });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Fallback vers Google Maps web
        const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        Linking.openURL(webUrl);
      }
    });
  };

  const openWebsite = () => {
    if (market?.website) {
      Linking.openURL(market.website);
    }
  };

  const callPhone = () => {
    if (market?.formatted_phone_number) {
      const phoneUrl = `tel:${market.formatted_phone_number}`;
      Linking.openURL(phoneUrl);
    }
  };

  if (!market) {return null;}

  const photoUrl = GooglePlacesService.getPhotoUrl(market);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {photoUrl && (
              <Image
                source={{uri: photoUrl}}
                style={styles.marketImage}
                resizeMode="cover"
              />
            )}

            <Text style={styles.marketName}>{market.name}</Text>
            <Text style={styles.marketAddress}>{market.vicinity}</Text>

            {market.types && (
              <Text style={styles.marketTypes}>
                Type : {market.types.slice(0, 3).join(', ')}
              </Text>
            )}

            {market.rating && (
              <Text style={styles.marketRating}>
                Note : {market.rating} ⭐ ({market.user_ratings_total || 0}{' '}
                avis)
              </Text>
            )}

            {market.opening_hours && (
              <Text
                style={[
                  styles.openingStatus,
                  {color: market.opening_hours.open_now ? 'green' : 'red'},
                ]}>
                {market.opening_hours.open_now ? '🟢 Ouvert' : '🔴 Fermé'}{' '}
                actuellement
              </Text>
            )}

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={openDirections}>
                <Text style={styles.actionButtonText}>📍 Itinéraire</Text>
              </TouchableOpacity>

              {market.formatted_phone_number && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={callPhone}>
                  <Text style={styles.actionButtonText}>📞 Appeler</Text>
                </TouchableOpacity>
              )}

              {market.website && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={openWebsite}>
                  <Text style={styles.actionButtonText}>🌐 Site web</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.commentSection}>
              <Text style={styles.commentLabel}>Ajouter un commentaire :</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Partagez votre expérience..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={3}
              />
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {opacity: comment.trim() ? 1 : 0.5},
                ]}
                onPress={handleCommentSubmit}
                disabled={!comment.trim()}>
                <Text style={styles.submitButtonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕ Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  marketImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  marketName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  marketAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  marketTypes: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  marketRating: {
    fontSize: 14,
    color: '#f39c12',
    marginBottom: 5,
  },
  openingStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  commentSection: {
    marginTop: 10,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MarketModal;
