import { gymInfo } from "@/lib/gym-data";
import { MapPin, Clock, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Welcome to <span className="text-primary">{gymInfo.name}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              At Gym Oxytocin, we believe in transforming lives through fitness. Our personalized programs and training facility is designed to help you build health, strength, and confidence. Whether you&apos;re 
              just starting your fitness journey or you&apos;re a seasoned athlete, our services
              and supportive community are here to help you achieve your goals.
            </p>
            
            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">{gymInfo.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Opening Hours</h3>
                  <p className="text-muted-foreground"> Daily: {gymInfo.hours.daily}</p>
                  <p className="text-muted-foreground"> Saturday: {gymInfo.hours.Weekend} </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Group Classes</h3>
                  <p className="text-muted-foreground">{gymInfo.hours.groupClasses}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-muted overflow-hidden">
              <img
                src="/Media/GymOwnerPic.png" 
                alt="Owner of GymOxytocin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>          
        </div>
      </div>
    </section>
  );
}
