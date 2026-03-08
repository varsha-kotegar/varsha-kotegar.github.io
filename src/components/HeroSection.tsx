import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Name: starts at scale 1, shrinks to 0.45 and moves up
  const nameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.45]);
  const nameY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  // Tagline fades in as we scroll
  const taglineOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.15, 0.4], [60, 0]);

  // Intro paragraph fades in later
  const introOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const introY = useTransform(scrollYProgress, [0.3, 0.55], [50, 0]);

  // Photo fades in
  const photoOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const photoScale = useTransform(scrollYProgress, [0.25, 0.5], [0.9, 1]);

  // Scroll indicator fades out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative" style={{ height: "280vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Large name */}
        <motion.div
          style={{ scale: nameScale, y: nameY, opacity: nameOpacity }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6"
          >
            Developer · Writer · Explorer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="editorial-heading text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold text-foreground leading-[0.9]"
          >
            Varsha
            <br />
            <span className="text-accent">Kotegar</span>
          </motion.h1>
        </motion.div>

        {/* Tagline - fades in on scroll */}
        <motion.p
          style={{ opacity: taglineOpacity, y: taglineY }}
          className="font-display italic text-lg md:text-2xl text-accent text-center max-w-xl mt-8"
        >
          "An odyssey in engineering; a narrative in progress."
        </motion.p>

        {/* Intro + Photo row */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-12 max-w-6xl w-full">
          <motion.p
            style={{ opacity: introOpacity, y: introY }}
            className="editorial-body text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed text-center lg:text-left flex-1"
          >
            As a third-year engineering student, I am currently mastering the technical building blocks of my field while refining my voice as a writer and speaker. I am in a dedicated 'learning and building' phase, driven by a passion for exploring new technologies and translating them into stories that make people smarter.
          </motion.p>

          <motion.div
            style={{ opacity: photoOpacity, scale: photoScale }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="w-48 h-64 md:w-56 md:h-72 overflow-hidden rounded-sm">
                <img
                  src={profileImg}
                  alt="Varsha Kotegar - Developer Portrait"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-48 h-64 md:w-56 md:h-72 border border-accent rounded-sm -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 flex items-center gap-3"
        >
          <div className="w-7 h-11 border border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1.5 bg-muted-foreground rounded-full"
            />
          </div>
          <span className="text-[10px] font-body text-muted-foreground tracking-widest uppercase">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
