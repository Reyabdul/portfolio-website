import {createClient, type ClientConfig} from '@sanity/client'

const config: ClientConfig = {
  projectId: '9mnm361m',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  apiVersion: '2024-03-13', // Use a recent stable API version
  token: process.env.SANITY_API_TOKEN, // Add token for authenticated requests
}

export const client = createClient(config)

