import HeroSection     from '@/components/home/HeroSection';
import CategoryCards   from '@/components/home/CategoryCards';
import ProductShowcase from '@/components/home/ProductShowcase';
import HotDeals        from '@/components/home/HotDeals';
import { BuyOnlineBanner, LatestUpdates, BrandLogos } from '@/components/home/Extras';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchData(path) {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [categoriesData, featuredData, specialData, popularData, dealsData, blogsData] = await Promise.all([
    fetchData('/categories'),
    fetchData('/products?tag=featured&limit=4'),
    fetchData('/products?tag=special&limit=4'),
    fetchData('/products?tag=popular&limit=4'),
    fetchData('/deals'),
    fetchData('/blogs'),
  ]);

  return (
    <>
      <HeroSection />
      <CategoryCards   categories={categoriesData?.categories} />
      <ProductShowcase
        featured={featuredData?.products || []}
        special={specialData?.products  || []}
        popular={popularData?.products  || []}
      />
      <HotDeals deals={dealsData?.deals} />
      <BuyOnlineBanner />
      <LatestUpdates blogs={blogsData?.blogs} />
      <BrandLogos />
    </>
  );
}
