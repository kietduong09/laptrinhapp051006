import React from 'react';
import { Alert } from 'react-native';
import StudentForm from '../components/StudentForm';

export default function AddStudentScreen({ navigation, students, onAddStudent }) {
  const handleSubmit = (newStudent) => {
    onAddStudent(newStudent);
    navigation.goBack();
    Alert.alert('Thành công', `Đã thêm sinh viên "${newStudent.fullName}".`);
  };

  return <StudentForm students={students} submitLabel="Thêm sinh viên" onSubmit={handleSubmit} />;
}
