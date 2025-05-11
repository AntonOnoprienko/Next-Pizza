import { Container, Filters, Title, TopBar } from "@/components/shared";


const Home = () => {
  return (
    <>
      <Container className="mt-10">
        <Title className="font-extrabold" size="lg" text="Все пиццы" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">список товаров</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
