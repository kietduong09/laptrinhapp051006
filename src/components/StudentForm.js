import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { formatDateInput, formValuesToStudent } from '../utils/studentUtils';
import { validateStudentForm } from '../utils/validation';
import GenderSelector from './GenderSelector';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';

export const EMPTY_FORM_VALUES = {
  studentCode: '',
  fullName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  className: '',
  faculty: '',
  gpa: '',
};

/**
 * Form dùng chung cho màn hình Thêm và Sửa.
 * - `studentId`: có giá trị khi đang sửa (mã sinh viên sẽ bị khóa).
 * - `onSubmit(student)`: được gọi khi dữ liệu hợp lệ.
 */
export default function StudentForm({
  initialValues = EMPTY_FORM_VALUES,
  studentId,
  students,
  submitLabel,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const insets = useSafeAreaInsets();
  const isEditing = Boolean(studentId);

  const handleChange = (field, text) => {
    setValues((current) => ({ ...current, [field]: text }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = () => {
    const validationErrors = validateStudentForm(values, students, studentId);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Alert.alert('Dữ liệu chưa hợp lệ', 'Vui lòng kiểm tra lại các trường được đánh dấu đỏ.');
      return;
    }

    const id = studentId ?? `SV${Date.now()}`;
    onSubmit(formValuesToStudent(values, id));
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior="padding">
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 32 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <InputField
          label="Mã sinh viên"
          value={values.studentCode}
          onChangeText={(text) => handleChange('studentCode', text)}
          error={errors.studentCode}
          editable={!isEditing}
          placeholder="VD: 20220011"
          autoCapitalize="characters"
        />
        <InputField
          label="Họ tên"
          value={values.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
          error={errors.fullName}
          placeholder="VD: Nguyễn Văn An"
          autoCapitalize="words"
        />
        <InputField
          label="Ngày sinh"
          value={values.dateOfBirth}
          onChangeText={(text) => handleChange('dateOfBirth', formatDateInput(text))}
          error={errors.dateOfBirth}
          placeholder="DD/MM/YYYY"
          keyboardType="number-pad"
          maxLength={10}
        />
        <GenderSelector
          value={values.gender}
          onChange={(gender) => handleChange('gender', gender)}
          error={errors.gender}
        />
        <InputField
          label="Email"
          value={values.email}
          onChangeText={(text) => handleChange('email', text)}
          error={errors.email}
          placeholder="VD: an@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <InputField
          label="Số điện thoại"
          value={values.phone}
          onChangeText={(text) => handleChange('phone', text)}
          error={errors.phone}
          placeholder="VD: 0912345678"
          keyboardType="phone-pad"
          maxLength={11}
        />
        <InputField
          label="Lớp"
          value={values.className}
          onChangeText={(text) => handleChange('className', text)}
          error={errors.className}
          placeholder="VD: CNTT01"
          autoCapitalize="characters"
        />
        <InputField
          label="Khoa"
          value={values.faculty}
          onChangeText={(text) => handleChange('faculty', text)}
          error={errors.faculty}
          placeholder="VD: Công nghệ thông tin"
          autoCapitalize="words"
        />
        <InputField
          label="GPA (0 - 10)"
          value={values.gpa}
          onChangeText={(text) => handleChange('gpa', text)}
          error={errors.gpa}
          placeholder="VD: 8.5"
          keyboardType="decimal-pad"
          maxLength={5}
        />

        <PrimaryButton title={submitLabel} onPress={handleSubmit} style={styles.submitButton} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  submitButton: {
    marginTop: 8,
  },
});
