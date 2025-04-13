import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Dashboard } from './entities/dashboard.entity';
import { CreateDashboardDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
  private dashboards: Dashboard[] = [];
  private lastId = 0;

  create(createDashboardDto: CreateDashboardDto): Dashboard {
    const newDashboard: Dashboard = {
      id: ++this.lastId,
      ...createDashboardDto,
      createdAt: new Date(),
    };
    this.dashboards.push(newDashboard);
    return newDashboard;
  }

  findAll(): Dashboard[] {
    return this.dashboards;
  }

  findOne(id: number): Dashboard {
    const dashboard = this.dashboards.find(d => d.id === id);
    if (!dashboard) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }
    return dashboard;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto): Dashboard {
    const index = this.dashboards.findIndex(d => d.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }

    this.dashboards[index] = {
      ...this.dashboards[index],
      ...updateDashboardDto,
      updatedAt: new Date()
    };

    return this.dashboards[index];
  }

  remove(id: number): void {
    const index = this.dashboards.findIndex(d => d.id === id);
    if (index === -1) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }
    this.dashboards.splice(index, 1);
  }

  getDashboardData() {
    return [
      {
        color: ['#FF7F50', '#FF6347'],
        title: 'Total Revenue',
        amount: '$12,345',
        grow: true,
        icon: null,
      },
      {
        color: ['#4682B4', '#1E90FF'],
        title: 'Total Users',
        amount: '1,234',
        grow: true,
        icon: null,
      },
      {
        color: ['#32CD32', '#2E8B57'],
        title: 'Total Orders',
        amount: '567',
        grow: false,
        icon: null,
      }
    ];
  }
}