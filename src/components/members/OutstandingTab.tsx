
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Trophy, Award } from "lucide-react";

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

interface OutstandingTabProps {
  filteredMembers: Member[];
  language: string;
  currentText: {
    outstanding: {
      title: string;
      subtitle: string;
    };
    members: {
      viewProfile: string;
      connect: string;
    };
  };
}

export const OutstandingTab = ({ filteredMembers, language, currentText }: OutstandingTabProps) => {
  const outstandingMembers = filteredMembers.filter(member => 
    member.badges.includes("TOP Referral") || 
    member.badges.includes("CONNECT Leader") || 
    member.badges.includes("Tăng trưởng nhanh")
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2E2E2E]">
          {currentText.outstanding.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {outstandingMembers.map((member) => (
          <Card key={member.id} className="border-[#D71920] shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#D71920] text-white px-3 py-1 text-sm font-semibold">
              <Star size={16} className="inline mr-1" />
              Nổi bật
            </div>
            <CardHeader className="text-center pt-8">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-24 h-24 border-4 border-[#D71920] group-hover:scale-110 transition-transform duration-300">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{(language === 'vi' ? member.name : member.nameEn).charAt(0)}</AvatarFallback>
                </Avatar>
                <Trophy className="absolute -bottom-2 -right-2 text-[#D71920] bg-white rounded-full p-1" size={24} />
              </div>
              <CardTitle className="text-[#2E2E2E]">
                {language === 'vi' ? member.name : member.nameEn}
              </CardTitle>
              <CardDescription className="text-[#D71920] font-semibold">
                {language === 'vi' ? member.company : member.companyEn}
              </CardDescription>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {member.badges.map((badge) => (
                  <Badge key={badge} className="bg-[#D71920] text-white">
                    <Award size={12} className="mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#D71920] hover:bg-[#8B0000]">
                🏆 Xem Chi Tiết Thành Tích
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
