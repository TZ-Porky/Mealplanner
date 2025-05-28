import {StyleSheet} from 'react-native';
import {Colors} from '../styles/AppStyles';

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.primaryOrange,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: Colors.textLight,
    borderWidth: 3,
    backgroundColor: Colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default styles;
