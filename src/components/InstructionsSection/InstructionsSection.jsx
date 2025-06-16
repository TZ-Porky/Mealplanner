import React from 'react';
import { View, Text } from 'react-native';
import styles from './InstructionsSectionStyles';

const InstructionsSection = ({ instructionsList = [] }) => {

  if (instructionsList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune instruction disponible.</Text>
      </View>
    );
  }

  return (
    <View>
      {instructionsList.map((description, index) => (
        <View
          key={`instruction-${index}`}
          style={[styles.stepContainer, index === instructionsList.length - 1 && styles.lastStep]}
        >
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumber}>Étape {index + 1}</Text>
          </View>
          <Text style={styles.stepDescription}>{description}</Text>
        </View>
      ))}
    </View>
  );
};

export default InstructionsSection;
