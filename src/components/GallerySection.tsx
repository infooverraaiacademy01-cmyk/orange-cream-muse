import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    alt: "Student working with tutor on maths problems",
    caption: "One-to-One Maths Tuition",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
    alt: "Students studying together in a bright classroom",
    caption: "Collaborative Learning Sessions",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    alt: "Young child reading a book with a tutor",
    caption: "Early Years Reading Support",
  },
  {
    src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
    alt: "Online tutoring session on a laptop",
    caption: "Online Tuition from Anywhere",
  },
  {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop",
    alt: "Student celebrating exam results",
    caption: "GCSE & A-Level Success Stories",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    alt: "Music lesson with a piano teacher",
    caption: "Musical Instrument Tuition",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
    alt: "SEN learner working with specialist tutor",
    caption: "SEN Specialist Support",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    alt: "Group of happy students after a successful session",
    caption: "Confident, Happy Learners",
  },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="gold-bar" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                Gallery
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Our Tutoring in Action
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              A glimpse into the learning journeys we support every day across the UK.
            </p>
          </div>
        </AnimatedSection>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <button
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden rounded-2xl w-full ${
                  i === 0 || i === 5 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                } focus:outline-none focus:ring-2 focus:ring-accent`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-primary-foreground text-sm font-bold">
                    {img.caption}
                  </p>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-primary-foreground hover:text-accent transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={galleryImages[lightbox].src.replace("w=600&h=400", "w=1200&h=800")}
                alt={galleryImages[lightbox].alt}
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="text-center text-primary-foreground mt-4 font-display font-bold text-lg">
                {galleryImages[lightbox].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
