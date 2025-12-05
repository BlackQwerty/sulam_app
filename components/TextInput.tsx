import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  isPassword?: boolean;
}

export default function TextInput({ placeholder, style, isPassword = false, secureTextEntry, ...props }: CustomTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isSecure = isPassword || secureTextEntry;

  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={isSecure && !showPassword}
        autoComplete={isSecure ? 'password' : undefined}
        textContentType={isSecure ? 'password' : undefined}
        {...props}
      />
      {isSecure && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
          activeOpacity={0.7}
        >
          {showPassword ? (
            <EyeOff size={20} color="#666" />
          ) : (
            <Eye size={20} color="#666" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 15,
    color: '#333',
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});