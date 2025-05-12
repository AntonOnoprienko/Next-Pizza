import { Container, Filters, ProductCard, ProductsGroupList, Title, TopBar } from "@/components/shared";
const products = [
  {
    id: 1,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/019591b642d87304a62d322945990861.avif",
    name: "Креветка и песто",
    items: [{ price: 320 }],
    count: 1,
    ingredients: "Креветки, томаты, шампиньоны, соус песто, моцарелла, итальянские травы, фирменный томатный соус",
  },
  {
    id: 2,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif",
    name: "Пеперони фреш",
    items: [{ price: 280 }],
    count: 1,
    ingredients: "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
  },
  {
    id: 3,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.avif",
    name: "Сырная",
    items: [{ price: 370 }],
    count: 1,
    ingredients: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
  },
  {
    id: 4,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef5b10b39bbbbda9f8c4e4ff1b067c.avif",
    name: "Ветчина и грибы",
    items: [{ price: 300 }],
    count: 1,
    ingredients: "Ветчина, шампиньоны, увеличенная порция моцареллы, фирменный томатный соус",
  },
  {
    id: 5,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d6108e3a1c9952cd3a7f39a4d02.avif",
    name: "Мясная",
    items: [{ price: 250 }],
    count: 1,
    ingredients: "Цыпленок, ветчина, пикантная пепперони, острые колбаски чоризо, моцарелла, фирменный томатный соус",
  },
  {
    id: 6,
    imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d6149eb101d8727573088fa2eff.avif",
    name: "Диабола",
    items: [{ price: 320 }],
    count: 1,
    ingredients: "Острые колбаски чоризо, острый перец халапеньо, соус барбекю, митболы из говядины, томаты, сладкий перец, красный лук, моцарелла, фирменный томатный соус",
  },
];


const Home = () => {
  return (
    <>
      <Container className="mt-10">
        <Title className="font-extrabold" size="lg" text="Все пиццы" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" categoryId={1} items={products}/>
              <ProductsGroupList title="Комбо" categoryId={2} items={products}/>
              <ProductsGroupList title="Закуски" categoryId={3} items={products}/>
              </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
