"use client"
export default function SectionHeading({children, className=""}:{children:React.ReactNode; className?:string;}){
  return <h2 className={`section-title ${className}`}>{children}</h2>
}