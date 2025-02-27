import { RadioCards } from "@radix-ui/themes";

type OptionItem = {
   value: string;
   title: string;
};

type OptionsProps = {
   value?: any;
   onValueChange?: (data: any) => void;
   isRow: boolean;
   items: OptionItem[];
};

export function OptionCards({ items, isRow, ...props }: OptionsProps) {
   return (
      <RadioCards.Root
         className={`${isRow ? "!flex !gap-1" : "!grid !grid-cols-2 !gap-1"}`}
         {...props}
      >
         {items.map(({ value, title }, i) => (
            <RadioCards.Item
               value={value}
               className={`${isRow ? "!p-2" : ""}`}
               key={i}
            >
               {title}
            </RadioCards.Item>
         ))}
      </RadioCards.Root>
   );
}

