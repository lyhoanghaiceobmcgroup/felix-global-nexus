
import { MemberCard } from "./MemberCard";

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

interface MemberListProps {
  members: Member[];
  viewMode: string;
  language: string;
  currentText: {
    members: {
      noMembers: string;
      noMembersDesc: string;
      viewProfile: string;
      connect: string;
    };
  };
}

export const MemberList = ({ members, viewMode, language, currentText }: MemberListProps) => {
  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">
          {language === 'vi' ? 'Không tìm thấy thành viên' : 'No members found'}
        </h3>
        <p className="text-[#8B0000]">
          {language === 'vi' 
            ? 'Vui lòng thử lại với từ khóa khác hoặc bỏ bộ lọc'
            : 'Please try different keywords or remove filters'
          }
        </p>
      </div>
    );
  }

  return (
    <div className={
      viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"
    }>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          language={language}
          currentText={currentText}
        />
      ))}
    </div>
  );
};
