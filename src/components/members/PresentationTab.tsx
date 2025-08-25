
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronRight, SkipForward, Monitor, Users, Clock } from "lucide-react";

interface Member {
  id: number;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  company: string;
  companyEn: string;
  industry: string;
  industryEn: string;
  region: string;
  regionEn: string;
  avatar: string;
  badges: string[];
  tagline: string;
  taglineEn: string;
  introduction: string;
  introductionEn: string;
  website: string;
  email: string;
  phone: string;
  zalo: string;
}

interface PresentationTabProps {
  filteredMembers: Member[];
  currentPresenter: number;
  timeLeft: number;
  isPresenting: boolean;
  startPresentation: () => void;
  pausePresentation: () => void;
  nextPresenter: () => void;
  skipPresenter: () => void;
  language: string;
  currentText: {
    presentation: {
      title: string;
      subtitle: string;
      currentPresenter: string;
      timeRemaining: string;
      start: string;
      pause: string;
      next: string;
      skip: string;
      noMembers: string;
    };
  };
}

export const PresentationTab = ({
  filteredMembers,
  currentPresenter,
  timeLeft,
  isPresenting,
  startPresentation,
  pausePresentation,
  nextPresenter,
  skipPresenter,
  language,
  currentText
}: PresentationTabProps) => {
  return (
    <div className="space-y-8">
      {/* Check-in System Info */}
      <Card className="border-[#D71920] bg-gradient-to-r from-[#D71920]/5 to-[#8B0000]/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#D71920]" size={24} />
            <h3 className="text-xl font-bold text-[#2E2E2E]">
              {language === 'vi' ? 'Hệ thống Check-in & Trình chiếu 30s' : 'Check-in & 30s Presentation System'}
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#D71920] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Users size={20} />
              </div>
              <h4 className="font-semibold text-[#2E2E2E] mb-2">
                {language === 'vi' ? 'Check-in qua Dashboard' : 'Check-in via Dashboard'}
              </h4>
              <p className="text-sm text-[#8B0000]">
                {language === 'vi' 
                  ? 'Thành viên check-in trước buổi họp để được đưa vào danh sách trình bày'
                  : 'Members check-in before meeting to be added to presentation list'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#8B0000] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Monitor size={20} />
              </div>
              <h4 className="font-semibold text-[#2E2E2E] mb-2">
                {language === 'vi' ? 'Slide tự động hiển thị' : 'Auto Slide Display'}
              </h4>
              <p className="text-sm text-[#8B0000]">
                {language === 'vi' 
                  ? 'Thông tin 30s hiển thị: Tên + Ngành nghề + Hình ảnh + Slogan'
                  : 'Display 30s info: Name + Industry + Image + Slogan'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#D71920] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Play size={20} />
              </div>
              <h4 className="font-semibold text-[#2E2E2E] mb-2">
                {language === 'vi' ? 'Đồng bộ trình chiếu' : 'Synchronized Presentation'}
              </h4>
              <p className="text-sm text-[#8B0000]">
                {language === 'vi' 
                  ? 'Nút Play đếm ngược 30s đồng bộ với slide cá nhân'
                  : 'Play button with 30s countdown synchronized with personal slides'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slide Template */}
      <Card className="border-[#8B0000]">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-[#2E2E2E] mb-6 flex items-center gap-2">
            📊 {language === 'vi' ? 'Mẫu slide giới thiệu 30s' : '30s Presentation Slide Template'}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Slide 1 */}
            <Card className="border-[#D71920]/30 bg-white">
              <CardContent className="p-4">
                <div className="bg-[#D71920] text-white text-center py-2 rounded-t-lg mb-4">
                  <strong>{language === 'vi' ? 'SLIDE 1' : 'SLIDE 1'}</strong>
                </div>
                <div className="space-y-3 text-center">
                  <div className="w-16 h-16 bg-[#D71920]/10 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-[#D71920] font-bold text-xs">LOGO</span>
                  </div>
                  <h4 className="font-bold text-[#2E2E2E]">
                    {language === 'vi' ? 'Tên thành viên + Vai trò' : 'Member Name + Role'}
                  </h4>
                  <p className="text-sm text-[#8B0000] italic">
                    "{language === 'vi' ? 'Tối ưu thuế – Tăng trưởng doanh nghiệp' : 'Tax Optimization – Business Growth'}"
                  </p>
                  <Badge className="bg-[#8B0000] text-white">
                    {language === 'vi' ? 'Kế toán – Tư vấn Thuế – Kiểm toán' : 'Accounting – Tax Consulting – Audit'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Slide 2 */}
            <Card className="border-[#D71920]/30 bg-white">
              <CardContent className="p-4">
                <div className="bg-[#8B0000] text-white text-center py-2 rounded-t-lg mb-4">
                  <strong>{language === 'vi' ? 'SLIDE 2' : 'SLIDE 2'}</strong>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-20 bg-[#D71920]/10 rounded-lg flex items-center justify-center">
                    <span className="text-[#D71920] text-xs">
                      {language === 'vi' ? 'Hình ảnh sản phẩm/dịch vụ' : 'Product/Service Image'}
                    </span>
                  </div>
                  <div className="text-center">
                    <h5 className="font-semibold text-[#2E2E2E] text-sm">
                      {language === 'vi' ? 'Sản phẩm nổi bật' : 'Featured Product'}
                    </h5>
                    <p className="text-xs text-[#8B0000] mb-3">
                      {language === 'vi' ? 'Tên – Ứng dụng – Ưu điểm' : 'Name – Application – Benefits'}
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" className="bg-[#D71920] hover:bg-[#8B0000] text-white text-xs h-6 px-2">
                        🌐 {language === 'vi' ? 'Website' : 'Website'}
                      </Button>
                      <Button size="sm" className="bg-[#8B0000] hover:bg-[#D71920] text-white text-xs h-6 px-2">
                        📲 QR
                      </Button>
                      <Button size="sm" className="bg-[#2E2E2E] hover:bg-[#8B0000] text-white text-xs h-6 px-2">
                        📞 {language === 'vi' ? 'Hotline' : 'Hotline'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 p-4 bg-[#D71920]/5 rounded-lg">
            <p className="text-sm text-[#8B0000] text-center">
              {language === 'vi' 
                ? 'Hệ thống sẽ hiển thị slide dạng trình chiếu kèm đồng hồ đếm ngược 30s, giúp thành viên giới thiệu đúng thời lượng và chuyên nghiệp.'
                : 'The system will display slides in presentation format with a 30s countdown timer, helping members present within the right timeframe professionally.'
              }
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2E2E2E]">
          {currentText.presentation.currentPresenter}
        </h2>
      </div>

      {filteredMembers.length > 0 && (
        <Card className="border-[#D71920] shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="text-center lg:text-left">
                <Avatar className="w-32 h-32 mx-auto lg:mx-0 mb-4 border-4 border-[#D71920]">
                  <AvatarImage src={filteredMembers[currentPresenter]?.avatar} />
                  <AvatarFallback>{(language === 'vi' ? filteredMembers[currentPresenter]?.name : filteredMembers[currentPresenter]?.nameEn)?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2">
                  {language === 'vi' ? filteredMembers[currentPresenter]?.name : filteredMembers[currentPresenter]?.nameEn}
                </h3>
                <p className="text-[#D71920] text-lg mb-2 font-semibold">
                  {language === 'vi' ? filteredMembers[currentPresenter]?.position : filteredMembers[currentPresenter]?.positionEn}
                </p>
                <p className="text-[#2E2E2E] text-lg mb-4">
                  {language === 'vi' ? filteredMembers[currentPresenter]?.company : filteredMembers[currentPresenter]?.companyEn}
                </p>
                <Badge className="bg-[#8B0000] text-white">
                  {language === 'vi' ? filteredMembers[currentPresenter]?.industry : filteredMembers[currentPresenter]?.industryEn}
                </Badge>
              </div>

              <div className="flex-1 text-center">
                <div className="bg-[#D71920] text-white p-6 rounded-lg mb-6">
                  <p className="text-lg leading-relaxed">
                    {language === 'vi' ? filteredMembers[currentPresenter]?.introduction : filteredMembers[currentPresenter]?.introductionEn}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-[#8B0000]' : 'text-[#D71920]'}`}>
                      {timeLeft}s
                    </div>
                    <p className="text-sm text-[#2E2E2E]">{currentText.presentation.timeRemaining}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  {!isPresenting ? (
                    <Button onClick={startPresentation} className="bg-[#D71920] hover:bg-[#8B0000]">
                      <Play className="mr-2" size={16} />
                      {currentText.presentation.start}
                    </Button>
                  ) : (
                    <Button onClick={pausePresentation} variant="outline" className="border-[#D71920] text-[#D71920]">
                      <Pause className="mr-2" size={16} />
                      {currentText.presentation.pause}
                    </Button>
                  )}
                  <Button onClick={nextPresenter} variant="outline" className="border-[#2E2E2E] text-[#2E2E2E]">
                    {currentText.presentation.next}
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                  <Button onClick={skipPresenter} variant="outline" className="border-[#8B0000] text-[#8B0000]">
                    <SkipForward className="mr-2" size={16} />
                    {currentText.presentation.skip}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
