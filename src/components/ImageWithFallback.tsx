import React, { useState, useEffect, useRef } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain";
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className = "",
  style,
  objectFit = "cover",
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync state when src prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  // Handle cached images that are already loaded when they mount or src changes
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth === 0) {
        // Image failed to load even though completed, trigger error handler
        handleError();
      } else {
        setIsLoading(false);
      }
    }
  }, [imgSrc]);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setIsLoading(false); // Stop loading animation as we change to fallback
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton screen overlay while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center z-10 w-full h-full">
          <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        ref={imgRef}
        key={imgSrc}
        src={imgSrc}
        alt={alt}
        className={`w-full h-full transition-transform duration-500 ${
          objectFit === "contain" ? "object-contain animate-fade-in" : "object-cover scale-100"
        } ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        referrerPolicy="no-referrer"
        style={style}
        {...props}
      />
    </div>
  );
}
