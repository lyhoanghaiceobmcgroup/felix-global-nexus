import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UserPlus, Building2, Phone, User, Mail, Briefcase, Target, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  position: string;
  industry: string;
  experience: string;
  goals: string;
}

// Mockup data chuyên nghiệp cho các ngành nghề
const industryMockupData = {
  "Bất động sản": {
    name: "Nguyễn Văn Minh",
    phone: "0912345678",
    email: "minh.nguyen@realestate.vn",
    company: "Công ty TNHH Bất động sản Minh Phát",
    position: "Giám đốc kinh doanh",
    experience: "8 năm kinh nghiệm trong lĩnh vực bất động sản, chuyên về nhà đất khu vực Hà Nội",
    goals: "Mở rộng mạng lưới khách hàng và tìm kiếm cơ hội hợp tác với các doanh nghiệp khác"
  },
  "Tài chính - Ngân hàng": {
    name: "Trần Thị Hương",
    phone: "0987654321",
    email: "huong.tran@finance.com",
    company: "Công ty Tư vấn Tài chính Hương Tran",
    position: "Chuyên viên tư vấn tài chính",
    experience: "6 năm kinh nghiệm tư vấn đầu tư, bảo hiểm và quy hoạch tài chính cá nhân",
    goals: "Kết nối với các doanh nghiệp để cung cấp dịch vụ tư vấn tài chính toàn diện"
  },
  "Công nghệ thông tin": {
    name: "Lê Đức Anh",
    phone: "0901234567",
    email: "anh.le@techsolutions.vn",
    company: "Tech Solutions Vietnam",
    position: "Giám đốc công nghệ",
    experience: "10 năm phát triển phần mềm, chuyên về giải pháp số hóa doanh nghiệp",
    goals: "Tìm kiếm khách hàng doanh nghiệp cần chuyển đổi số và phát triển hệ thống IT"
  },
  "Y tế - Sức khỏe": {
    name: "Bác sĩ Phạm Thị Lan",
    phone: "0976543210",
    email: "lan.pham@healthcenter.vn",
    company: "Trung tâm Y tế Lan Phạm",
    position: "Bác sĩ chuyên khoa",
    experience: "12 năm kinh nghiệm trong lĩnh vực y tế, chuyên về khám sức khỏe tổng quát",
    goals: "Mở rộng dịch vụ chăm sóc sức khỏe và hợp tác với các doanh nghiệp về y tế doanh nghiệp"
  },
  "Giáo dục - Đào tạo": {
    name: "Hoàng Văn Đức",
    phone: "0965432109",
    email: "duc.hoang@education.vn",
    company: "Trung tâm Đào tạo Đức Hoàng",
    position: "Giám đốc đào tạo",
    experience: "7 năm kinh nghiệm đào tạo kỹ năng mềm và phát triển nhân sự doanh nghiệp",
    goals: "Hợp tác với các công ty để cung cấp chương trình đào tạo nhân viên chuyên nghiệp"
  },
  "Marketing - Quảng cáo": {
    name: "Vũ Thị Mai",
    phone: "0954321098",
    email: "mai.vu@marketing.vn",
    company: "Creative Marketing Agency",
    position: "Creative Director",
    experience: "9 năm kinh nghiệm trong lĩnh vực marketing số và quảng cáo sáng tạo",
    goals: "Tìm kiếm khách hàng doanh nghiệp cần dịch vụ marketing tổng thể và xây dựng thương hiệu"
  },
  "Luật - Tư vấn pháp lý": {
    name: "Luật sư Đỗ Văn Hùng",
    phone: "0943210987",
    email: "hung.do@lawfirm.vn",
    company: "Công ty Luật Hùng Đỗ",
    position: "Luật sư trưởng",
    experience: "11 năm kinh nghiệm tư vấn pháp lý doanh nghiệp, chuyên về luật thương mại",
    goals: "Mở rộng dịch vụ tư vấn pháp lý cho các doanh nghiệp vừa và nhỏ"
  },
  "Xây dựng - Kiến trúc": {
    name: "Kiến trúc sư Ngô Thị Hoa",
    phone: "0932109876",
    email: "hoa.ngo@architecture.vn",
    company: "Studio Kiến trúc Hoa Ngô",
    position: "Kiến trúc sư trưởng",
    experience: "8 năm thiết kế kiến trúc và nội thất, chuyên về không gian thương mại",
    goals: "Hợp tác với các nhà đầu tư bất động sản và doanh nghiệp cần thiết kế không gian làm việc"
  }
};

const MeetingRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    position: '',
    industry: '',
    experience: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!validateRequired(formData.name)) {
      errors.push('Họ tên không được để trống');
    }
    
    if (!validateRequired(formData.phone)) {
      errors.push('Số điện thoại không được để trống');
    } else if (!validatePhone(formData.phone)) {
      errors.push('Số điện thoại không hợp lệ');
    }
    
    if (!validateRequired(formData.email)) {
      errors.push('Email không được để trống');
    } else if (!validateEmail(formData.email)) {
      errors.push('Email không hợp lệ');
    }
    
    if (!validateRequired(formData.company)) {
      errors.push('Tên công ty không được để trống');
    }
    
    if (!validateRequired(formData.position)) {
      errors.push('Chức vụ không được để trống');
    }
    
    if (!validateRequired(formData.industry)) {
      errors.push('Ngành nghề không được để trống');
    }
    
    return { isValid: errors.length === 0, errors };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value || '' }));
  };

  const handleIndustryChange = (industry: string) => {
    const mockupData = industryMockupData[industry as keyof typeof industryMockupData];
    if (mockupData) {
      setFormData({
        name: mockupData.name,
        phone: mockupData.phone,
        email: mockupData.email,
        company: mockupData.company,
        position: mockupData.position,
        industry: industry,
        experience: mockupData.experience,
        goals: mockupData.goals
      });
      toast({
        title: "Đã điền thông tin mẫu",
        description: `Thông tin mẫu cho ngành ${industry} đã được điền. Bạn có thể chỉnh sửa theo ý muốn.`,
        variant: "default"
      });
    } else {
      handleInputChange('industry', industry);
    }
  };

  const isFormComplete = formData.name.trim() !== '' && 
                        formData.phone.trim() !== '' && 
                        formData.email.trim() !== '' && 
                        formData.company.trim() !== '' && 
                        formData.position.trim() !== '' && 
                        formData.industry !== '';

  const sendToTelegram = async (data: FormData) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_GUEST_GROUP_ID;
    
    const message = `🎯 ĐĂNG KÝ HỌP MỚI\n\n` +
      `👤 Họ tên: ${data.name}\n` +
      `📱 Điện thoại: ${data.phone}\n` +
      `📧 Email: ${data.email}\n` +
      `🏢 Công ty: ${data.company}\n` +
      `💼 Chức vụ: ${data.position}\n` +
      `🏭 Ngành nghề: ${data.industry}\n` +
      `📈 Kinh nghiệm: ${data.experience}\n` +
      `🎯 Mục tiêu: ${data.goals}\n\n` +
      `⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message to Telegram');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      toast({
        title: "Lỗi validation",
        description: validation.errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await sendToTelegram(formData);
      
      toast({
        title: "Đăng ký thành công!",
        description: "Thông tin đăng ký đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
        variant: "default"
      });
      
      setShowSuccess(true);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D71920] to-[#8B0000] flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Đăng ký thành công!</h2>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã đăng ký tham gia họp. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-[#D71920] hover:bg-[#8B0000] text-white w-full"
            >
              Về trang chủ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="mb-4 text-gray-600 hover:text-[#D71920]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang chủ
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#2E2E2E] mb-4">Đăng ký tham gia họp</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Điền thông tin để đăng ký tham gia các buổi họp của FELIX Chapter. 
              Chọn ngành nghề để tự động điền thông tin mẫu chuyên nghiệp.
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-xl border-t-4 border-t-[#D71920]">
          <CardHeader className="bg-gradient-to-r from-[#D71920] to-[#8B0000] text-white">
            <CardTitle className="text-2xl text-center flex items-center justify-center">
              <UserPlus className="w-6 h-6 mr-2" />
              Thông tin đăng ký
            </CardTitle>
            <CardDescription className="text-white/90 text-center">
              Vui lòng điền đầy đủ thông tin bên dưới
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ngành nghề - Chọn trước để auto-fill */}
              <div className="space-y-2">
                <Label htmlFor="industry" className="flex items-center text-gray-700 font-semibold">
                  <Briefcase className="w-4 h-4 mr-2 text-[#D71920]" />
                  Ngành nghề * (Chọn để tự động điền thông tin mẫu)
                </Label>
                <Select value={formData.industry} onValueChange={handleIndustryChange}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]">
                    <SelectValue placeholder="Chọn ngành nghề của bạn" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(industryMockupData).map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                    <SelectItem value="Khác">Ngành nghề khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Họ và tên */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-gray-700 font-semibold">
                  <User className="w-4 h-4 mr-2 text-[#D71920]" />
                  Họ và tên *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhập họ và tên đầy đủ"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Số điện thoại */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center text-gray-700 font-semibold">
                  <Phone className="w-4 h-4 mr-2 text-[#D71920]" />
                  Số điện thoại *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-gray-700 font-semibold">
                  <Mail className="w-4 h-4 mr-2 text-[#D71920]" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Công ty */}
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center text-gray-700 font-semibold">
                  <Building2 className="w-4 h-4 mr-2 text-[#D71920]" />
                  Công ty/Tổ chức *
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Nhập tên công ty/tổ chức"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Chức vụ */}
              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center text-gray-700 font-semibold">
                  <Target className="w-4 h-4 mr-2 text-[#D71920]" />
                  Chức vụ *
                </Label>
                <Input
                  id="position"
                  type="text"
                  placeholder="Nhập chức vụ hiện tại"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Kinh nghiệm */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="flex items-center text-gray-700 font-semibold">
                  <Briefcase className="w-4 h-4 mr-2 text-[#D71920]" />
                  Kinh nghiệm và chuyên môn
                </Label>
                <Textarea
                  id="experience"
                  placeholder="Mô tả ngắn gọn về kinh nghiệm và chuyên môn của bạn"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920] min-h-[100px]"
                  rows={4}
                />
              </div>

              {/* Mục tiêu */}
              <div className="space-y-2">
                <Label htmlFor="goals" className="flex items-center text-gray-700 font-semibold">
                  <Target className="w-4 h-4 mr-2 text-[#D71920]" />
                  Mục tiêu tham gia
                </Label>
                <Textarea
                  id="goals"
                  placeholder="Bạn mong muốn đạt được gì khi tham gia FELIX Chapter?"
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920] min-h-[100px]"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={!isFormComplete || isSubmitting}
                  className="w-full bg-[#D71920] hover:bg-[#8B0000] text-white text-lg py-6 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Xác nhận đăng ký
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingRegister;