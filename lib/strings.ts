export const deslugify = (slug: string) =>
  slug
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')

export const stripLocale = (str: string) => str.split('/').slice(2).join('/')
