import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    const response = await fetch(
      `https://api.hacienda.go.cr/indicadores/tc/dolar`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,/;q=0.8',
          'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          Connection: 'keep-alive',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Sec-GPC': '1',
        },
      }
    )
    const data = await response.json()
    return NextResponse.json(data.venta.valor)
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error' }, { status: 500 })
  }
}
