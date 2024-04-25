import { Category } from 'src/category/category.entity';
import { Store } from 'src/store/store.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  zoneName: string;

  @Column()
  zoneSurface: number;

  @Column()
  isActive: boolean;

  @ManyToMany(() => Store, (store) => store.zones)
  stores: Store[];

  @ManyToMany(() => Category, (category) => category.zones)
  @JoinTable()
  categories: Category[];
}
