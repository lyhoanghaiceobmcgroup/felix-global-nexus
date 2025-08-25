interface CheckInData {
  fullName: string;
  phoneNumber: string;
  industry: string;
  attendeeType: string;
  invitedBy?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  timestamp: string;
}

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const MEMBER_GROUP_ID = import.meta.env.VITE_TELEGRAM_MEMBER_GROUP_ID; // Cho thành viên
const GUEST_GROUP_ID = import.meta.env.VITE_TELEGRAM_GUEST_GROUP_ID; // Cho khách mời, khách thăm, khách đặc biệt

// Hàm xác định group ID dựa trên loại người tham dự
const getGroupIdByAttendeeType = (attendeeType: string): string => {
  if (attendeeType === 'Thành viên') {
    return MEMBER_GROUP_ID;
  }
  // Khách mời, Khách thăm, Khách đặc biệt
  return GUEST_GROUP_ID;
};

export const sendCheckInToTelegram = async (data: CheckInData): Promise<boolean> => {
  try {
    console.log('Starting Telegram send process...');
    console.log('Environment check:');
    console.log('- VITE_TELEGRAM_BOT_TOKEN exists:', !!TELEGRAM_BOT_TOKEN);
    console.log('- VITE_TELEGRAM_MEMBER_GROUP_ID exists:', !!MEMBER_GROUP_ID);
    console.log('- VITE_TELEGRAM_GUEST_GROUP_ID exists:', !!GUEST_GROUP_ID);
    console.log('- Bot token value:', TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'undefined');
    console.log('- Member group ID:', MEMBER_GROUP_ID);
    console.log('- Guest group ID:', GUEST_GROUP_ID);
    console.log('- All import.meta.env:', import.meta.env);
    
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('Telegram bot token is missing');
      return false;
    }
    
    const groupId = getGroupIdByAttendeeType(data.attendeeType);
    console.log('Selected group ID:', groupId);
    
    if (!groupId) {
      console.error('Group ID is missing');
      return false;
    }
    
    let message = `🎯 THÔNG BÁO CHECK-IN THÀNH CÔNG\n\n` +
       `👤 Họ tên: ${data.fullName}\n` +
       `📱 Số điện thoại: ${data.phoneNumber}\n` +
       `🏢 Ngành nghề: ${data.industry}\n` +
       `👥 Loại tham dự: ${data.attendeeType}\n`;
     
     if (data.invitedBy && data.invitedBy.trim()) {
       message += `🤝 Khách của: ${data.invitedBy}\n`;
     }
    
    if (data.location) {
      message += `📍 Vị trí: ${data.location.latitude}, ${data.location.longitude}\n`;
      if (data.location.address) {
        message += `🗺️ Địa chỉ: ${data.location.address}\n`;
      }
    } else {
      message += `📍 Vị trí: Không có dữ liệu vị trí\n`;
    }
    
    message += `⏰ Thời gian: ${data.timestamp}\n\n` +
      `✅ Check-in thành công cho buổi họp BNI FELIX Chapter!`;

    console.log('Sending message to Telegram...');
    console.log('Message length:', message.length);
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: groupId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API error response:', errorText);
      throw new Error(`Telegram API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Telegram API result:', result);
    return result.ok;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};

export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Trình duyệt không hỗ trợ định vị GPS'));
      return;
    }

    // Thử với độ chính xác cao trước
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        // Nếu lỗi, thử lại với cấu hình ít nghiêm ngặt hơn
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (fallbackError) => {
            let errorMessage = 'Không thể lấy vị trí';
            switch(fallbackError.code) {
              case fallbackError.PERMISSION_DENIED:
                errorMessage = 'Người dùng từ chối quyền truy cập vị trí';
                break;
              case fallbackError.POSITION_UNAVAILABLE:
                errorMessage = 'Thông tin vị trí không khả dụng';
                break;
              case fallbackError.TIMEOUT:
                errorMessage = 'Hết thời gian chờ lấy vị trí';
                break;
            }
            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 300000 // 5 phút
          }
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000 // 1 phút
      }
    );
  });
};

export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    // Using a free geocoding service (you might want to use Google Maps API for better results)
    const apiUrl = import.meta.env.VITE_GEOCODING_API_URL || 'https://api.bigdatacloud.net/data/reverse-geocode-client';
    const response = await fetch(`${apiUrl}?latitude=${lat}&longitude=${lng}&localityLanguage=vi`);
    const data = await response.json();
    return data.display_name || `${lat}, ${lng}`;
  } catch (error) {
    console.error('Error getting address:', error);
    return `${lat}, ${lng}`;
  }
};