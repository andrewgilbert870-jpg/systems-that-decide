import Parser from 'rss-parser'

export type RSSItem = {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  categories: string[]
}

const parser = new Parser()

export async function fetchPosts(): Promise<RSSItem[]> {
  try {
    const feed = await parser.parseURL('https://systemsthatdecide.substack.com/feed')
    return (feed.items || []).slice(0, 20).map((item) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      contentSnippet: (item.contentSnippet || '').slice(0, 280),
      categories: Array.isArray(item.categories) ? item.categories : [],
    }))
  } catch (err) {
    console.error('[RSS] fetch failed:', err)
    return []
  }
}
