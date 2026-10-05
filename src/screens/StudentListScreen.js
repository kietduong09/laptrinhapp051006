import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import StudentCard from '../components/StudentCard';
import { colors } from '../styles/colors';
import { filterStudents } from '../utils/studentUtils';

export default function StudentListScreen({ navigation, students }) {
  const [keyword, setKeyword] = useState('');
  const insets = useSafeAreaInsets();

  const visibleStudents = filterStudents(students, keyword);
  const isSearching = keyword.trim().length > 0;

  const openDetail = (student) => navigation.navigate('StudentDetail', { studentId: student.id });
  const openAddForm = () => navigation.navigate('AddStudent');

  const renderEmptyState = () => {
    if (students.length === 0) {
      return (
        <EmptyState
          icon="🎓"
          title="Chưa có sinh viên nào"
          message="Hãy thêm sinh viên đầu tiên để bắt đầu quản lý."
          actionTitle="Thêm sinh viên"
          onAction={openAddForm}
        />
      );
    }
    return (
      <EmptyState
        icon="🔍"
        title="Không tìm thấy sinh viên phù hợp."
        message="Hãy thử tìm bằng mã sinh viên hoặc họ tên khác."
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <SearchBar value={keyword} onChangeText={setKeyword} />
        <Text style={styles.summary}>
          {isSearching
            ? `Tìm thấy ${visibleStudents.length} / ${students.length} sinh viên`
            : `Tổng số: ${students.length} sinh viên`}
        </Text>
      </View>

      <FlatList
        data={visibleStudents}
        keyExtractor={(student) => student.id}
        renderItem={({ item }) => <StudentCard student={item} onPress={() => openDetail(item)} />}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[styles.listContent, { paddingBottom: 96 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        onPress={openAddForm}
        style={({ pressed }) => [
          styles.fab,
          { bottom: 24 + insets.bottom },
          pressed && styles.fabPressed,
        ]}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchArea: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  summary: {
    marginTop: 10,
    fontSize: 13,
    color: colors.textSecondary,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fabPressed: {
    opacity: 0.85,
  },
  fabIcon: {
    color: colors.surface,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '400',
  },
});
