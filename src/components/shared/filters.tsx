import React from "react";
import { cn } from "@/src/lib/utils";
import { Input } from "../ui";
import { RangeSlider, Title, FilterCheckbox } from ".";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <Title size="sm" className="mb-5 font-bold" text="Фильтрация" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинка" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
        <CheckboxFiltersGroup
          title="Ингредиенты"
          className="mt-5"
          items={[
            { text: "Сыр", value: "1" },
            { text: "Помидоры", value: "2" },
            { text: "Курица", value: "3" },
            { text: "Грибы", value: "5" },
            { text: "Лук", value: "6" },
            { text: "Огурцы", value: "7" },
            { text: "Чеснок", value: "8" },
            { text: "Перец", value: "9" },
            { text: "Оливки", value: "10" },
            
          ]}
          defaultItems={[
            { text: "Сыр", value: "1" },
            { text: "Помидоры", value: "2" },
            { text: "Курица", value: "3" },
            { text: "Грибы", value: "5" },
            { text: "Лук", value: "6" },
          ]}
        />
      </div>
    </div>
  );
};
