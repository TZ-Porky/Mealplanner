import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../styles/AppStyles';

const Button = ({ title, onPress, buttonStyle, textStyle, disabled = false, outlined = false }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        buttonStyle,
        outlined && styles.outlineStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle, outlined && styles.textOutline]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    backgroundColor: Colors.buttonPrimary,
    padding: 15,
    borderRadius: 10,
    borderColor: Colors.buttonBorder,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  outlineStyle: {
    backgroundColor: 'none',
    borderWidth: 3,
    elevation: 1,
  },
  text: {
    color: Colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textOutline: {
    color: Colors.textDark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  pressed: {
    backgroundColor: Colors.buttonPressed,
    elevation: 1,
  },
  disabled: {
    backgroundColor: Colors.buttonDisabled,
    elevation: 0,
  },
});

export default Button;
