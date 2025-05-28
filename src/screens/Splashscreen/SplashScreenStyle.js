import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../styles/AppStyles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryOrange,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 30,
        color: Colors.textLight,
    },
});

export default styles;
