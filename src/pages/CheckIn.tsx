import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UserCheck, Building2, Phone, User, MapPin, Clock, Loader2 } from "lucide-react";
import { sendCheckInToTelegram, getCurrentLocation, getAddressFromCoordinates } from "@/services/telegramService";

const CheckIn = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    industry: '',
    attendeeType: '',
    invitedBy: ''
  });
  const [location, setLocation] = useState<{latitude: number, longitude: number, address: string} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value || '' }));
  };

  // Check if form is complete (location is optional)
  const isFormComplete = formData.fullName.trim() !== '' && 
                        formData.phoneNumber.trim() !== '' && 
                        formData.industry.trim() !== '' && 
                        formData.attendeeType !== '';

  const getLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      const address = await getAddressFromCoordinates(latitude, longitude);
      setLocation({ latitude, longitude, address });
      toast({
        title: "Định vị thành công",
        description: "Đã lấy được vị trí hiện tại của bạn.",
        variant: "default"
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Geolocation error:', error);
      let errorMessage = "Không thể lấy vị trí. Vui lòng bật định vị và thử lại.";
      
      if (err.message && err.message.includes('từ chối')) {
        errorMessage = "Bạn đã từ chối quyền truy cập vị trí. Bạn vẫn có thể check-in mà không cần vị trí.";
      } else if ((error as GeolocationPositionError)?.code === 1) {
        errorMessage = "Quyền truy cập vị trí bị từ chối. Bạn vẫn có thể check-in mà không cần vị trí.";
      }
      
      toast({
        title: "Thông báo định vị",
        description: errorMessage,
        variant: "default"
      });
    } finally {
      setIsLoadingLocation(false);
    }
  }, [toast]);

  // Get location on component mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phoneNumber || !formData.industry || !formData.attendeeType) {
      toast({
        title: "Thông báo",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive"
      });
      return;
    }

    // Location is optional, continue without it if not available

    setIsSubmitting(true);
    
    try {
      const checkInData = {
        ...formData,
        location,
        timestamp: currentTime.toLocaleString('vi-VN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      const success = await sendCheckInToTelegram(checkInData);
      
      if (success) {
        setShowSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            fullName: "",
            phoneNumber: "",
            industry: "",
            attendeeType: ""
          });
          setShowSuccess(false);
        }, 3000);
      } else {
        throw new Error('Failed to send to Telegram');
      }
    } catch (error) {
      toast({
        title: "Lỗi gửi thông tin",
        description: "Không thể gửi thông tin check-in. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExit = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-[#D71920] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={handleExit}
                className="text-white hover:bg-white/10 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Quay lại
              </Button>
              <div className="text-2xl font-bold text-white">
                BNI <span className="text-white">FELIX</span> - Check-in
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showSuccess ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Chúc mừng bạn đã check-in thành công!
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Thông tin của bạn đã được gửi đến hệ thống. Cảm ơn bạn đã tham dự buổi họp BNI FELIX Chapter!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#D71920] rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Đăng ký Check-in
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Vui lòng điền thông tin để check-in tham dự buổi họp BNI FELIX Chapter
              </p>
            </div>

            {/* Real-time Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Thời gian hiện tại</p>
                      <p className="text-lg font-bold text-blue-800">
                        {currentTime.toLocaleString('vi-VN', {
                          weekday: 'short',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-2 ${location ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    {isLoadingLocation ? (
                      <Loader2 className="w-5 h-5 text-orange-600 mr-2 animate-spin" />
                    ) : (
                      <MapPin className={`w-5 h-5 mr-2 ${location ? 'text-green-600' : 'text-orange-600'}`} />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${location ? 'text-green-600' : 'text-orange-600'}`}>
                        {isLoadingLocation ? 'Đang lấy vị trí...' : location ? 'Vị trí xác nhận' : 'Chưa có vị trí'}
                      </p>
                      <p className={`text-sm ${location ? 'text-green-800' : 'text-orange-800'}`}>
                        {location ? location.address : 'Vui lòng cho phép truy cập vị trí'}
                      </p>
                    </div>
                    {!location && !isLoadingLocation && (
                      <Button size="sm" variant="outline" onClick={getLocation} className="ml-2">
                        Thử lại
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {!showSuccess && (
          <Card className="shadow-xl border-t-4 border-t-[#D71920]">
            <CardHeader className="bg-gradient-to-r from-[#D71920] to-[#8B0000] text-white">
              <CardTitle className="text-xl text-center">Thông tin check-in</CardTitle>
              <CardDescription className="text-white/90 text-center">
                Điền đầy đủ thông tin bên dưới để hoàn tất đăng ký
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Họ và tên */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-2 text-[#D71920]" />
                  Họ và tên *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên đầy đủ"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Số điện thoại */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-2 text-[#D71920]" />
                  Số điện thoại *
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Ngành nghề */}
              <div className="space-y-2">
                <Label htmlFor="industry" className="flex items-center text-gray-700">
                  <Building2 className="w-4 h-4 mr-2 text-[#D71920]" />
                  Ngành nghề *
                </Label>
                <Input
                  id="industry"
                  type="text"
                  placeholder="Nhập ngành nghề/chuyên môn"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  required
                />
              </div>

              {/* Loại người tham dự */}
              <div className="space-y-2">
                <Label htmlFor="attendeeType" className="flex items-center text-gray-700">
                <UserCheck className="w-4 h-4 mr-2 text-[#D71920]" />
                Người tham dự *
              </Label>
                <Select value={formData.attendeeType} onValueChange={(value) => handleInputChange("attendeeType", value)}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]">
                    <SelectValue placeholder="Chọn loại người tham dự" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thành viên">Thành viên</SelectItem>
                    <SelectItem value="Khách mời">Khách mời</SelectItem>
                    <SelectItem value="Khách thăm">Khách thăm</SelectItem>
                    <SelectItem value="Khách đặc biệt">Khách đặc biệt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trường người mời - chỉ hiển thị khi chọn khách */}
              {formData.attendeeType && formData.attendeeType !== 'Thành viên' && (
                <div className="space-y-2">
                  <Label htmlFor="invitedBy" className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-2 text-[#D71920]" />
                    Bạn là khách của ai?
                  </Label>
                  <Input
                    id="invitedBy"
                    type="text"
                    placeholder="Nhập tên người mời (tùy chọn)"
                    value={formData.invitedBy}
                    onChange={(e) => handleInputChange('invitedBy', e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#D71920] focus:ring-[#D71920]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExit}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Thoát
                </Button>
                <Button
                  type="submit"
                  className={`flex-1 text-white transition-all duration-200 ${
                    isFormComplete 
                      ? 'bg-[#D71920] hover:bg-[#8B0000] shadow-lg' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={isSubmitting || !isFormComplete}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang gửi...
                    </>
                  ) : isFormComplete ? (
                    'Xác nhận check-in'
                  ) : (
                    'Vui lòng điền đầy đủ thông tin'
                  )}
                </Button>
              </div>
            </form>
            </CardContent>
          </Card>
        )}

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {showSuccess ? 
              'Thông tin check-in đã được gửi thành công đến hệ thống quản lý.' :
              'Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích tổ chức buổi họp'
            }
          </p>
        </div>
      </main>
    </div>
  );
};

export default CheckIn;