import { defineArrayMember, defineField, defineType } from "sanity";

export const menuType = defineType({
  name: 'menu',
  title: "Menu",
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name:'slug',
      type: 'slug',
      options: {source: 'name'}
    }),
    defineField({
      name: 'heading',
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
    defineField({
      name: 'subHeading1',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'subHeading2',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
    defineField({
      name: 'git',
      type: 'url',
    }),
    defineField({
      name: 'linkedIn',
      type: 'url',
    }),
  ]
})