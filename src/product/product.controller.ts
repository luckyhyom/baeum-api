import { Controller, Get } from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('/')
    getAllProducts(): Product[] {
        return this.productService.getAll();
    }
}
