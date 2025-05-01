import { DefineArrayMember, defineField, defineType } from "sanity";

export const mediaType = defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug'
    }),
  ]
})