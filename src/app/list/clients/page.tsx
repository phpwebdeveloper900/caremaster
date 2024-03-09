import { Client, columns } from "./columns"
import { DataTable } from "@/components/list/data-table"

async function getData(): Promise<Client[]> {
  const res = await fetch(
    'http://localhost:3000/api/v1/users'
  )
  const data = await res.json()
  return data['users']
}


export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
