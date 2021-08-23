import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {

    private products: Product[] = [];

    getAll(): Product[] {
        return  this.products;
    }
}
