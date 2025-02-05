'use client'

import FooterSection from "./(landing)/footer";
import NavBar from "./(landing)/navbar";
import HeroSection from "./(landing)/hero-section";
import LearningPathSection from "./(landing)/learning-path";
import ProblemSolving from "./(landing)/problem-execution";


export default function Home() {
  return (
    <div className="font-dotGothic">
      <NavBar />
      <main>
        <HeroSection />
        <LearningPathSection />
        <ProblemSolving />
        <FooterSection className="my-4 lg:my-20 lg:mx-36 p-10 lg:p-16 lg:px-20" />
      </main>
    </div>
  );
}
