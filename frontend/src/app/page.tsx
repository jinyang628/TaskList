import { DataTable } from "./tasks/data-table";
import { columns } from "../app/tasks/columns"
import { getTasks } from "@/api/getTasks";

export default async function Home() {
  const data = await getTasks();
  console.log(data);
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
