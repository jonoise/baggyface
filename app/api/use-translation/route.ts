import * as path from 'path'
import * as util from 'util'
import { exec } from 'child_process'

import { NextRequest, NextResponse } from 'next/server'

async function generateTypeScriptTypings(
  jsonFilePath: string,
  outputFilePath: string
): Promise<void> {
  try {
    // Run quicktype to generate TypeScript typings
    const quicktypeCommand = `quicktype --lang=typescript --src ${jsonFilePath} --out ${outputFilePath}`
    await util.promisify(exec)(quicktypeCommand)

    console.log(
      `TypeScript typings have been generated successfully and saved to "${outputFilePath}".`
    )
  } catch (error) {
    console.error('Error:', error)
  }
}
export const GET = async (req: NextRequest) => {
  const jsonFilePath = path.join(process.cwd(), 'lib/dictionaries/en.json')
  const outputFilePath = path.join(process.cwd(), 'lib/dictionaries/en.ts')

  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ inprod: true })
  }

  await generateTypeScriptTypings(jsonFilePath, outputFilePath)

  return NextResponse.json({ ok: true })
}
