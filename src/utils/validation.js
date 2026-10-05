import { parseGpa } from './studentUtils';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^0\d{9,10}$/;
const GPA_PATTERN = /^\d+([.,]\d+)?$/;
const DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const isValidDate = (text) => {
  const match = DATE_PATTERN.exec(text);
  if (!match) {
    return false;
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  const isRealDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isRealDate && year >= 1900 && date <= new Date();
};

const validateGpa = (text) => {
  const gpaText = text.trim();
  if (!gpaText) {
    return 'Vui lòng nhập GPA.';
  }
  if (!GPA_PATTERN.test(gpaText)) {
    return 'GPA phải là một số.';
  }
  const gpa = parseGpa(gpaText);
  if (gpa < 0 || gpa > 10) {
    return 'GPA phải nằm trong khoảng từ 0 đến 10.';
  }
  return null;
};

/**
 * Kiểm tra dữ liệu form. Trả về object lỗi theo từng trường,
 * object rỗng nghĩa là dữ liệu hợp lệ.
 * `editingId` dùng để bỏ qua chính sinh viên đang sửa khi kiểm tra trùng mã.
 */
export const validateStudentForm = (values, students, editingId) => {
  const errors = {};

  const studentCode = values.studentCode.trim();
  if (!studentCode) {
    errors.studentCode = 'Vui lòng nhập mã sinh viên.';
  } else {
    const isDuplicated = students.some(
      (student) =>
        student.id !== editingId &&
        student.studentCode.toLowerCase() === studentCode.toLowerCase()
    );
    if (isDuplicated) {
      errors.studentCode = 'Mã sinh viên đã tồn tại.';
    }
  }

  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ tên.';
  }

  const dateOfBirth = values.dateOfBirth.trim();
  if (!dateOfBirth) {
    errors.dateOfBirth = 'Vui lòng nhập ngày sinh.';
  } else if (!isValidDate(dateOfBirth)) {
    errors.dateOfBirth = 'Ngày sinh không hợp lệ (định dạng DD/MM/YYYY).';
  }

  if (!values.gender) {
    errors.gender = 'Vui lòng chọn giới tính.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Vui lòng nhập email.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Email không đúng định dạng.';
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = 'Vui lòng nhập số điện thoại.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Số điện thoại phải gồm 10–11 chữ số và bắt đầu bằng 0.';
  }

  if (!values.className.trim()) {
    errors.className = 'Vui lòng nhập lớp.';
  }

  if (!values.faculty.trim()) {
    errors.faculty = 'Vui lòng nhập khoa.';
  }

  const gpaError = validateGpa(values.gpa);
  if (gpaError) {
    errors.gpa = gpaError;
  }

  return errors;
};
