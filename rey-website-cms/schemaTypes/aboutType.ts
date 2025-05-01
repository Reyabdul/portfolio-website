import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
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
      name: 'subHeading',
      type: 'string',
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
      name: 'content1Title',
      type: 'string'
    }),
    defineField({
      name: 'content1Content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'value',
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'content2Title',
      type: 'string'
    }),
    defineField({
      name: 'content2Content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'value',
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'content3Title',
      type: 'string'
    }),
    defineField({
      name: 'content3Content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'value',
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'philosophyWords',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ],
})
