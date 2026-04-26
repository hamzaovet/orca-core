import { products } from "@/lib/productSlides";
import { notFound } from "next/navigation";
import ProductPresentation from "./ProductPresentation";

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Validate slug server-side; client component imports data directly
  if (!products[slug]) notFound();

  return <ProductPresentation slug={slug} />;
}
