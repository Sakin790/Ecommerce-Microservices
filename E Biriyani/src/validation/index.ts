import { z } from "zod";

const inventorySchema = z.object({
  name: z.string(),
  stock: z.number().int(),
  warehouse_location: z.string(),
});

export { inventorySchema };
