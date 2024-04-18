import { Product } from 'src/product/product.entity';
import { Zone } from 'src/zone/zone.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  categoryName: string;

  @ManyToMany(() => Zone, (zone) => zone.categories)
  zones: Zone[];

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
