import {z} from "zod";

export const ProductSchema = z.object({
    title: z.string().min(1, {message: "Il campo é obbligatorio"}).max(100),
    category: z.string().min(1, {message: "Il campo é obbligatorio"}).max(200),
    employee: z.string().min(1, {message: "Il campo é obbligatorio"}),
    description: z.string().min(1, {message: "Il campo é obbligatorio"}).max(500),
    reviews: z.preprocess(
        (val) => `${val}`.split(",").map((i) => i.trim()),
        z.array(z.string().min(1, {message: "Il campo é obbligatorio"})).max(50)
    ),
    price: z.number().min(1, {message: "Il campo é obbligatorio"}).max(5000)
});
