import { prisma } from '../../../prisma/prisma-client';
import { LayoutType, TextColor } from '@prisma/client';

const startDate = new Date();
const endDate = new Date();
endDate.setFullYear(startDate.getFullYear() + 1);

export const stories = [
  {
    title: 'Любимый кофе',
    imageUrl: 'story/hzm1w8qxx0ugvrli5rxs',
    startDate,
    endDate,
    isActive: true,
    priority: 0,
    textColor: TextColor.LIGHT,
    items: [
      {
        title: 'Любителям хорошего кофе',
        description:
          'Наслаждайся ореховым капучино, карамельным латте, классическим американо и другими вкусами — кофе для каждого дня!',
        imageUrl: 'story/hzm1w8qxx0ugvrli5rxs',
        linkUrl: '/#Кофе',
        showButton: true,
        buttonText: 'Перейти к кофе',
        order: 0,
        layout: LayoutType.TEXT_BOTTOM,
        textColor: TextColor.LIGHT,
        productId: null,
      },
    ],
  },
  {
    title: 'Добавь ингредиент',
    imageUrl: 'story/ebbdzavlhwk32bkcxvn7',
    startDate,
    endDate,
    isActive: true,
    priority: 1,
    textColor: TextColor.LIGHT,
    items: [
      {
        title: 'Традиционная пицца с сырным бортиком',
        description:
          'Добавь сырный бортик к любимой пицце на традиционном тесте — мягко, сочно, с сырной корочкой до последнего кусочка.',
        imageUrl: 'story/ebbdzavlhwk32bkcxvn7',
        linkUrl: '/?pizzaTypes=1',
        showButton: true,
        buttonText: 'Выбрать пиццу',
        order: 0,
        layout: LayoutType.TEXT_BOTTOM,
        textColor: TextColor.LIGHT,
        productId: null,
      },
    ],
  },
  {
    title: 'Сладкие новинки',
    imageUrl: 'story/l4a3qdj34uyubvxaxarb',
    startDate,
    endDate,
    isActive: true,
    priority: 2,
    textColor: TextColor.LIGHT,
    items: [
      {
        title: 'Новинка для любителей чизкейков',
        description:
          'Шоколадный чизкейк с нежной фисташковой прослойкой — идеальное сочетание вкусов и текстур.',
        imageUrl: 'story/l4a3qdj34uyubvxaxarb',
        linkUrl: '/product/18',
        showButton: true,
        buttonText: 'Купить чизкейк',
        order: 0,
        layout: LayoutType.TEXT_BOTTOM,
        textColor: TextColor.LIGHT,
        productId: 18,
      },
    ],
  },
  {
    title: 'Сытный завтрак',
    imageUrl: 'story/kjhuvkvrocpsccifz13z',
    startDate,
    endDate,
    isActive: true,
    priority: 3,
    textColor: TextColor.LIGHT,
    items: [
      {
        title: 'Не забудь перекусить',
        description:
          'Омлет с пепперони, томатами и моцареллой — сытный перекус с хрустящей корочкой и ярким вкусом. Идеально, когда нужен заряд энергии!',
        imageUrl: 'story/kjhuvkvrocpsccifz13z',
        linkUrl: '/product/2',
        showButton: true,
        buttonText: 'Заказать омлет',
        order: 0,
        layout: LayoutType.TEXT_BOTTOM,
        textColor: TextColor.LIGHT,
        productId: 2,
      },
    ],
  },
  {
    title: 'Топ недели',
    imageUrl: 'story/cr57bqwdvtgxituwgql0',
    startDate,
    endDate,
    isActive: true,
    priority: 4,
    textColor: TextColor.LIGHT,
    items: [
      {
        title: 'Только сыр. Только хардкор.',
        description:
          '«Сырная» и «Четыре сыра» — нежный соус альфредо, тягучая моцарелла, пикантный блю чиз, а также насыщенные ноты чеддера и пармезана. Всё, что нужно настоящему сыроману.',
        imageUrl: 'story/cr57bqwdvtgxituwgql0',
        linkUrl: '/?ingredients=3',
        showButton: true,
        buttonText: 'Смотреть сырные пиццы',
        order: 0,
        layout: LayoutType.TEXT_BOTTOM,
        textColor: TextColor.LIGHT,
        productId: null,
      },
    ],
  },
  {
    title: 'Горячие закуски',
    imageUrl: 'story/vzilegrqclbj8pscsoz3',
    startDate,
    endDate,
    isActive: true,
    priority: 5,
    textColor: TextColor.LIGHT,
    items: [
      {
        title: 'Классика перекуса — наггетсы и фри',
        description:
          'Золотистые наггетсы с хрустящей корочкой и ароматная картошка фри — идеальный тандем для быстрого и вкусного перекуса. Попробуй с соусами на выбор!',
        imageUrl: 'story/vzilegrqclbj8pscsoz3',
        linkUrl: '/#Закуски',
        showButton: true,
        buttonText: 'Заказать закуски',
        order: 0,
        layout: LayoutType.TEXT_BOTTOM,
        textColor: TextColor.LIGHT,
        productId: null,
      },
    ],
  },
  {
    title: 'Интересные факты',
    imageUrl: 'story/hesjhbfbc5mbbuonfpou',
    startDate,
    endDate,
    isActive: true,
    priority: 6,
    textColor: TextColor.LIGHT,
    items: [
      {
        title: 'Интересный факт о пицце',
        description:
          'Считается, что первая современная пицца была приготовлена в Неаполе в 1889 году. Её создали в честь королевы Маргариты — с томатами, моцареллой и базиликом, символизирующими цвета итальянского флага.',
        imageUrl: 'story/hesjhbfbc5mbbuonfpou',
        linkUrl: '',
        showButton: false,
        buttonText: '',
        order: 0,
        layout: LayoutType.TEXT_BOTTOM,
        textColor: TextColor.LIGHT,
        productId: null,
      },
    ],
  },
];

export async function seedStories() {
  for (const story of stories) {
    await prisma.story.create({
      data: {
        title: story.title,
        imageUrl: story.imageUrl,
        startDate: story.startDate,
        endDate: story.endDate,
        isActive: story.isActive,
        priority: story.priority,
        textColor: story.textColor,
        items: {
          create: story.items.map((item) => ({
            imageUrl: item.imageUrl,
            order: item.order,
            layout: item.layout,
            textColor: item.textColor,
            showButton: item.showButton,
            buttonText: item.buttonText || null,
          })),
        },
      },
    });
  }
}
