'use client'

import { useEffect } from "react"
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import SuspendedPostHogPageView from "./PH-Page-View"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST as string,
            person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
            defaults: '2025-05-24',
            capture_pageleave: true,
        })
    }, [])

    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView />
            {children}
        </PHProvider>
    )
}
