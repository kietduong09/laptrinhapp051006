import React from 'react';
import { Alert } from 'react-native';
import StudentForm from '../components/StudentForm';
import { studentToFormValues } from '../utils/studentUtils';

export default function EditStudentScreen({ navigation, route, students, onUpdateStudent }) {
  const student = students.find((item) => item.id === route.params.studentId);

  if (!student) {
    return null;
  }

  const handleSubmit = (updatedStudent) => {
    onUpdateStudent(updatedStudent);
    navigation.goBack();
    Alert.alert('Thành công', 'Đã cập nhật thông tin sinh viên.');
  };

  return (
    <StudentForm
      initialValues={studentToFormValues(student)}
      studentId={student.id}
      students={students}
      submitLabel="Lưu thay đổi"
      onSubmit={handleSubmit}
    />
  );
}
