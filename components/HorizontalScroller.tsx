// components/HorizontalScroller.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    /** if true, allows touch / wheel scrolling in addition to buttons */
    allowNativeScroll?: boolean;
}

export default function HorizontalScroller({
    children,
    className = "",
    allowNativeScroll = false,
    ...rest
}: Props) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateArrows = () => {
        if (!scrollerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft + clientWidth + 10 < scrollWidth);
    };

    useEffect(() => {
        updateArrows();
        const el = scrollerRef.current;
        if (!el) return;
        const onScroll = () => {
            updateArrows();
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateArrows);
        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateArrows);
        };
    }, []);

    // Prevent native scrolling if not allowed
    useEffect(() => {
        if (allowNativeScroll) return;
        const el = scrollerRef.current;
        if (!el) return;
        const prevent = (e: WheelEvent) => {
            e.preventDefault();
        };
        const touchPrevent = (e: TouchEvent) => {
            // keep it from swiping
            e.preventDefault();
        };
        el.addEventListener("wheel", prevent, { passive: false });
        el.addEventListener("touchmove", touchPrevent, { passive: false });
        return () => {
            el.removeEventListener("wheel", prevent as any);
            el.removeEventListener("touchmove", touchPrevent as any);
        };
    }, [allowNativeScroll]);

    const scrollBy = (offset: number) => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollBy({
                left: offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className={`relative ${className}`} {...rest}>
            {canScrollLeft && (
                <button
                    aria-label="Scroll left"
                    onClick={() => scrollBy(-500)}
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/90 dark:bg-black/90 rounded-full p-2 shadow hover:scale-105 transition-transform"
                    style={{ backdropFilter: "blur(8px)" }}
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            )}

            <div
                ref={scrollerRef}
                className="flex gap-6 py-2 snap-x snap-mandatory"
                style={{
                    overflow: "hidden",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "auto",
                }}
                aria-label="Horizontal project scroller"
            >
                {Array.isArray(children)
                    ? children.map((child, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 snap-start w-[280px] sm:w-[320px] lg:w-[360px]"
                        >
                            {child}
                        </div>
                    ))
                    : (
                        <div className="flex-shrink-0 snap-start w-[280px] sm:w-[320px] lg:w-[360px]">
                            {children}
                        </div>
                    )}
            </div>

            {canScrollRight && (
                <button
                    aria-label="Scroll right"
                    onClick={() => scrollBy(500)}
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/90 dark:bg-black/90 rounded-full p-2 shadow hover:scale-105 transition-transform"
                    style={{ backdropFilter: "blur(8px)" }}
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}
