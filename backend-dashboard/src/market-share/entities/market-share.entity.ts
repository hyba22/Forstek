// src/market-share/entities/market-share.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MarketShare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column('float')
  value: number;
}