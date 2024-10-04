import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not set')
}

export const openai = new OpenAI({ apiKey })

export const makeEmbeddings = async (text: string) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })

  const embeddings = response.data[0].embedding

  if (!embeddings) {
    throw new Error('Embeddings not found')
  }

  return embeddings
}
