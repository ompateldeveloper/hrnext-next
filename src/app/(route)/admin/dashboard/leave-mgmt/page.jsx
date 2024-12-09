"use client"

import { useState } from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

import { columns, } from "./columns"

const data = [
  { id: "1", employeeName: "John Doe", startDate: "2023-12-10", endDate: "2023-12-15", status: "pending" },
  { id: "2", employeeName: "Jane Smith", startDate: "2023-12-20", endDate: "2023-12-22", status: "approved" },
  { id: "3", employeeName: "Bob Johnson", startDate: "2024-01-05", endDate: "2024-01-10", status: "rejected" },
  { id: "4", employeeName: "Alice Brown", startDate: "2024-01-15", endDate: "2024-01-20", status: "pending" },
  { id: "5", employeeName: "Charlie Davis", startDate: "2024-02-01", endDate: "2024-02-03", status: "pending" },
]

export default function AdminLeaveTable() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState(null)

  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleBulkAction = (action) => {
    setBulkAction(action)
    setIsAlertOpen(true)
  }

  const executeBulkAction = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    selectedRows.forEach((row) => {
      const leaveRequest = row.original
      console.log(`${bulkAction === "approve" ? "Approved" : "Rejected"} leave for ${leaveRequest.employeeName}`)
      // Implement your bulk action logic here
    })
    setIsAlertOpen(false)
    setRowSelection({})
  }

  return (
    <div className="w-full px-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter employees..."
          value={(table.getColumn("employeeName")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("employeeName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Bulk Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose action</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleBulkAction("approve")}>Approve Selected</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkAction("reject")}>Reject Selected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to {bulkAction} the selected leave requests?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will {bulkAction} all selected leave requests.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeBulkAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

