'use client';

import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout';
import { CaseCard } from '@/components/benchmarking';
import { remodelingCases } from '@/data/remodeling-cases';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { BuildingType, BUILDING_TYPE_LABELS } from '@/types';

type SortOption = 'latest' | 'energySaving' | 'costEfficiency' | 'rating';

export default function BenchmarkingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<BuildingType | 'all'>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  // Get unique remodeling items from all cases
  const allItems = useMemo(() => {
    const items = new Set<string>();
    remodelingCases.forEach((c) => c.items.forEach((item) => items.add(item)));
    return Array.from(items);
  }, []);

  // Filter and sort cases
  const filteredCases = useMemo(() => {
    let result = [...remodelingCases];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.buildingName.toLowerCase().includes(query) ||
          c.region.toLowerCase().includes(query) ||
          c.district.toLowerCase().includes(query)
      );
    }

    // Filter by building type
    if (selectedType !== 'all') {
      result = result.filter((c) => c.type === selectedType);
    }

    // Filter by remodeling items
    if (selectedItems.length > 0) {
      result = result.filter((c) =>
        selectedItems.some((item) => c.items.includes(item))
      );
    }

    // Sort
    switch (sortBy) {
      case 'energySaving':
        result.sort((a, b) => b.energySavingRate - a.energySavingRate);
        break;
      case 'costEfficiency':
        result.sort((a, b) => {
          const aEfficiency = a.costSaving / a.totalCost;
          const bEfficiency = b.costSaving / b.totalCost;
          return bEfficiency - aEfficiency;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.review.rating - a.review.rating);
        break;
      case 'latest':
      default:
        result.sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime());
    }

    return result;
  }, [searchQuery, selectedType, selectedItems, sortBy]);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedItems([]);
    setSortBy('latest');
  };

  return (
    <AppLayout title="벤치마킹">
      <div className="space-y-6">
        {/* Search and Filter Section */}
        <Card className="border-0 shadow-sm p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="건물명, 지역으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <Select
                  value={selectedType}
                  onValueChange={(value) => setSelectedType(value as BuildingType | 'all')}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="건물 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 유형</SelectItem>
                    {Object.entries(BUILDING_TYPE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="정렬" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">최신순</SelectItem>
                    <SelectItem value="energySaving">에너지절감률순</SelectItem>
                    <SelectItem value="costEfficiency">비용효율순</SelectItem>
                    <SelectItem value="rating">평점순</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(searchQuery || selectedType !== 'all' || selectedItems.length > 0) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  필터 초기화
                </Button>
              )}
            </div>

            {/* Remodeling Items Filter */}
            <div className="flex flex-wrap gap-2">
              {allItems.slice(0, 10).map((item) => (
                <Badge
                  key={item}
                  variant={selectedItems.includes(item) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleItem(item)}
                >
                  {item}
                </Badge>
              ))}
              {allItems.length > 10 && (
                <Badge variant="secondary">+{allItems.length - 10}개</Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            총 <span className="font-semibold text-slate-900">{filteredCases.length}</span>개의 사례
          </p>
        </div>

        {/* Case Grid */}
        {filteredCases.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((caseData) => (
              <CaseCard key={caseData.id} caseData={caseData} />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-sm p-8 text-center">
            <p className="text-lg font-medium text-slate-600">검색 결과가 없습니다</p>
            <p className="text-sm text-slate-500 mt-1">다른 검색어나 필터를 시도해보세요</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              필터 초기화
            </Button>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
