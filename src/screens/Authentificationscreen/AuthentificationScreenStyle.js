import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/AppStyles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blankBackground,
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: Colors.primaryOrange,
  },
  stepBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    gap: 10,
  },
  stepBar: {
    width: 100,
    height: 5,
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
  },
  content: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelContainer: {
    position: 'relative',
    width: '90%',
    height: '80%',
    marginTop: 10,
    backgroundColor: Colors.panelBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    width: '100%',
    height: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.textLight,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    color: Colors.textLight,
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 2,
    fontSize: 16,
    color: '#333',
  },
  fieldsets: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: Colors.blankBackground,
  },
});

export default styles;
