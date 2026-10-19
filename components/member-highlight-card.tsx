"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { Award } from "lucide-react";

import { db } from "@/lib/firebase";
import { memberHighlight as fallbackMemberHighlight } from "@/lib/gym-data";

type MemberHighlight = {
  name: string;
  achievement: string;
  testimonial: string;
  image: string;
  memberSince: string;
};

export function MemberHighlightCard() {
  const [member, setMember] = useState<MemberHighlight>(
    fallbackMemberHighlight
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const memberRef = doc(db, "siteContent", "memberHighlight");

    const unsubscribe = onSnapshot(
      memberRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setMember(snapshot.data() as MemberHighlight);
        }

        setLoading(false);
      },
      (error) => {
        console.error("Failed to load Member of the Month:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (loading) {
    return null;
  }

  return (
    <section id="member" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Member of the <span className="text-primary">Month</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrating the dedication and achievements of our amazing community
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-3xl border border-border overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-muted overflow-hidden border-4 border-primary/20">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-[center_20%]"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                        <span className="text-5xl font-bold text-primary">
                          {initials}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>

                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    {member.achievement}
                  </div>

                  <div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {member.testimonial}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    Member since {member.memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}