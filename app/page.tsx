import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { PricingSection } from "@/components/pricing-section";
import { MemberHighlightCard } from "@/components/member-highlight-card";
import { VideoGallery } from "@/components/video-gallery";
import { SignupForm } from "@/components/signup-form";
import { Footer } from "@/components/footer";
import { memberHighlight } from "@/lib/gym-data";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <MemberHighlightCard
        name={memberHighlight.name}
        achievement={memberHighlight.achievement}
        testimonial={memberHighlight.testimonial}
        image={memberHighlight.image}
        memberSince={memberHighlight.memberSince}
      />
      <VideoGallery />
      <SignupForm />
      <Footer />
    </main>
  );
}
