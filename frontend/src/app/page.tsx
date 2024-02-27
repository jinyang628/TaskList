import Image from "next/image";
import getData from "@/lib/utils";
import { DataTable } from "./tasks/data-table";
import { columns } from "../app/tasks/columns"

export default async function Home() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
