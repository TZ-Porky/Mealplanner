import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/AppStyles';
//const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blankBackground,
  },
  header: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  preHeader: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 28,
    color: Colors.primaryOrange,
    marginBottom: 2,
  },
  field: {
    marginBottom: 0,
  },
  inputContainer: {
    margin: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  icon: {
    marginRight: 10,
  },
  p:
  {
    textAlign: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  fieldsets: {
    flex: 7,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  pPassword:
  {
    position: 'relative',
    textAlign: 'left',
    padding: 5,
    textDecorationLine: 'underline',
    right: -100,
    bottom: 6,
  },
  link: {
    padding: 9,
    color: Colors.primaryOrange,
    fontSize: 16,
    fontWeight: '700',
  },
  pAuth: {
    paddingVertical: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    gap: 25,
    alignItems: 'center',
  },
  subtitle:
  {
    paddingVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'bottom',
  },
  power:
  {
    color: Colors.primaryOrange,
    fontWeight: '700',
  },
  rowAuth: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default styles;
