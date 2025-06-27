import {
  Container,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/src/components/shared";
import { findPizzas, GetSearchParams } from "@/src/lib";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";



interface PageProps {
  searchParams: GetSearchParams;
}

const DynamicFilters = dynamic(() => import('@/src/components/shared/').then(mod => mod.Filters), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center mt-4">
    <Loader size={40} className="animate-spin" />
  </div>
})

const Home = async ({ searchParams }: PageProps) => {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title className="font-extrabold" size="lg" text="Все пиццы" />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <DynamicFilters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
