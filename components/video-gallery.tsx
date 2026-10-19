"use client";

import { useState } from "react";
import { videos } from "@/lib/gym-data";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Training <span className="text-primary">Gallery</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get a glimpse of our training sessions, classes, and facilities
          </p>
        </div>

        {videos.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Training videos will be added soon.
          </p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  className="group relative aspect-video bg-muted rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary/50 transition-all duration-300"
                  onClick={() => setActiveVideo(video.videoUrl)}
                  aria-label={`Play ${video.title}`}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm md:text-base mt-8">
              Click any video to view highlights from Gym Oxytocin.
            </p>
          </>
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute -top-12 right-0 text-white hover:text-primary"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </Button>

            <video
              src={activeVideo}
              className="w-full h-full rounded-xl"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}