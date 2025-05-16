"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { Search } from "lucide-react";
import { useClickAway } from "react-use";
import Link from "next/link";
import { Api } from "@/src/services/api-client";
import { Product } from "@prisma/client";

type Props = {
  className?: string;
};

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [focused, setFocused] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  React.useEffect(() => {
    Api.products.search(searchQuery).then((items) => setProducts(items));
  }, [searchQuery]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-200 z-30",
          focused
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
        />
        {products.length > 0 && <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          {products.length > 0 &&
            products.map((item) => (
              <Link
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                key={item.id}
                href={`/products/${item.id}`}
              >
                <img
                  className="rounded-sm"
                  src={item.imageUrl}
                  alt={item.name}
                  width={32}
                  height={32}
                />
                <span>{item.name}</span>
              </Link>
            ))}
        </div>}
      </div>
    </>
  );
};
