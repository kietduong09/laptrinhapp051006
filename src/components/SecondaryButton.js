import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

// Nút viền. Dùng `danger` cho hành động nguy hiểm như Xóa.
export default function SecondaryButton({ title, onPress, danger = false, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        danger && styles.dangerButton,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.title, danger && styles.dangerTitle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dangerButton: {
    borderColor: colors.danger,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  dangerTitle: {
    color: colors.danger,
  },
});
