import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string; // e.g. "16/9", "1/1"
  rounded?: string;     // tailwind rounded utility
  containerClassName?: string;
}

/**
 * Image with native lazy-loading, async decoding, and a skeleton placeholder
 * shown until the asset has finished loading. Falls back gracefully on error.
 */
export const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  (
    {
      src,
      alt,
      className,
      containerClassName,
      aspectRatio,
      rounded = "rounded-xl",
      width,
      height,
      onLoad,
      onError,
      ...rest
    },
    ref,
  ) => {
    const [loaded, setLoaded] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    return (
      <div
        className={cn("relative overflow-hidden bg-muted/30", rounded, containerClassName)}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {!loaded && !failed && (
          <Skeleton className={cn("absolute inset-0", rounded)} />
        )}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            Image unavailable
          </div>
        ) : (
          <img
            ref={ref}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={width}
            height={height}
            onLoad={(e) => {
              setLoaded(true);
              onLoad?.(e);
            }}
            onError={(e) => {
              setFailed(true);
              onError?.(e);
            }}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0",
              className,
            )}
            {...rest}
          />
        )}
      </div>
    );
  },
);
LazyImage.displayName = "LazyImage";