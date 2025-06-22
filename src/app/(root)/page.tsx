import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/src/components/shared";
import { Suspense } from "react";
import { prisma } from "@/prisma/prisma-client";
import { Spinner } from "@/src/components/animations";



const Home = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: {
          name: true,
          imageUrl: true,
          description: true,
          ingredients: {
            select: {
              name: true,
            },
          },
          items: {
            take: 1,
            select: {
              price: true,
              pizzaType: true,
              productId: true
            },             
          },
        },
      },
    },
  });



  return (
    <>
      <Container className="mt-10">
        <Title className="font-extrabold" size="lg" text="Все пиццы" />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense fallback={<Spinner />}>
              <Filters />
            </Suspense>
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
