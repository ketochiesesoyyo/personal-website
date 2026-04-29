import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  return rss({
    title: "Henrick F. — Writing",
    description:
      "Long-form essays and case studies on AI, engineering, and where things are going.",
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.excerpt,
      link: `/writing/${post.id}/`,
      categories: [post.data.topic],
    })),
    customData: `<language>en-us</language>`,
  });
}
