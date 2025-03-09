"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink } from "lucide-react"

interface QuerySuggestionsDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectQuery: (query: string) => void
}

export function QuerySuggestionsDialog({ isOpen, onClose, onSelectQuery }: QuerySuggestionsDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const suggestedQueries = [
    "can you share all the drug names listed?",
    "can you give the detail information of drug name selpercatinib",
    "can you give the detail information of side effect of drug selpercatinib",
    "Find all drugs that target the gene SLC47A1, have a side effect, and are approved",
    "Find all protein which is linked to the gene Atp2a2",
    "Find all drugs which is linked to the gene Atp2a2",
    "Which targets does Drug fluvastatin interact with?",
    "Is Drug selpercatinib approved, and by whom?",
    "Which drugs are linked to Side Effect Tumour associated fever",
    "Which protein structures does Drug glibenclamide bind to",
    "What are the major drug interaction clusters",
    "can you tell me what is the shortest connection between Drug glibenclamide and selpercatinib",
    "Can you find drugs that interact with more than 3 targets",
    "Which drugs with a molecular weight greater than 500 have side effects limit to top 5 result?",
    "can you tell more about the drug palbociclib",
    "Find the most central nodes in the graph",
  ]

  const filteredQueries = suggestedQueries.filter((query) => query.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Suggested Queries</DialogTitle>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search queries..."
              className="w-full bg-gray-100 h-10 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {filteredQueries.map((query, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors flex justify-between items-center group cursor-pointer"
              onClick={() => onSelectQuery(query)}
            >
              <p className="text-sm text-gray-800 flex-1 mr-2">{query}</p>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectQuery(query)
                }}
              >
                <ExternalLink size={16} />
              </Button>
            </div>
          ))}
          {filteredQueries.length === 0 && (
            <div className="p-4 text-center text-gray-500">No matching queries found</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
