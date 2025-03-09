"use client"

import { Navigation } from "@/components/dashboard/navigation"
import Markdown from "@/components/markdown"
import { QuerySuggestionsDialog } from "@/components/query-suggestions-dialog"
import { HtmlRenderer } from "@/components/html-renderer"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BotMessageSquare, ChevronDown, ChevronUp, Lightbulb, Loader, Send, Table, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  sender: string
  text: string
  isLoading: boolean
  details: string
  tableHtml?: string | null
  tableLoading?: boolean
}

const Page = () => {
  const fields = ["HubSpot", "Jira", "Mailchimp", "Pipedrive", "Salesforce", "Slack"]

  const colors = [
    "#00C000",
    "#00C0C0",
    "#C0C000",
    "#C0C0C0",
    "#808080",
    "#C000C0",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#008080",
    "#C0C0C0",
    "#000080",
    "#0000C0",
  ]

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [expandedMessageIndex, setExpandedMessageIndex] = useState<number | null>(null)
  const [isQueryDialogOpen, setIsQueryDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleMessageDetail = (index: number) => {
    if (expandedMessageIndex === index) {
      setExpandedMessageIndex(null)
    } else {
      setExpandedMessageIndex(index)
    }
  }

  // Function to extract table HTML and styles from response
  const cleanResponse = (response: string): string | null => {
    const regex = /(<style>.*?<\/style>\s*<table>.*?<\/table>)/s
    const matches = response.match(regex)
    return matches ? matches[1] : null
  }

  const handleSendMessage = async (text = inputValue) => {
    if (text.trim() === "") return

    setIsLoading(true)

    // Initial message state with loading
    const updatedMessages = [
      ...messages,
      {
        sender: "User",
        text: text,
        isLoading: false,
        details: "",
      },
      {
        sender: "assistant",
        text: "",
        isLoading: true,
        details: "",
        tableLoading: false,
      },
    ]

    setMessages(updatedMessages)
    setInputValue("")

    try {
      // First API call for text response
      const initialResponse = await axios.post(
        "https://pharmacraphx-backend-446baf14c437.herokuapp.com/query",
        { query: text },
        { headers: { "Content-Type": "application/json" } },
      )

      // Update with text response and show table loading
      const textResponseMessage = {
        sender: "assistant",
        text: initialResponse.data.response,
        isLoading: false,
        details: "",
        tableLoading: true,
      }

      setMessages([
        ...messages,
        {
          sender: "User",
          text: text,
          isLoading: false,
          details: "",
        },
        textResponseMessage,
      ])

      // Second API call for table visualization
      const tableResponse = await axios.post(
        "https://pharmacraphx-backend-446baf14c437.herokuapp.com/query",
        {
          query: `can you generate the table for the following query ${initialResponse.data.response}`,
        },
        { headers: { "Content-Type": "application/json" } },
      )

      const cleanedTable = cleanResponse(tableResponse.data.response)

      // Final message with both text and table
      const finalMessage = {
        sender: "assistant",
        text: initialResponse.data.response,
        isLoading: false,
        details: "Show table visualization",
        tableHtml: cleanedTable,
        tableLoading: false,
      }

      setMessages([
        ...messages,
        {
          sender: "User",
          text: text,
          isLoading: false,
          details: "",
        },
        finalMessage,
      ])
    } catch (err) {
      console.error("Error processing query:", err)
      // Handle error
      const errorMessage = {
        sender: "assistant",
        text: "Sorry, I encountered an error processing your request. Please try again.",
        isLoading: false,
        details: "",
      }

      setMessages([
        ...messages,
        {
          sender: "User",
          text: text,
          isLoading: false,
          details: "",
        },
        errorMessage,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuerySelection = (query: string) => {
    setIsQueryDialogOpen(false)
    handleSendMessage(query)
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 p-4">
        {!messages.length ? (
          <div className="w-full flex flex-col min-h-[500px] justify-center items-center px-3">
            <h1 className="text-3xl font-semibold">How can I help you?</h1>
            <div className="relative max-w-[700px] w-full mt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Message Langchain Integry Bot"
                  className="w-full bg-[#F1F1F1] h-[60px] text-black outline-none focus:ring-2 focus:ring-primary px-4 rounded-xl pr-12 border-2 border-gray-300"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-[60px] w-[60px] border-2 border-gray-300 bg-[#F1F1F1] hover:bg-gray-200"
                        onClick={() => setIsQueryDialogOpen(true)}
                      >
                        <Lightbulb className="text-primary" size={24} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get Query Suggestion</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div
                className={`rounded-full absolute right-[70px] bottom-2 cursor-pointer hover:opacity-70 p-1.5 ${
                  inputValue.trim() !== "" ? "bg-primary" : "bg-gray-600"
                }`}
                onClick={() => handleSendMessage()}
              >
                <Send className="text-white" size={20} />
              </div>
            </div>
            <p className="h-[60px] text-[#111] leading-6 w-full max-w-[600px] mt-5 text-center px-4 rounded-xl">
              The Integry Langchain Bot supports over 300 tools, streamlining integration and reducing developer effort
              for AI-driven products and SaaS.
            </p>
            <div className="flex flex-wrap justify-center items-center mt-4 max-w-[500px] gap-5">
              {fields.map((field, index) => (
                <div
                  key={field}
                  style={{
                    border: `1px solid ${colors[index % colors.length]}`,
                  }}
                  className="px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span>{field}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col min-h-[94vh] max-h-[94vh] overflow-hidden max-w-[800px] mx-auto px-4">
            <div className="flex-1 overflow-y-auto scrollable pt-5 pb-4">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`mb-6 flex items-start ${message.sender === "User" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "assistant" && (
                    <div className="mr-2 p-2 rounded-full bg-primary/10 flex-shrink-0">
                      <BotMessageSquare size={18} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`inline-block p-4 max-w-[80%] rounded-lg shadow-sm ${
                      message.sender === "User" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader className="animate-spin" size={16} />
                        <span>Executing Langchain agent...</span>
                      </div>
                    ) : (
                      <div>
                        {message.sender === "User" ? (
                          <p>{message.text}</p>
                        ) : (
                          <div>
                            <div className="prose prose-sm max-w-none">
                              {message.sender === "user" ? message.text : <Markdown markdown={message.text} />}
                            </div>

                            {message.tableLoading && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <Loader className="animate-spin" size={12} />
                                  <span>Generating table visualization...</span>
                                </div>
                              </div>
                            )}

                            {message.tableHtml && !message.tableLoading && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <button
                                  className="flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                                  onClick={() => toggleMessageDetail(index)}
                                >
                                  {expandedMessageIndex === index ? (
                                    <>
                                      <ChevronUp size={14} className="mr-1" />
                                      Hide table visualization
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown size={14} className="mr-1" />
                                      <Table size={14} className="mr-1" />
                                      Show table visualization
                                    </>
                                  )}
                                </button>

                                {expandedMessageIndex === index && (
                                  <div className="mt-2">
                                    <HtmlRenderer htmlContent={message.tableHtml} />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {message.sender === "User" && (
                    <div className="ml-2 p-2 rounded-full bg-gray-100 flex-shrink-0">
                      <User size={18} className="text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="relative w-full mt-auto pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Message Integry Langchain Bot"
                  className="w-full bg-[#F1F1F1] h-[60px] text-black outline-none focus:ring-2 focus:ring-primary px-4 rounded-xl pr-12 border-2 border-gray-300"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleSendMessage()
                    }
                  }}
                  disabled={isLoading}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-[60px] w-[60px] border-2 border-gray-300 bg-[#F1F1F1] hover:bg-gray-200"
                        onClick={() => setIsQueryDialogOpen(true)}
                        disabled={isLoading}
                      >
                        <Lightbulb className="text-primary" size={24} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get Query Suggestion</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <button
                className={`rounded-full absolute right-[70px] bottom-2 cursor-pointer hover:opacity-70 p-1.5 ${
                  inputValue.trim() !== "" && !isLoading ? "bg-primary" : "bg-gray-600"
                }`}
                onClick={() => handleSendMessage()}
                disabled={inputValue.trim() === "" || isLoading}
              >
                {isLoading ? (
                  <Loader className="text-white animate-spin" size={20} />
                ) : (
                  <Send className="text-white" size={20} />
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      <QuerySuggestionsDialog
        isOpen={isQueryDialogOpen}
        onClose={() => setIsQueryDialogOpen(false)}
        onSelectQuery={handleQuerySelection}
      />
    </div>
  )
}

export default Page