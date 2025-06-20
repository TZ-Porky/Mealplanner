import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  notificationRead: {
    opacity: 0.5,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#888',
  },
  unreadBadge: {
    color: '#fff',
    backgroundColor: '#ff9800',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
});