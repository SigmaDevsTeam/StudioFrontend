import { SegmentedControl } from "@radix-ui/themes";

type SegmentItem = {
   value: string;
   title: string;
};

type SegmentsProps = {
   value?: any;
   onValueChange?: (data: any) => void;
   items: SegmentItem[];
};

export function Segments({ items, ...props }: SegmentsProps) {
   return (
      <SegmentedControl.Root {...props}>
         {items &&
            items.map(({ value, title }, i) => (
               <SegmentedControl.Item value={value} key={i}>
                  {title || value}
               </SegmentedControl.Item>
            ))}
      </SegmentedControl.Root>
   );
}

