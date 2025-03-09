"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DataTable } from "./data-table"
import { ChevronDown, ChevronUp, Database, FileSpreadsheet, Filter, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Navigation } from "@/components/dashboard/navigation"

interface DataFile {
  id: string
  name: string
  description: string
  color: string
  icon: React.ReactNode
}

export default function VisualizationsPage() {
  const [activeFile, setActiveFile] = useState<string>("structures")
  const [loading, setLoading] = useState<boolean>(true)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])

  const dataFiles: DataFile[] = [
    {
      id: "structures",
      name: "Structures",
      description: "Molecular structures and related data",
      color: "bg-blue-500",
      icon: <Database className="h-4 w-4" />,
    },
    {
      id: "act_table_fulls",
      name: "Activity Table",
      description: "Full activity data and measurements",
      color: "bg-purple-500",
      icon: <FileSpreadsheet className="h-4 w-4" />,
    },
    {
      id: "approvals",
      name: "Approval Data",
      description: "Drug approval status and information",
      color: "bg-green-500",
      icon: <Database className="h-4 w-4" />,
    },
    {
      id: "pdbs",
      name: "PDB Data",
      description: "Protein Data Bank information",
      color: "bg-amber-500",
      icon: <FileSpreadsheet className="h-4 w-4" />,
    },
    {
      id: "fearss",
      name: "Side Effects",
      description: "FDA Adverse Event Reporting System data",
      color: "bg-red-500",
      icon: <Database className="h-4 w-4" />,
    },
  ]

  // Store expanded state in localStorage to persist between renders
  useEffect(() => {
    const savedExpanded = localStorage.getItem("dataTableExpanded")
    if (savedExpanded) {
      setExpanded(JSON.parse(savedExpanded))
    }
  }, [])

  // Save expanded state when it changes
  useEffect(() => {
    localStorage.setItem("dataTableExpanded", JSON.stringify(expanded))
  }, [expanded])

  useEffect(() => {
    fetchData(activeFile)
  }, [activeFile])

  const fetchData = async (fileId: string) => {
    setLoading(true)
    try {
      // In a real implementation, you would fetch the actual CSV data
      const response = await fetch(`/api/csv?file=${fileId}&limit=${expanded ? 100 : 5}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
        setColumns(result.columns)
      } else {
        throw new Error(result.message || "Failed to load data")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
      setColumns([])
    } finally {
      setLoading(false)
    }
  }

  const toggleExpanded = () => {
    const newExpandedState = !expanded
    setExpanded(newExpandedState)
    fetchData(activeFile)
  }

  const refreshData = () => {
    fetchData(activeFile)
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      <Navigation />
      <main className="flex-1 p-4 overflow-y-auto">
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertTitle className="text-blue-700 font-medium">Dataset Information</AlertTitle>
          <AlertDescription className="text-blue-600">
            <p className="mb-2">Note: The actual datasets are much larger than whats displayed here:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>structures.csv: 258,997 rows</li>
              <li>act_table_fulls.csv: 20,979 rows</li>
              <li>approvals.csv: 3,916 rows</li>
              <li>pdbs.csv: 5,577 rows</li>
              <li>faers.csv: 364,936 rows</li>
            </ul>
            <p className="mt-2">
              For performance reasons, only a small sample is shown here.
            </p>
          </AlertDescription>
        </Alert>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Visualizations</h1>
            <p className="text-muted-foreground mt-1">Explore and analyze data from various CSV files</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {dataFiles.map((file) => (
            <Card
              key={file.id}
              className={`cursor-pointer transition-all hover:shadow-md ${activeFile === file.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setActiveFile(file.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={file.color + " hover:" + file.color}>
                    {file.icon}
                    <span className="ml-1">CSV</span>
                  </Badge>
                  {activeFile === file.id && (
                    <Badge variant="outline" className="bg-primary/10">
                      Active
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{file.name}</CardTitle>
                <CardDescription>{file.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">{expanded ? "100 rows" : "5 rows"} displayed</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">{dataFiles.find((f) => f.id === activeFile)?.name} Data</CardTitle>
                <CardDescription>
                  Showing {expanded ? "extended" : "top 5"} rows from {activeFile}.csv
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={toggleExpanded} className="flex items-center gap-1">
                {expanded ? (
                  <>
                                      <ChevronDown className="h-4 w-4" />
                    Show More

                  </>
                ) : (
                  <>
                                      <ChevronUp className="h-4 w-4" />
                    Show Less

                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <DataTable columns={columns} data={data} />
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Table View</CardTitle>
                <CardDescription>Detailed view with sorting, filtering, and pagination</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ) : data.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={data}
                    enableSorting={true}
                    enableFiltering={true}
                    enablePagination={true}
                  />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No data available for this file</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Data Statistics</CardTitle>
                <CardDescription>Statistical analysis of the selected dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Rows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {loading ? <Skeleton className="h-8 w-20" /> : data.length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Columns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {loading ? <Skeleton className="h-8 w-20" /> : columns.length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-md font-medium">
                        {loading ? <Skeleton className="h-8 w-32" /> : new Date().toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

