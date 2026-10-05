import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradeBadge from '../components/GradeBadge';
import InfoRow from '../components/InfoRow';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { colors } from '../styles/colors';
import { formatGpa, getInitial } from '../utils/studentUtils';

export default function StudentDetailScreen({ navigation, route, students, onDeleteStudent }) {
  const insets = useSafeAreaInsets();
  const student = students.find((item) => item.id === route.params.studentId);

  // Sau khi xóa, sinh viên không còn trong danh sách nên không có gì để hiển thị.
  if (!student) {
    return null;
  }

  const handleDelete = () => {
    Alert.alert('Xóa sinh viên', `Bạn có chắc chắn muốn xóa sinh viên "${student.fullName}"?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          onDeleteStudent(student.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: 24 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial(student.fullName)}</Text>
        </View>
        <Text style={styles.name}>{student.fullName}</Text>
        <Text style={styles.code}>{student.studentCode}</Text>

        <View style={styles.scoreRow}>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>GPA</Text>
            <View style={styles.scoreValue}>
              <Text style={styles.gpa}>{formatGpa(student.gpa)}</Text>
            </View>
          </View>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Xếp loại</Text>
            <View style={styles.scoreValue}>
              <GradeBadge gpa={student.gpa} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="Mã sinh viên" value={student.studentCode} />
        <InfoRow label="Họ tên" value={student.fullName} />
        <InfoRow label="Ngày sinh" value={student.dateOfBirth} />
        <InfoRow label="Giới tính" value={student.gender} />
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Số điện thoại" value={student.phone} />
        <InfoRow label="Lớp" value={student.className} />
        <InfoRow label="Khoa" value={student.faculty} isLast />
      </View>

      <PrimaryButton
        title="Chỉnh sửa"
        onPress={() => navigation.navigate('EditStudent', { studentId: student.id })}
      />
      <SecondaryButton
        title="Xóa sinh viên"
        danger
        onPress={handleDelete}
        style={styles.deleteButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  code: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scoreRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  scoreBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  scoreLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  scoreValue: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpa: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  deleteButton: {
    marginTop: 12,
  },
});