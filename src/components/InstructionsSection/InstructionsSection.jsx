// src/components/InstructionsSection/InstructionsSection.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './InstructionsSectionStyles';

const InstructionsSection = ({ instructionsList }) => {
  return (
    <View>
      {instructionsList.map((step, index) => (
        <View key={step.id} style={[styles.stepContainer, index === instructionsList.length - 1 && styles.lastStep]}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumber}>Step {step.stepNumber}</Text>
            <Text style={styles.stepTime}>{step.time}</Text>
          </View>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default InstructionsSection;
