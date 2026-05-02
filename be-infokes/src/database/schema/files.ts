import {
  mysqlTable,
  bigint,
  varchar,
  boolean,
  datetime,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const files = mysqlTable(
  "files",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .autoincrement()
      .primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    isFolder: boolean("is_folder").notNull().default(false),

    mimeType: varchar("mime_type", { length: 100 }),

    parentId: bigint("parent_id", { mode: "number", unsigned: true }),

    path: varchar("path", { length: 255 }).notNull(),

    size: bigint("size", { mode: "number", unsigned: true }).default(0),

    createdAt: datetime("created_at", { mode: "date" })
      .notNull()
      .default(new Date()),

    updatedAt: datetime("updated_at", { mode: "date" })
      .notNull()
      .default(new Date()),

    deletedAt: datetime("deleted_at", { mode: "date" }),

    createdBy: bigint("created_by", {
      mode: "number",
      unsigned: true,
    }).notNull(),

    updatedBy: bigint("updated_by", { mode: "number", unsigned: true }),

    deletedBy: bigint("deleted_by", { mode: "number", unsigned: true }),
  },
  (table) => ({
    parentFk: {
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "fk_files_parent",
    },

    uniqNameParent: uniqueIndex("uniq_name_parent").on(
      table.parentId,
      table.name,
      table.deletedAt,
    ),

    idxParent: index("idx_parent_id").on(table.parentId),
    idxPath: index("idx_path").on(table.path),
    idxDeletedAt: index("idx_deleted_at").on(table.deletedAt),
  }),
);
