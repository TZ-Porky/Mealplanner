import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {Colors} from '../../styles/AppStyles';

const Button = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
  outlined = false,
  size = 'medium',
  height = 300,
}) => {

  const getSizeStyle = buttonSize => {
    switch (buttonSize) {
      case 'small':
        return {paddingVertical: 8, paddingHorizontal: 16};
      case 'large':
        return {paddingVertical: 20, paddingHorizontal: 32};
      case 'medium':
      default:
        return {paddingVertical: 15, paddingHorizontal: 24};
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        getSizeStyle(size),
        buttonStyle,
        outlined && styles.outlineStyle,
        pressed && (outlined ? null : styles.pressed),
        disabled && styles.disabled,
      ]}
      disabled={disabled}>
      <Text style={[styles.text, textStyle, outlined && styles.textOutline]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    backgroundColor: Colors.buttonPrimary,
    padding: 15,
    borderRadius: 10,
    borderColor: Colors.buttonBorder,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  outlineStyle: {
    borderColor: Colors.primaryOrange,
    backgroundColor: 'transparent',
    borderWidth: 3,
  },
  text: {
    color: Colors.textLight,
    fontSize: 22,
    fontWeight: 'bold',
  },
  textOutline: {
    color: Colors.primaryOrange,
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
