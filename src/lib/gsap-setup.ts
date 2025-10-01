import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

// GSAP configuration
gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
})

// Default GSAP settings
gsap.defaults({
    ease: 'power3.out',
    duration: 0.6,
})

// Export configured gsap
export { gsap, ScrollTrigger }
