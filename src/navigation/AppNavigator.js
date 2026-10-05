import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStudentScreen from '../screens/AddStudentScreen';
import EditStudentScreen from '../screens/EditStudentScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import StudentListScreen from '../screens/StudentListScreen';
import { colors } from '../styles/colors';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.surface,
  headerTitleStyle: { fontWeight: '700' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

// Dữ liệu và các hàm cập nhật nằm ở App.js, được truyền xuống từng màn hình bằng props.
export default function AppNavigator({ students, onAddStudent, onUpdateStudent, onDeleteStudent }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StudentList" screenOptions={screenOptions}>
        <Stack.Screen name="StudentList" options={{ title: 'Quản lý sinh viên' }}>
          {(props) => <StudentListScreen {...props} students={students} />}
        </Stack.Screen>

        <Stack.Screen name="StudentDetail" options={{ title: 'Chi tiết sinh viên' }}>
          {(props) => (
            <StudentDetailScreen {...props} students={students} onDeleteStudent={onDeleteStudent} />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddStudent" options={{ title: 'Thêm sinh viên' }}>
          {(props) => (
            <AddStudentScreen {...props} students={students} onAddStudent={onAddStudent} />
          )}
        </Stack.Screen>

        <Stack.Screen name="EditStudent" options={{ title: 'Chỉnh sửa sinh viên' }}>
          {(props) => (
            <EditStudentScreen {...props} students={students} onUpdateStudent={onUpdateStudent} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
