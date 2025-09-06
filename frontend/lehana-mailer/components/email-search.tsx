import { Search, Filter, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function EmailSearch() {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search emails, senders, or content..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>All Emails</DropdownMenuItem>
            <DropdownMenuItem>Unread Only</DropdownMenuItem>
            <DropdownMenuItem>With Attachments</DropdownMenuItem>
            <DropdownMenuItem>This Week</DropdownMenuItem>
            <DropdownMenuItem>High Priority</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Newest First</DropdownMenuItem>
            <DropdownMenuItem>Oldest First</DropdownMenuItem>
            <DropdownMenuItem>Priority</DropdownMenuItem>
            <DropdownMenuItem>Sender A-Z</DropdownMenuItem>
            <DropdownMenuItem>Subject A-Z</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters */}
      <div className="flex items-center space-x-2 mt-3">
        <span className="text-sm text-gray-600">Active filters:</span>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          Unread
          <button className="ml-1 hover:bg-purple-200 rounded-full p-0.5">×</button>
        </Badge>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          High Priority
          <button className="ml-1 hover:bg-blue-200 rounded-full p-0.5">×</button>
        </Badge>
      </div>
    </div>
  )
}
