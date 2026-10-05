import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';
import { formatGpa, getInitial } from '../utils/studentUtils';
import GradeBadge from './GradeBadge';

export default function StudentCard({ student, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitial(student.fullName)}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {student.fullName}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          {student.studentCode}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          Lớp {student.className}
        </Text>
      </View>

      <View style={styles.scoreColumn}>
        <Text style={styles.gpa}>{formatGpa(student.gpa)}</Text>
        <GradeBadge gpa={student.gpa} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: {
    opacity: 0.8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  detail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 1,
  },
  scoreColumn: {
    alignItems: 'flex-end',
    gap: 6,
  },
  gpa: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
});
