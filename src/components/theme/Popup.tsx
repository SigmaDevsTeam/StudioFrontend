import { Popover } from "@radix-ui/themes";

type PopupProps = {
   trigger: React.ReactNode;
   content: React.ReactNode;
   width?: string;
};

export function Popup({ trigger, content, width }: PopupProps) {
   return (
      <Popover.Root>
         <Popover.Trigger>{trigger}</Popover.Trigger>
         <Popover.Content width={width} style={{ zIndex: 0 }}>
            {content}
         </Popover.Content>
      </Popover.Root>
   );
}
