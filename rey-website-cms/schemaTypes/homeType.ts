import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutLink',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'value',
          type: 'block',
        }),
      ],
    }),

  ],
})
