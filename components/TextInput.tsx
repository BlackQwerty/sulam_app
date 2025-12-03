import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
}

export default function TextInput({ placeholder, style, ...props }: CustomTextInputProps) {
  return (
    <RNTextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#333',
    width: '100%',
  },
});