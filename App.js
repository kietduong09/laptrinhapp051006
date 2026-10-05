import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { initialStudents } from './src/data/students';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [students, setStudents] = useState(initialStudents);

  const addStudent = (newStudent) => {
    setStudents((current) => [newStudent, ...current]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents((current) =>
      current.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
    );
  };

  const deleteStudent = (studentId) => {
    setStudents((current) => current.filter((student) => student.id !== studentId));
  };

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator
        students={students}
        onAddStudent={addStudent}
        onUpdateStudent={updateStudent}
        onDeleteStudent={deleteStudent}
      />
    </>
  );
}
