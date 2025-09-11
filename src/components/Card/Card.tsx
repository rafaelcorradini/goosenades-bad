import { Card as CardHero, CardFooter } from "@heroui/card";
import { PropsWithChildren, ReactNode } from "react";

export interface CardProps extends PropsWithChildren {
  footer?: ReactNode;
  width?: number;
  height?: number;
}

export function Card({ children, footer }: CardProps) {
  return (
    <CardHero isFooterBlurred className="border-none" radius="lg">
      {children}
      {footer ? (
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          {footer}
        </CardFooter>
      ) : null}
    </CardHero>
  );
}
