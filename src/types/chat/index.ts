export interface MessageType  {
    messageId: number;
    sender: number;
    recipient: number;
    content: string;
    messageType: string;
    createAt: string;
  }

  // interface Message {
  //   messageId: number;
  //   sender: number;
  //   recipient: number;
  //   content: string;
  //   messageType: "TEXT" | "IMAGE" | "VIDEO"; // Bạn có thể thêm các loại message khác nếu cần
  //   createAt: [number, number, number, number, number, number]; // [năm, tháng, ngày, giờ, phút, giây]
  // }
  