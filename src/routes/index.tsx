import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import type { Home as HomeType } from "../shared/types"
//SANITY
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types' //https://www.sanity.io/plugins/next-sanity-image
import { client } from "../shared/client"
//STYLES
import "../global.css"

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {

  //'Homepage' data
  const { data, error, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: () => client.fetch<HomeType>('*[_type == "home"][0]')
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>
  if (!data) return <div>No data found</div>

  return (
    <section className="h-screen w-screen bg-red-500 flex">
      <div className="w-1/2 h-auto bg-amber-300 ">
        {data.image?.asset && (
          <img
            src={urlFor(data.image).url()}
            alt={data.image?.asset.altText || 'Home image'}
            className="w-72 h-auto"
          />
        )}
      </div>
      <div className="w-1/2 h-auto items-center bg-amber-800">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint tempora aliquid odio provident repudiandae praesentium, iste exercitationem dolores aperiam iure nostrum, molestias fuga. Voluptatem vero quasi qui nihil quod cumque.
      </div>
    </section>
  )
}