"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Search, Mail, Settings, BarChart3, Sparkles, Archive, Star } from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const recentCommands = [
  { id: 1, command: "Show urgent emails", icon: Mail, category: "Email" },
  { id: 2, command: "Generate response for Sarah", icon: Sparkles, category: "AI" },
  { id: 3, command: "Open analytics dashboard", icon: BarChart3, category: "Navigation" },
]

const suggestions = [
  { id: 1, command: "Archive all resolved emails", icon: Archive, category: "Bulk Actions" },
  { id: 2, command: "Set auto-reply for weekend", icon: Settings, category: "Settings" },
  { id: 3, command: "Show customer satisfaction trends", icon: BarChart3, category: "Analytics" },
  { id: 4, command: "Find emails from last week", icon: Search, category: "Search" },
  { id: 5, command: "Create new email template", icon: Sparkles, category: "Templates" },
  { id: 6, command: "Mark high priority emails", icon: Star, category: "Priority" },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const handleCommand = (command: string) => {
    console.log("Executing command:", command)
    onOpenChange(false)
    setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl bg-white/95 backdrop-blur-sm border-2 border-purple-200 shadow-2xl">
        <Command className="rounded-lg border-0">
          <div className="flex items-center border-b border-gray-200 px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
            <CommandInput
              placeholder="Type a command or search..."
              value={query}
              onValueChange={setQuery}
              className="border-0 focus:ring-0 text-base"
            />
            <Badge variant="outline" className="ml-auto text-xs">
              ⌘K
            </Badge>
          </div>
          <CommandList className="max-h-96">
            <CommandEmpty className="py-6 text-center text-sm text-gray-500">
              No results found for "{query}"
            </CommandEmpty>

            {query === "" && (
              <>
                <CommandGroup heading="Recent Commands">
                  {recentCommands.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleCommand(item.command)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 text-purple-600" />
                      <span className="flex-1">{item.command}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            <CommandGroup heading="Suggestions">
              {suggestions
                .filter((item) => item.command.toLowerCase().includes(query.toLowerCase()))
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleCommand(item.command)}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 cursor-pointer"
                  >
                    <item.icon className="w-4 h-4 text-blue-600" />
                    <span className="flex-1">{item.command}</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </CommandItem>
                ))}
            </CommandGroup>

            {query && (
              <>
                <CommandSeparator />
                <CommandGroup heading="AI Actions">
                  <CommandItem
                    onSelect={() => handleCommand(`Generate response for: ${query}`)}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="flex-1">Generate response for: {query}</span>
                    <Badge className="bg-green-100 text-green-700 text-xs">AI</Badge>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => handleCommand(`Search emails about: ${query}`)}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-blue-600" />
                    <span className="flex-1">Search emails about: {query}</span>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">Search</Badge>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
