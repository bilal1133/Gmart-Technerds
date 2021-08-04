import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Banners } from './Banners';
import {Products} from "./Products";

@Entity({ name: "BannerProducts" })
export class BannerProducts {
    @ManyToOne(type => Banners, banner => banner.id, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_banner', referencedColumnName: 'id' })
    id_banner: Banners

    @ManyToOne(type => Products, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_product', referencedColumnName: 'id' })
    id_product: Products
}