'use client';

import { AppLayout } from '@/components/layout';
import { StatsCards, PriorityList, BuildingTypeChart, RecentActivity } from '@/components/dashboard';
import { BuildingMap } from '@/components/map/BuildingMap';
import { buildings, getBuildingStats, getTopPriorityBuildings } from '@/data/buildings';

export default function DashboardPage() {
  const stats = getBuildingStats();
  const topBuildings = getTopPriorityBuildings(5);

  return (
    <AppLayout title="대시보드">
      <div className="space-y-6">
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Priority List */}
          <div className="lg:col-span-2">
            <PriorityList buildings={topBuildings} />
          </div>

          {/* Building Type Chart */}
          <div>
            <BuildingTypeChart buildings={buildings} />
          </div>
        </div>

        {/* Map and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <BuildingMap buildings={buildings.slice(0, 100)} height="400px" />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
