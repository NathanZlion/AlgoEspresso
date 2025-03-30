'use client'

import FooterSection from "./footer";
import HeroSection from "./hero-section";
import LearningPathSection from "./learning-path";
import LandingPageNavBar from "./navbar";
import ProblemSolving from "./problem-execution";


export default function LandingPage() {
    return (
        <div className="font-dotGothic mx-auto w-full lg:px-10">
            <header>
                <LandingPageNavBar />
            </header>
            <main>
                <HeroSection />
                <LearningPathSection />
                <ProblemSolving />
                <FooterSection className="my-4 lg:my-20 lg:mx-36 p-10 lg:p-16 lg:px-20" />
            </main>
        </div>
    );
}
