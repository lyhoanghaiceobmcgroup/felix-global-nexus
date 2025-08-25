
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock } from "lucide-react";

interface ConnectTabProps {
  currentText: {
    connect: {
      title: string;
    };
  };
}

export const ConnectTab = ({ currentText }: ConnectTabProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2E2E2E]">
          {currentText.connect.title}
        </h2>
        <p className="text-lg text-[#D71920] max-w-3xl mx-auto">
          Hệ thống đặt lịch 1-1 thông minh với gợi ý kết nối theo ngành bổ trợ
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="border-[#D71920] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#2E2E2E] flex items-center">
              <Calendar className="mr-2 text-[#D71920]" size={20} />
              {currentText.connect.smartScheduling}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#2E2E2E]">
              Hiển thị lịch rảnh của các thành viên và đặt lịch tự động
            </p>
            <Button className="w-full bg-[#D71920] hover:bg-[#8B0000]">
              📅 Mở Lịch Đặt Hẹn
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[#2E2E2E] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#2E2E2E] flex items-center">
              <Users className="mr-2 text-[#D71920]" size={20} />
              {currentText.connect.suggestions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#2E2E2E]">
              Gợi ý kết nối 1-1 theo ngành bổ trợ và ưu tiên KPI
            </p>
            <Button variant="outline" className="w-full border-[#2E2E2E] text-[#2E2E2E]">
              🔍 Xem Gợi Ý Kết Nối
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[#8B0000] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#2E2E2E] flex items-center">
              <Clock className="mr-2 text-[#D71920]" size={20} />
              {currentText.connect.history}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#2E2E2E]">
              Lưu lịch sử cuộc hẹn và kết quả kết nối
            </p>
            <Button variant="outline" className="w-full border-[#8B0000] text-[#8B0000]">
              📊 Xem Lịch Sử
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
