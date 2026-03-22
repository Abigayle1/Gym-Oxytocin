import { Dumbbell, ClipboardList, Heart, Hand, Sparkles, User } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, React.ElementType> = {
  dumbbell: Dumbbell,
  clipboard: ClipboardList,
  heart: Heart,
  hands: Hand,
  spa: Sparkles,
  user: User,
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Dumbbell;

  return (
    <div className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
