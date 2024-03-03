-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Webhook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Webhook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Webhook" ("id", "name", "url") SELECT "id", "name", "url" FROM "Webhook";
DROP TABLE "Webhook";
ALTER TABLE "new_Webhook" RENAME TO "Webhook";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
