import Image from 'next/image'

type PhoneFrameProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

/** A simple dark bezel wrapper for real app-screen captures used throughout the case study. */
export default function PhoneFrame({ src, alt, width, height, className = '', priority }: PhoneFrameProps) {
  return (
    <div className={`overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink shadow-[0_20px_40px_-16px_rgba(26,26,23,0.4)] ${className}`}>
      <div className="relative overflow-hidden rounded-[22px]">
        <Image src={src} alt={alt} width={width} height={height} className="block h-auto w-full" priority={priority} />
      </div>
    </div>
  )
}
