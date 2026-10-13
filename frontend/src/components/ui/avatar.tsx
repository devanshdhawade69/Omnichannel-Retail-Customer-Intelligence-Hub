import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarContextValue {
  imageLoaded: boolean
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null)

export function Avatar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [imageLoaded, setImageLoaded] = React.useState(false)

  return (
    <AvatarContext.Provider value={{ imageLoaded, setImageLoaded }}>
      <div
        className={cn(
          'relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  )
}

export function AvatarImage({
  src,
  alt = '',
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const context = React.useContext(AvatarContext)

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => context?.setImageLoaded(true)}
      onError={() => context?.setImageLoaded(false)}
      className={cn(
        'aspect-square size-full object-cover',
        !context?.imageLoaded && 'hidden',
        className
      )}
      {...props}
    />
  )
}

export function AvatarFallback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(AvatarContext)

  if (context?.imageLoaded) {
    return null
  }

  return (
    <div
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
