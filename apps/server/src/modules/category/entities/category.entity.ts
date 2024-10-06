import { IsNotEmpty, IsString } from "class-validator";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    category_name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
