
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";

interface MemberFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterIndustry: string;
  setFilterIndustry: (industry: string) => void;
  filterRegion: string;
  setFilterRegion: (region: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  industries: string[];
  regions: string[];
  currentText: {
    members: {
      searchPlaceholder: string;
      allIndustries: string;
      allRegions: string;
      listView: string;
      gridView: string;
    };
  };
}

export const MemberFilters = ({
  searchTerm,
  setSearchTerm,
  filterIndustry,
  setFilterIndustry,
  filterRegion,
  setFilterRegion,
  viewMode,
  setViewMode,
  industries,
  regions,
  currentText
}: MemberFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D71920]" size={20} />
          <Input
            placeholder={currentText.filters.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#D71920] focus:ring-[#D71920]"
          />
        </div>
        <Select value={filterIndustry} onValueChange={setFilterIndustry}>
          <SelectTrigger className="w-full md:w-48 border-[#D71920]">
            <Filter className="mr-2" size={16} />
            <SelectValue placeholder={currentText.filters.industry} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{currentText.filters.allIndustries}</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterRegion} onValueChange={setFilterRegion}>
          <SelectTrigger className="w-full md:w-48 border-[#D71920]">
            <Filter className="mr-2" size={16} />
            <SelectValue placeholder={currentText.filters.region} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{currentText.filters.allRegions}</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('grid')}
          className={viewMode === 'grid' ? 'bg-[#D71920] hover:bg-[#8B0000]' : 'border-[#D71920] text-[#D71920]'}
        >
          <Grid size={16} />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'bg-[#D71920] hover:bg-[#8B0000]' : 'border-[#D71920] text-[#D71920]'}
        >
          <List size={16} />
        </Button>
      </div>
    </div>
  );
};
