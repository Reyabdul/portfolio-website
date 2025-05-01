import {defineArrayMember, defineField, defineType} from 'sanity'

export const worksType = defineType({
  name: 'works',
  title: 'Works',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'year',
      type: 'string',
    }),
    defineField({
      name: 'client',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'url'
    }),
    defineField({
      name: 'git',
      type: 'url'
    }),
    defineField({
      name: 'figma',
      type: 'url'
    }),
    
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
      ],
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
