import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { getPieceBySlug, pieceArticles } from "@/content/piecesContent";

type PiecePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pieceArticles.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: PiecePageProps): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);

  if (!piece) {
    return {
      title: "Piece Not Found | Doyle Omachonu",
    };
  }

  return {
    title: `${piece.title} | Doyle Omachonu`,
    description: piece.description,
  };
}

export default async function PiecePage({ params }: PiecePageProps) {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);

  if (!piece) {
    notFound();
  }

  return (
    <SmoothScroll>
      <Header />
      <main className="min-h-screen bg-[#fafafa] text-black pt-24 md:pt-40 pb-12 md:pb-20 px-6 md:px-0">
        <article className="max-w-3xl mx-auto font-inter">
          <div className="mb-10 md:mb-14">
            <Link
              href="/pieces"
              className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] font-oswald text-gray-500 hover:text-black transition-colors"
            >
              Back to Pieces
            </Link>
          </div>

          <div className="mb-8 md:mb-10">
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-5">
              <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 font-oswald">
                {piece.category}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">{piece.date}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-oswald">{piece.source}</span>
            </div>

            <h1 className="text-3xl md:text-6xl font-oswald uppercase leading-[1.05] tracking-tight mb-5">
              {piece.title}
            </h1>

            <p className="text-base md:text-xl text-gray-600 leading-relaxed">{piece.description}</p>
          </div>

          <div className="bg-white border border-gray-100 px-5 py-6 md:px-8 md:py-8 mb-8 md:mb-10">
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">{piece.intro}</p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {piece.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl md:text-3xl font-oswald uppercase tracking-tight mb-3 md:mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-base md:text-xl text-gray-800 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 md:mt-14 pt-8 border-t border-gray-200">
            <p className="text-base md:text-xl text-gray-900 leading-relaxed">{piece.closing}</p>
          </div>
        </article>
      </main>
    </SmoothScroll>
  );
}
