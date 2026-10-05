import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getGradeLevel } from '../utils/studentUtils';

export default function GradeBadge({ gpa }) {
  const { label, color, backgroundColor } = getGradeLevel(gpa);

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});