import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Step1 from '../screens/SetupScreens/StepAboutYourself';
import Step2 from '../screens/SetupScreens/StepAboutFamily';
import Step3 from '../screens/SetupScreens/StepAboutMeals';
import Step4 from '../screens/SetupScreens/StepFinishUp';

const Stack = createNativeStackNavigator();

const SetupNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="SetupStep1" component={Step1} />
        <Stack.Screen name="SetupStep2" component={Step2} />
        <Stack.Screen name="SetupStep3" component={Step3} />
        <Stack.Screen name="SetupStep4" component={Step4} />
    </Stack.Navigator>
);

export default SetupNavigator;
