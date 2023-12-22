"use client"
import dynamic from 'next/dynamic'
import React from 'react'
const HomeComponentNoSSR = dynamic(() => import('@/components/homeComponent'), { ssr: false })


export default function Page() {
  return (
    <HomeComponentNoSSR />
  )
}
