import { Category } from 'src/category/category.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  productName: string;

  @Column({ type: 'varchar', length: 25 })
  productOrigin: string;

  @Column()
  productPrice: number;

  @Column({ default: false })
  hasDiscount: boolean;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];
}
