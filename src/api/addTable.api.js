import express from "express";
import { AddTableController } from "../controller";
import AuthMiddlaware from "../auth/auth.middlware";

const router = express.Router();

router.get(
  "/allTableName",
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  AddTableController.getAllTableName
);
router.post(
  "/addColumn",
  AuthMiddlaware.authenticateFor(["Admin"]),
  AddTableController.addColumn
);
router.post(
  "/b/:table_name",
  AuthMiddlaware.authenticateFor(["Admin"]),
  AddTableController.addTable
);

router.get(
  "/notNullColumns/:table_name",
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  AddTableController.getNotNullColumns
);

router.delete(
  "/:table_name",
  AuthMiddlaware.authenticateFor(["Admin"]),
  AddTableController.removeTable
);
router.get(
  "/b/:table_name/:isActive",
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  AddTableController.getTable
);
router.post(
  "/addValue/:table_name",
  AuthMiddlaware.authenticateFor(["Admin"]),
  AddTableController.addValue
);

router.get(
  "/incrementColumns/:table_name",
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  AddTableController.getIncrementColumns
);

router.get(
  "/tableActiveCols/:table_name",
  AuthMiddlaware.authenticateFor(["Admin", "User"]),
  AddTableController.getActiveColumns
);

router.put(
  "/:table_name",
  AuthMiddlaware.authenticateFor(["Admin"]),
  AddTableController.updateTable
)

export default router;
