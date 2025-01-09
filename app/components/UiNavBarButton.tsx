"use client";
import { TransitionLink } from "@/app/utils/TransitionLink";
import gsap from "gsap";
import Link, { LinkProps } from "next/link";
import { ReactNode, useRef } from "react";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

export const UiNavBarButton = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  return <Link href={href}>{children}</Link>;
};
