import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../landing.css'

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
    const heroRef = useRef(null)
    const cursorRef = useRef(null)

    useEffect(() => {
        const nav = document.querySelector('.landing-nav')
        const onScroll = () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled')
            } else {
                nav.classList.remove('scrolled')
            }
        }
        window.addEventListener('scroll', onScroll)

        const cursor = cursorRef.current
        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'power3.out',
            })
        }
        window.addEventListener('mousemove', onMouseMove)

        // Hero text animation
        gsap.fromTo('.hero-tag',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        )
        gsap.fromTo('.hero-title',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
        )
        gsap.fromTo('.hero-sub',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 }
        )
        gsap.fromTo('.hero-btns',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
        )

        // Scroll animations
        gsap.utils.toArray('.reveal').forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    }
                }
            )
        })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('scroll', onScroll)
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return (
        <div className="landing">

            {/* Cursor glow */}
            <div className="cursor-glow" ref={cursorRef} />

            {/* Navbar */}
            <nav className="landing-nav">
                <div className="nav-logo">Riwaq</div>
                <div className="nav-links">
                    <Link to="/login" className="nav-link">Sign In</Link>
                    <Link to="/register" className="nav-btn">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero" ref={heroRef}>
                <div className="hero-content">
                    <span className="hero-tag">The Academic Platform</span>
                    <h1 className="hero-title">
                        Where knowledge<br />
                        <em>finds its place.</em>
                    </h1>
                    <p className="hero-sub">
                        Riwaq brings students, professors, and institutions together<br />
                        in one unified learning experience.
                    </p>
                    <div className="hero-btns">
                        <Link to="/register" className="btn-primary">Get Started</Link>
                        <Link to="/login" className="btn-secondary">Sign In</Link>
                    </div>
                </div>
                <div className="hero-grid" />
            </section>

            {/* What is Riwaq */}
            <section className="section-what reveal">
                <div className="section-inner">
                    <span className="section-tag reveal">What is Riwaq</span>
                    <p className="section-text reveal">
                        Named after the historic arcaded corridors where scholars gathered to learn,
                        Riwaq is a modern platform built around the timeless act of education —
                        structured, purposeful, and human.
                    </p>
                </div>
            </section>

            {/* Three Pillars */}
            <section className="section-pillars">
                <div className="pillars-header reveal">
                    <span className="section-tag">Built for everyone</span>
                    <h2 className="pillars-title">One platform.<br />Three experiences.</h2>
                </div>
                <div className="pillars-grid">
                    <div className="pillar reveal">
                        <span className="pillar-number">01</span>
                        <h3 className="pillar-title">Students</h3>
                        <p className="pillar-text">Access your courses, prepare for exams, track your progress, and grow at your own pace.</p>
                    </div>
                    <div className="pillar reveal">
                        <span className="pillar-number">02</span>
                        <h3 className="pillar-title">Professors</h3>
                        <p className="pillar-text">Upload content, design exams, evaluate answers, and focus on what matters — teaching.</p>
                    </div>
                    <div className="pillar reveal">
                        <span className="pillar-number">03</span>
                        <h3 className="pillar-title">Administration</h3>
                        <p className="pillar-text">Manage students, professors, modules, and the entire institution from one place.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-cta reveal">
                <h2 className="cta-title">Ready to begin?</h2>
                <p className="cta-sub">Join Riwaq and be part of a new era of learning.</p>
                <Link to="/register" className="btn-primary">Join Riwaq</Link>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <span>© 2026 Riwaq. All rights reserved.</span>
            </footer>

        </div>
    )
}