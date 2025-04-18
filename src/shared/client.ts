import {createClient, type ClientConfig} from '@sanity/client'


const config: ClientConfig = {
  projectId: '9mnm361m',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2025-02-06', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
}
export const client = createClient(config)

