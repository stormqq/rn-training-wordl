import { Sheet } from "tamagui";
import { useState } from "react";

type SheetProps = {
  isOpen: boolean;
  points?: number;
  onDismiss: () => void;
  children: JSX.Element;
};

export function BottomSheet({
  isOpen,
  points = 40,
  onDismiss,
  children,
}: SheetProps) {
  const [position, setPosition] = useState(0);

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={onDismiss}
      snapPoints={[points]}
      position={position}
      onPositionChange={setPosition}
    >
      <Sheet.Overlay />
      <Sheet.Frame flex={1} padding="$5">
        {children}
      </Sheet.Frame>
    </Sheet>
  );
}
