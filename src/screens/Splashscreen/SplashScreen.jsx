// -------------------------------------------------------------- //
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import styles from './SplashScreenStyle';
// -------------------------------------------------------------- //

const SplashScreen = () => {

    const navigation = useNavigation();

    /*
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Auth');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);
    */

    // -------------------------------------------------------------- //
    // Fonctions
    // -------------------------------------------------------------- //


    return (
    <View style={styles.container}>
      <Text style={styles.header}> SMART COOKING </Text>
    </View>
  );
};

export default SplashScreen;
