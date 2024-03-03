/*
  Warnings:

  - You are about to drop the `Webhooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Webhooks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WebhookToWorkspace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_WebhookToWorkspace_A_fkey" FOREIGN KEY ("A") REFERENCES "Webhook" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_WebhookToWorkspace_B_fkey" FOREIGN KEY ("B") REFERENCES "Workspace" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_WebhookToWorkspace_AB_unique" ON "_WebhookToWorkspace"("A", "B");

-- CreateIndex
CREATE INDEX "_WebhookToWorkspace_B_index" ON "_WebhookToWorkspace"("B");
