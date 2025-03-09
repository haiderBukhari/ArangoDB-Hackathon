import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const file = searchParams.get('file')
  const limit = parseInt(searchParams.get('limit') || '5')
  
  if (!file) {
    return NextResponse.json({ success: false, message: 'File parameter is required' }, { status: 400 })
  }
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', `${file}.csv`)
    
    // Read the file
    const fileContent = fs.readFileSync(filePath, 'utf8')

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    })
    
    const columns = Object.keys(records[0] || {}).map(key => ({
      accessorKey: key,
      header: key
    }))
    
    return NextResponse.json({
      success: true,
      columns,
      data: records.slice(0, limit)
    })
  } catch (error) {
    console.error('Error reading CSV file:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error reading CSV file',
        error: (error as Error).message
      }, 
      { status: 500 }
    )
  }
}
