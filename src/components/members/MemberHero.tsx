import { Button } from "@/components/ui/button";
interface MemberHeroProps {
  currentText: {
    hero: {
      title: string;
      subtitle: string;
    };
  };
}
export const MemberHero = ({
  currentText
}: MemberHeroProps) => {
  return <section className="relative overflow-hidden bg-gradient-to-br from-[#D71920] via-[#8B0000] to-[#D71920] text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {currentText.hero.title}
          </h1>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            {currentText.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-white/90 text-[#D71920] text-lg px-8 py-6 font-semibold">
              👁️ {currentText.hero.viewAll}
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-lg px-8 py-6 text-red-600">
              📅 {currentText.hero.schedule11}
            </Button>
            <Button size="lg" className="bg-[#2E2E2E] hover:bg-[#2E2E2E]/90 text-lg px-8 py-6">
              🎤 {currentText.hero.start30s}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-lg px-8 py-6 text-red-600">
              📤 {currentText.hero.register30s}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:text-[#D71920] text-lg px-8 py-6 bg-red-600 hover:bg-red-500">
              👥 {currentText.hero.referFriend}
            </Button>
          </div>
        </div>
      </div>
    </section>;
};