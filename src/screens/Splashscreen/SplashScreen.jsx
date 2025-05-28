// -------------------------------------------------------------- //
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import styles from './SplashScreenStyle';
import Logo from '../../../assets/icons/cooking-book-kitchen-alt.svg';
// -------------------------------------------------------------- //

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Land');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    // -------------------------------------------------------------- //
    // Fonctions
    // -------------------------------------------------------------- //


    return (
    <View style={styles.container}>
      <Logo width={152} height={184} fill={'#FFFFFF'}/>
      <Text style={styles.header}> SMART COOKING </Text>
      <Text style={styles.description}> A meal Planner powered by AI just for you</Text>
      <Text style={styles.subtitle}>
        Powered by <Text style={styles.power}>Gemini</Text>
      </Text>
    </View>
  );
};

export default SplashScreen;
