import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponent";
import { fullBlog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";

export const revalidate = 30; // ISR every 30s

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      title,
      content,
      thumbnail
    }[0]`;
  const data = await client.fetch(query);
  return data;
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogArticle({ params }: PageProps) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Jan Marshal - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.thumbnail).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} components={portableTextComponents} />
      </div>
    </div>
  );
}

// ✅ REQUIRED FOR DYNAMIC ROUTES
export async function generateStaticParams() {
  const query = `*[_type == "blog"]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);

  return slugs.map((slug: { slug: string }) => ({
    slug: slug.slug,
  }));
}
