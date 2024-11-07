import {z, ZodType} from "zod";
import {Product} from "../models";

export const ProductSchema: ZodType<Product> = z.object({
    title: z.string().min(1).max(100),
    category: z.string().min(1).max(200),
    employee: z.string().min(1),
    description: z.string().min(1).max(500),
    reviews: z.string().min(1).max(50).array(),
    price: z.number().min(1).max(5000)
});
