'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ArrowUpDown, Eye } from 'lucide-react';
import { Building, BUILDING_TYPE_LABELS, STATUS_LABELS, BuildingType, RemodelingStatus } from '@/types';
import { regions } from '@/data/regions';

interface BuildingTableProps {
  buildings: Building[];
  onSelectBuilding?: (building: Building) => void;
}

export function BuildingTable({ buildings, onSelectBuilding }: BuildingTableProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'priorityScore' | 'yearBuilt' | 'eui'>('priorityScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 필터링
  const filteredBuildings = buildings.filter((building) => {
    const matchesSearch =
      building.name.toLowerCase().includes(search.toLowerCase()) ||
      building.address.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || building.type === typeFilter;
    const matchesRegion = regionFilter === 'all' || building.region === regionFilter;
    const matchesStatus = statusFilter === 'all' || building.status === statusFilter;

    return matchesSearch && matchesType && matchesRegion && matchesStatus;
  });

  // 정렬
  const sortedBuildings = [...filteredBuildings].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-emerald-600 bg-emerald-50';
  };

  const getStatusBadge = (status: RemodelingStatus) => {
    const variants: Record<RemodelingStatus, 'default' | 'secondary' | 'destructive'> = {
      completed: 'default',
      in_progress: 'secondary',
      pending: 'destructive',
    };
    return (
      <Badge variant={variants[status]} className="text-xs">
        {STATUS_LABELS[status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="건물명, 주소 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="건물 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 유형</SelectItem>
            <SelectItem value="senior_center">경로당</SelectItem>
            <SelectItem value="daycare">어린이집</SelectItem>
            <SelectItem value="health_center">보건소</SelectItem>
          </SelectContent>
        </Select>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="지역" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 지역</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region.code} value={region.name}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="pending">대기</SelectItem>
            <SelectItem value="in_progress">진행중</SelectItem>
            <SelectItem value="completed">완료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-500">
        총 {sortedBuildings.length}개 건물
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">순위</TableHead>
              <TableHead>건물명</TableHead>
              <TableHead>유형</TableHead>
              <TableHead>지역</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('yearBuilt')}
                  className="-ml-3 h-8 gap-1"
                >
                  준공연도
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('eui')}
                  className="-ml-3 h-8 gap-1"
                >
                  EUI
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>상태</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('priorityScore')}
                  className="-ml-3 h-8 gap-1"
                >
                  우선순위
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[80px]">상세</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBuildings.slice(0, 50).map((building, index) => (
              <TableRow
                key={building.id}
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => onSelectBuilding?.(building)}
              >
                <TableCell className="font-medium text-slate-500">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div>
                    <span className="font-medium">{building.name}</span>
                    <p className="text-xs text-slate-500">{building.address}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {BUILDING_TYPE_LABELS[building.type]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {building.region}
                  <br />
                  <span className="text-slate-500">{building.district}</span>
                </TableCell>
                <TableCell>{building.yearBuilt}년</TableCell>
                <TableCell>{building.eui} kWh/㎡</TableCell>
                <TableCell>{getStatusBadge(building.status)}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold ${getScoreColor(building.priorityScore)}`}>
                    {building.priorityScore}점
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/priority/${building.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
