import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
    Container:
    {
        backgroundColor: Colors.primary,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    h1:
    {
        color: Colors.textPrimary,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 5,
    },
    p:
    {
        color: Colors.textPrimary,
        fontSize: 13,
        textAlign: 'center',
        padding: 10,
    },
    HoverContainer:
    {
        position: 'relative',
        top: 250,
        backgroundColor: Colors.background,
        height: '100%',
        padding: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    StarterMessageContainer:
    {
        position: 'relative',
        top: 200,
        display: 'flex',
        alignItems: 'center',
    },
    ImageContainer:
    {
        width: 261,
        height: 319,
        objectFit: 'fill',
    },
});

export default styles;
