/*
  Warnings:

  - You are about to drop the column `channel` on the `Notify` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notify" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "body" TEXT NOT NULL,
    "icon" TEXT,
    "provider" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "workspaceId" TEXT,
    CONSTRAINT "Notify_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Notify" ("body", "createdAt", "createdById", "description", "icon", "id", "name", "provider", "updatedAt", "workspaceId") SELECT "body", "createdAt", "createdById", "description", "icon", "id", "name", "provider", "updatedAt", "workspaceId" FROM "Notify";
DROP TABLE "Notify";
ALTER TABLE "new_Notify" RENAME TO "Notify";
CREATE INDEX "createdById_idx" ON "Notify"("createdById");
CREATE INDEX "name_idx" ON "Notify"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
