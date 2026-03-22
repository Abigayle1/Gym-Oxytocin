import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1",
        popular
          ? "bg-primary/10 border-primary"
          : "bg-card border-border hover:border-primary/50"
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            <Star className="w-3 h-3 fill-current" />
            Best Value
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-3xl md:text-4xl font-bold text-foreground">{price}</span>
        <span className="text-muted-foreground">{period}</span>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
              popular ? "bg-primary" : "bg-secondary"
            )}>
              <Check className={cn(
                "w-3 h-3",
                popular ? "text-primary-foreground" : "text-secondary-foreground"
              )} />
            </div>
            <span className="text-muted-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={cn(
          "w-full rounded-full font-semibold",
          popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted text-foreground hover:bg-muted/80"
        )}
        onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
      >
        Get Started
      </Button>
    </div>
  );
}
