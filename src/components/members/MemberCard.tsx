
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe } from "lucide-react";

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

interface MemberCardProps {
  member: Member;
  language: string;
  currentText: {
    members: {
      viewProfile: string;
      connect: string;
    };
  };
}

export const MemberCard = ({ member, language, currentText }: MemberCardProps) => {
  return (
    <Card className="border-[#D71920] shadow-lg hover:shadow-xl transition-all duration-300 group bg-white overflow-hidden">
      <CardHeader className="text-center relative">
        <div className="absolute top-0 right-0 w-8 h-8 bg-[#D71920] transform rotate-45 translate-x-4 -translate-y-4"></div>
        <div className="relative mx-auto mb-4">
          <Avatar className="w-20 h-20 border-4 border-[#D71920] group-hover:scale-110 transition-transform duration-300">
            <AvatarImage src={member.avatar} />
            <AvatarFallback className="bg-[#8B0000] text-white font-bold text-lg">
              {(language === 'vi' ? member.name : member.nameEn).charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-[#2E2E2E] text-lg font-bold">
          {language === 'vi' ? member.name : member.nameEn}
        </CardTitle>
        <CardDescription className="text-[#D71920] font-semibold text-sm">
          {language === 'vi' ? member.position : member.positionEn}
        </CardDescription>
        <CardDescription className="text-[#2E2E2E] text-sm">
          {language === 'vi' ? member.company : member.companyEn}
        </CardDescription>
        <div className="inline-block">
          <Badge className="bg-[#8B0000] text-white text-xs hover:bg-[#D71920] transition-colors">
            {language === 'vi' ? member.industry : member.industryEn}
          </Badge>
        </div>
        <p className="text-sm text-[#8B0000] italic mt-2 leading-relaxed">
          "{language === 'vi' ? member.tagline : member.taglineEn}"
        </p>
        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {member.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="bg-[#D71920] text-white text-xs px-2 py-1">
              🏆 {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div className="grid grid-cols-1 gap-2">
          <Button 
            size="sm" 
            className="bg-[#D71920] hover:bg-[#8B0000] text-white text-xs h-8 transition-all duration-200 hover:scale-105"
            onClick={() => window.open(`tel:${member.zalo}`, '_blank')}
          >
            <Phone size={12} className="mr-1" />
            {currentText.member.callZalo}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white text-xs h-8 transition-all duration-200 hover:scale-105"
            onClick={() => window.open(`mailto:${member.email}`, '_blank')}
          >
            <Mail size={12} className="mr-1" />
            {currentText.member.sendEmail}
          </Button>
          <Button 
            size="sm" 
            className="bg-[#2E2E2E] hover:bg-[#8B0000] text-white text-xs h-8 transition-all duration-200 hover:scale-105"
            onClick={() => window.open(member.website, '_blank')}
          >
            <Globe size={12} className="mr-1" />
            {language === 'vi' ? 'Website doanh nghiệp' : 'Business Website'}
          </Button>
        </div>
        <div className="pt-2 border-t border-[#D71920]/20">
          <Button 
            className="w-full bg-gradient-to-r from-[#D71920] to-[#8B0000] hover:from-[#8B0000] hover:to-[#D71920] text-white text-xs h-8 transition-all duration-300 hover:scale-105"
          >
            📅 {currentText.member.schedule11}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
