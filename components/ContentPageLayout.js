import { useRouter } from 'next/router';
import { Meta } from './Meta';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function ContentPageLayout({
  title,
  content,
  description,
  image,
  children,
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Meta
        title={title}
        description={description}
        image={image}
        url={router.asPath}
      />
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
          <section>
            <div className="mb-6 text-lg prose prose-lg">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {content}
              </ReactMarkdown>
              {children}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
