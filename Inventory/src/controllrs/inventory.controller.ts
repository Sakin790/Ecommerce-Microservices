import type { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { db } from "..";
import { inventoryTable } from "../db/schema";
import { eq, sql } from "drizzle-orm";
interface InventoryRequestBody {
  name: string;
  stock: number;
  warehouse_location: string;
  last_updated: Date;
}

class Inventory {
  static inventoryStatus = asyncHandler(async (req: Request, res: Response) => {
    try {
      return res.json(new ApiResponse(200, {}, "Inventory Status Perfect"));
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong when trying to load the inventory Status"
          )
        );
    }
  });

  static inventory = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await db.select().from(inventoryTable);
      return res.json(new ApiResponse(200, result, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong when trying to load the inventory"
          )
        );
    }
  });

  static createInventory = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { name, stock, warehouse_location } = req.body;
      const newInventory: InventoryRequestBody = {
        name,
        stock,
        warehouse_location,
        last_updated: new Date(),
      };

      const result = await db.insert(inventoryTable).values(newInventory);
      return res
        .status(201)
        .json(new ApiResponse(200, result, "Inventory Created Successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong when trying to create the inventory"
          )
        );
    }
  });

  static updateStock = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id, stock } = req.body;
      const result = await db
        .update(inventoryTable)
        .set({
          stock: sql`${inventoryTable.stock} + ${stock}`,
          last_updated: new Date(),
        })
        .where(eq(inventoryTable.id, id));
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json(new ApiError(404, "Inventory item not found"));
      }

      return res.json(
        new ApiResponse(200, result, "Stock updated successfully")
      );
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong when trying to update the stock"
          )
        );
    }
  });

  static reduceStock = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id, stock } = req.body;
      const result = await db
        .update(inventoryTable)
        .set({
          stock: sql`${inventoryTable.stock} - ${stock}`,
          last_updated: new Date(),
        })
        .where(eq(inventoryTable.id, id));
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json(new ApiError(404, "Inventory item not found"));
      }

      return res.json(
        new ApiResponse(200, result, "Stock Reduce successfully")
      );
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong when trying to update the stock"
          )
        );
    }
  });

  static getStock = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await db
        .select({
          stock: inventoryTable.stock,
        })
        .from(inventoryTable);
      return res.json(
        new ApiResponse(200, result, "Stock Returned successfully")
      );
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiError(500, "Something went wrong when trying to Get the stock")
        );
    }
  });
}
export { Inventory };
