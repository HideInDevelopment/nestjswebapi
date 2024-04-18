import { Worker } from 'src/worker/worker.entity';
import { Zone } from 'src/zone/zone.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  storeName: string;

  @Column({ type: 'varchar', length: 100 })
  storeLocation: string;

  @OneToMany(() => Worker, (worker) => worker.store)
  workers: Worker[];

  @ManyToMany(() => Zone, (zone) => zone.stores)
  @JoinTable()
  zones: Zone[];
}
