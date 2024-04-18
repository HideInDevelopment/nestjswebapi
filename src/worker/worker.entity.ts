import { Store } from 'src/store/store.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  workerName: string;

  @Column({ type: 'varchar', length: 50 })
  workerPosition: string;

  @Column()
  workerAntique: number;

  @Column()
  workerSalary: number;

  @Column({ type: 'date', nullable: true, default: null })
  workerEndingDate: Date;

  @ManyToOne(() => Store, (store) => store.workers)
  store: Store;
}
