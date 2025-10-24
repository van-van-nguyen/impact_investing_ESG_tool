// CSV Schema for ESG Classification
export const CSV_SCHEMA = {
  headers: [
    'Company',
    'ResolutionNumber', 
    'Resolution',
    'ClassifiedTopic',
    'Definition'
  ],
  
  // ESG Categories in Vietnamese
  categories: {
    'Tài chính & Kiểm toán': [
      'Báo cáo tài chính thường niên đã kiểm toán',
      'Giao dịch với các bên liên quan',
      'Chương trình quyền chọn cổ phiếu / ESOP',
      'Cổ tức',
      'Kế hoạch phân phối lợi nhuận',
      'Mua lại cổ phiếu quỹ',
      'Phát hành/niêm yết thêm cổ phần cho cổ đông hiện hữu',
      'Tăng vốn điều lệ',
      'Bổ nhiệm / tái bổ nhiệm kiểm toán viên',
      'Phát hành trái phiếu'
    ],
    'Môi trường & Xã hội (E&S)': [
      'Môi trường / Sức khỏe',
      'Xã hội / Nhân quyền'
    ],
    'Quản trị & Tuân thủ': [
      'Cơ cấu HĐQT / Tính độc lập của HĐQT',
      'Bổ nhiệm / tái bổ nhiệm thành viên HĐQT',
      'Sửa đổi/chia tách điều lệ'
    ],
    'Thù lao': [
      'Thù lao của Ban điều hành / Thành viên HĐQT',
      'Các khoản đãi ngộ ngoài lương'
    ],
    'Hoạt động': [
      'Báo cáo của HĐQT và Ban kiểm soát',
      'Các vấn đề kinh tế chung',
      'Hoạt động thường xuyên / Kinh doanh',
      'Phê duyệt quyên góp và chi tiêu chính trị',
      'Khác'
    ],
    'Đầu tư chiến lược': [
      'Kế hoạch mở rộng kinh doanh & đầu tư',
      'Sáp nhập và Mua lại'
    ]
  }
};

export default CSV_SCHEMA;

