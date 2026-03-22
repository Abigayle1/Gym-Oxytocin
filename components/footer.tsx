import { gymInfo } from "@/lib/gym-data";
import { Instagram, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {gymInfo.name}
            </h3>
            <p className="text-primary font-medium mb-4">{gymInfo.tagline}</p>
            <p className="text-muted-foreground text-sm">
              Transforming lives through fitness since 2010. Join our community
              and discover your potential.
            </p>
          </div>

          {/* Quick Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Visit Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{gymInfo.address}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Daily: {gymInfo.hours.daily}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Follow Us
            </h4>
            <div className="space-y-3">
              <a
                href={`https://instagram.com/${gymInfo.socials.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>{gymInfo.socials.instagram}</span>
              </a>
              <a
                href={`https://instagram.com/${gymInfo.socials.instagramPersonal.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>{gymInfo.socials.instagramPersonal}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {gymInfo.name}. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#signup"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Join
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
