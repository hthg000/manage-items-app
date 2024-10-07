import { IsNotEmpty, IsString } from "class-validator";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn() // This column is used for soft deletes
    deleted_at?: Date;
}
