import { colors } from '../styles/colors';

// Bảng xếp loại duy nhất của ứng dụng, sắp xếp từ cao xuống thấp.
const GRADE_LEVELS = [
  { minGpa: 8.5, label: 'Giỏi', color: colors.gradeExcellent, backgroundColor: colors.gradeExcellentLight },
  { minGpa: 7.0, label: 'Khá', color: colors.gradeGood, backgroundColor: colors.gradeGoodLight },
  { minGpa: 5.0, label: 'Trung bình', color: colors.gradeAverage, backgroundColor: colors.gradeAverageLight },
  { minGpa: 0, label: 'Yếu', color: colors.gradeWeak, backgroundColor: colors.gradeWeakLight },
];

export const getGradeLevel = (gpa) => {
  const level = GRADE_LEVELS.find((item) => gpa >= item.minGpa);
  return level ?? GRADE_LEVELS[GRADE_LEVELS.length - 1];
};

export const getClassification = (gpa) => getGradeLevel(gpa).label;

export const formatGpa = (gpa) => Number(gpa).toFixed(2);

// Lấy chữ cái đầu của tên (từ cuối cùng) để hiển thị avatar.
export const getInitial = (fullName) => {
  const lastWord = fullName.trim().split(/\s+/).pop() ?? '';
  return lastWord.charAt(0).toUpperCase();
};

// Tìm theo mã sinh viên hoặc họ tên, không phân biệt hoa/thường.
export const filterStudents = (students, keyword) => {
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) {
    return students;
  }
  return students.filter(
    (student) =>
      student.studentCode.toLowerCase().includes(normalizedKeyword) ||
      student.fullName.toLowerCase().includes(normalizedKeyword)
  );
};

// Tự thêm dấu "/" khi nhập ngày sinh: 15052004 -> 15/05/2004
export const formatDateInput = (text) => {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

// Chuyển dữ liệu sinh viên thành giá trị (chuỗi) cho các ô nhập.
export const studentToFormValues = (student) => ({
  studentCode: student.studentCode,
  fullName: student.fullName,
  dateOfBirth: student.dateOfBirth,
  gender: student.gender,
  email: student.email,
  phone: student.phone,
  className: student.className,
  faculty: student.faculty,
  gpa: String(student.gpa),
});

export const parseGpa = (text) => Number(text.trim().replace(',', '.'));

// Chuyển giá trị trong form thành object sinh viên để lưu vào state.
export const formValuesToStudent = (values, id) => ({
  id,
  studentCode: values.studentCode.trim(),
  fullName: values.fullName.trim(),
  dateOfBirth: values.dateOfBirth.trim(),
  gender: values.gender,
  email: values.email.trim(),
  phone: values.phone.trim(),
  className: values.className.trim(),
  faculty: values.faculty.trim(),
  gpa: parseGpa(values.gpa),
});
