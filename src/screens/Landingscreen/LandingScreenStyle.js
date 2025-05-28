import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/AppStyles';

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        gap: 10,
        backgroundColor: Colors.blankBackground,
    },
    coverImage:
    {
        flex: 1.2,
        width: 'auto',
        objectFit: 'cover',
    },
    downContainer:
    {
        flex: 2,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1:
    {
        fontSize: 30,
        fontWeight: '900',
    },
    p:
    {
        paddingVertical: 20,
        paddingHorizontal: 30,
        fontSize: 14,
        textAlign: 'center',
    },
    link:
    {
        padding: 10,
        color: Colors.primaryOrange,
        fontSize: 16,
        fontWeight: '700',
    },
    pAuth:
    {
        paddingVertical: 10,
        fontSize: 14,
        textAlign: 'center',
    },
    row:
    {
        padding: 10,
        flexDirection: 'row',
        gap: 25,
    },
});

export default styles;
