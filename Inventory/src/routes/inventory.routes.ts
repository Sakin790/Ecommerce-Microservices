import Router from "express";
import { Inventory } from "../controllrs/inventory.controller";

const router = Router();

router.route("/status").get(Inventory.inventoryStatus);
router.route("/inventory").get(Inventory.inventory);
router.route("/create-inventories").post(Inventory.createInventory);
router.route("/update-stock").post(Inventory.updateStock);
router.route("/reduce-stock").put(Inventory.reduceStock);

export { router };
