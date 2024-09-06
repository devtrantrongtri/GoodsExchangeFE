# Dự Án Goods Exchange Application - Frontend

## Giới thiệu

Dự án này là phần giao diện người dùng (Frontend) cho hệ thống Goods Exchange giữa các sinh viên UTH. Dự án được phát triển bằng  `ReactJS` `Typescript` `Tailwind` `Redux` `SockJs - Socket` `Tippy and UI library`  và bao gồm các trang giao diện và tính năng sau:

## Nội Dung

1. [Trang Đăng Nhập (Login)](#trang-đăng-nhập-login)
2. [Trang Đăng Ký (Register)](#trang-đăng-ký-register)
3. [Trang Quản Trị (Admin)](#trang-quản-trị-admin)
4. [Trang Chat (Chat)](#trang-chat-chat)
5. [Trang Chính (Home)](#trang-chính-home)
6. [Chi Tiết Sản Phẩm (ProductDetail)](#chi-tiết-sản-phẩm-productdetail)
7. [Trang các sản phẩm đã đăng của user (Ads)](#quảng-cáo-ads)
8. [Trang Hồ Sơ (Profile)](#trang-hồ-sơ-profile)
9. [Thông Báo (Notifications)](#thông-báo-notifications)
10. [Các Tính Năng Khác](#các-tính-năng-khác)
11. [Tìm Kiếm (Search)](#trang-tìm-kiếm-search)
12. [WishList (wishList)](#trang-giỏ-hàng-cart)
13. [Trang Đánh Giá (Reviews)](#trang-đánh-giá-reviews)
14. [Trang Hỗ Trợ (Support)](#trang-hỗ-trợ-support)
15. [Trang Tin Tức (News)](#trang-tin-tức-news)

## Trang Đăng Nhập (Login)

- **Mục đích:** Cho phép người dùng đăng nhập vào hệ thống.
- **Chức năng:** 
  - Nhập tên đăng nhập và mật khẩu.
  - Hiển thị thông báo lỗi nếu thông tin không chính xác.
  - Chuyển hướng đến trang chính sau khi đăng nhập thành công.

## Trang Đăng Ký (Register)

- **Mục đích:** Đăng ký tài khoản mới.
- **Chức năng:** 
  - Nhập thông tin cá nhân và thông tin đăng nhập.
  - Xác thực thông tin trước khi gửi.
  - Hiển thị thông báo lỗi nếu thông tin không hợp lệ.

## Trang Quản Trị (Admin)

- **Mục đích:** Quản lý hệ thống và người dùng.
- **Chức năng:**
  - Quản lý người dùng (xem, chỉnh sửa, xóa).
  - Quản lý sản phẩm (thêm, sửa, xóa).
  - Xem báo cáo và thống kê.

## Trang Chat (Chat)

- **Mục đích:** Cung cấp chức năng chat trực tiếp giữa người dùng.
- **Chức năng:**
  - Gửi và nhận tin nhắn theo thời gian thực.
  - Hiển thị danh sách bạn bè và phòng chat.
  - Thông báo khi có tin nhắn mới.

## Trang Chính (Home)

- **Mục đích:** Cung cấp thông tin tổng quan và truy cập nhanh đến các phần khác của hệ thống.
- **Chức năng:**
  - Hiển thị danh sách sản phẩm mới, nổi bật.
  - Cung cấp các liên kết đến các trang khác.
  - Hiển thị các quảng cáo nổi bật.

## Chi Tiết Sản Phẩm (ProductDetail)

- **Mục đích:** Hiển thị thông tin chi tiết về sản phẩm.
- **Chức năng:**
  - Hiển thị hình ảnh, mô tả, giá và các thông tin liên quan đến sản phẩm.
  - Cung cấp tùy chọn thêm sản phẩm vào giỏ hàng.
  - Hiển thị đánh giá và nhận xét của người dùng.

## Quảng Cáo (Ads)

- **Mục đích:** Hiển thị các quảng cáo của hệ thống hoặc đối tác.
- **Chức năng:**
  - Quản lý quảng cáo hiện tại.
  - Hiển thị quảng cáo trên các trang chính và phụ.

## Trang Hồ Sơ (Profile)

- **Mục đích:** Cung cấp thông tin và tùy chỉnh hồ sơ người dùng.
- **Chức năng:**
  - Hiển thị thông tin cá nhân và cho phép chỉnh sửa.
  - Xem lịch sử giao dịch và hoạt động.
  - Quản lý cài đặt tài khoản.

## Thông Báo (Notifications)

- **Mục đích:** Hiển thị các thông báo hệ thống và cá nhân.
- **Chức năng:**
  - Hiển thị thông báo mới.
  - Cung cấp tùy chọn để xem chi tiết hoặc xóa thông báo.

## Các Tính Năng Khác

- **Tìm kiếm sản phẩm:** Cung cấp chức năng tìm kiếm và lọc sản phẩm theo các tiêu chí khác nhau.
- **Danh sách yêu thích:** Cho phép người dùng lưu lại các sản phẩm yêu thích.
- **Chia sẻ mạng xã hội:** Cho phép người dùng chia sẻ sản phẩm hoặc nội dung lên các mạng xã hội.

## Trang Tìm Kiếm (Search)

- **Mục đích:** Cung cấp chức năng tìm kiếm cho người dùng.
- **Chức năng:**
  - Nhập từ khóa để tìm kiếm sản phẩm, bài viết, hoặc thông tin khác.
  - Hiển thị kết quả tìm kiếm theo danh mục hoặc loại.

## Trang Giỏ Hàng (Cart)

- **Mục đích:** Quản lý các sản phẩm đã chọn để mua.
- **Chức năng:**
  - Hiển thị danh sách các sản phẩm trong giỏ hàng.
  - Cung cấp tùy chọn để chỉnh sửa số lượng hoặc xóa sản phẩm.
  - Hiển thị tổng giá và điều hướng đến trang thanh toán.

## Trang Đánh Giá (Reviews)

- **Mục đích:** Hiển thị và quản lý đánh giá của người dùng về sản phẩm.
- **Chức năng:**
  - Hiển thị danh sách đánh giá và nhận xét từ người dùng.
  - Cho phép người dùng thêm đánh giá và nhận xét mới.
  - Quản lý đánh giá (xóa, chỉnh sửa).

## Trang Hỗ Trợ (Support)

- **Mục đích:** Cung cấp thông tin hỗ trợ và liên hệ.
- **Chức năng:**
  - Hiển thị các thông tin hỗ trợ, FAQ và hướng dẫn sử dụng.
  - Cung cấp biểu mẫu liên hệ để gửi yêu cầu hỗ trợ hoặc phản hồi.

## Trang Tin Tức (News)

- **Mục đích:** Cung cấp các tin tức và cập nhật mới nhất liên quan đến hệ thống hoặc ngành.
- **Chức năng:**
  - Hiển thị danh sách các bài viết tin tức.
  - Cung cấp tùy chọn đọc chi tiết và bình luận trên các bài viết.

## Hướng Dẫn Cài Đặt

1. **Cài đặt phụ thuộc:**
   ```bash
   npm install
   ```
2. **Chạy ứng dụng:**
   ```bash
   npm run dev
   ```

## Ghi Chú

- Đảm bảo bạn đã cấu hình đúng các biến môi trường cần thiết trong file `.env`.
- Xem tài liệu để biết thêm chi tiết về API và cấu hình hệ thống.

## Liên Hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email: [devtrantrongtri@gmail.com].