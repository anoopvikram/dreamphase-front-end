// src/components/intro/Intro.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const FINAL_TEXT = "DREAMPHASE";
const LETTERS = FINAL_TEXT.split("");
const REPEAT = 6; // how many times letters repeat inside each reel
const SLOT_REM = 7; // match font-size 7rem so a letter row == 7rem

const Intro = ({ onFinish }) => {
  const circleRef = useRef(null);
  const wrapperRef = useRef(null);
  const reelRefs = useRef([]);
  const [showReels, setShowReels] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [finished, setFinished] = useState(false);

  // set ref for each reel track
  const setReelRef = (el, i) => {
    reelRefs.current[i] = el;
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // initial setup
    gsap.set(wrapperRef.current, { backgroundColor: "#ffffff" });
    gsap.set(circleRef.current, {
      y: "-120vh",
      xPercent: -50,
      left: "50%",
      scale: 0.6,
      display: "block",
      opacity: 1,
    });

    // circle drop
    tl.to(circleRef.current, { duration: 0.7, y: "0vh", ease: "power2.inOut" });

    // expand to fill
    tl.to(
      circleRef.current,
      { duration: 0.85, scale: 60, ease: "power2.inOut" },
      "+=0.12"
    );

    // background -> blue
    tl.add(() => {
      gsap.to(wrapperRef.current, {
        backgroundColor: "#0F3753",
        duration: 0.25,
        ease: "power1.out",
      });
    }, "+=0.03");

    // AFTER expand: show reels, wait a frame for DOM to render, then animate reels
    tl.add(() => {
      // fade circle
      gsap.to(circleRef.current, { opacity: 0, duration: 0.12 });

      // reveal reels in DOM
      setShowReels(true);

      // wait next tick so refs are attached
      gsap.delayedCall(0.04, () => {
        const tracks = reelRefs.current.slice(0, FINAL_TEXT.length);
        const stagger = 0.12;
        const baseDuration = 1.0;
        let completed = 0;

        // ensure we don't animate nulls — fallback to immediate completion
        tracks.forEach((trackEl, i) => {
          if (!trackEl) {
            completed++;
            return;
          }

          // find target index in last repetition
          const lastRepStart = (REPEAT - 1) * LETTERS.length;
          const targetIndexInLastRep = LETTERS.indexOf(FINAL_TEXT[i]);
          const targetIndex = lastRepStart + (targetIndexInLastRep === -1 ? 0 : targetIndexInLastRep);

          const yValue = `-${targetIndex * SLOT_REM}rem`;
          const dur = baseDuration + Math.random() * 0.45 + i * 0.06;

          // animate vertical slide of the track (slot reel)
          gsap.fromTo(
            trackEl,
            { y: "0rem" },
            {
              y: yValue,
              duration: dur,
              ease: "power4.out",
              delay: i * stagger,
              onComplete: () => {
                completed++;
                // once all reels finished, show tagline, keep it 1.2s, then close
                if (completed >= FINAL_TEXT.length) {
                  // pull title down + back out
                  gsap.fromTo(
                    wrapperRef.current.querySelector("h1"),
                    { y: 0 },
                    { y: 22, duration: 0.6, ease: "back.out(6)" }
                  );

                  setShowTagline(true);

                  setTimeout(() => {
                    setFinished(true);
                    if (typeof onFinish === "function") onFinish();
                  }, 1200);
                }
              },
            }
          );
        });

        // Edge: if there were no valid trackEls, still trigger tagline
        if (tracks.length === 0) {
          setShowTagline(true);
          setTimeout(() => {
            setFinished(true);
            if (typeof onFinish === "function") onFinish();
          }, 1200);
        }
      });
    }, "+=0.12");

    return () => tl.kill();
  }, [onFinish]);

  // build repeated track array (letters repeated REPEAT times)
  const buildTrack = () => {
    const arr = [];
    for (let r = 0; r < REPEAT; r++) {
      arr.push(...LETTERS);
    }
    return arr;
  };
  const track = buildTrack();

  // styles preserved from your code (font-size 7rem etc.)
  const styles = {
    wrapper: {
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      zIndex: 9999,
      backgroundColor: "#ffffff",
    },
    circle: {
      position: "absolute",
      width: 140,
      height: 140,
      borderRadius: "50%",
      background: "#0F3753",
      left: "50%",
      top: "30vh",
      transform: "translateX(-50%)",
      zIndex: 20,
      boxShadow: "0 12px 30px rgba(22,75,113,0.35)",
    },
    textBlock: {
      position: "relative",
      zIndex: 40,
      textAlign: "center",
      color: "#ffffff",
      userSelect: "none",
      padding: "10px 18px",
      // reserve small space so tagline won't push title when it appears
      minHeight: `calc(${SLOT_REM}rem + 52px)`, // 7rem + ~52px for tagline area
    },
    title: {
      letterSpacing: "0.02rem",
      fontSize: "7rem",
      fontWeight: 400,
      display: "inline-block",
      // reserve small space under title so tagline won't shift layout
      paddingBottom: 0,
    },
    reelWrapper: {
      display: "inline-block",
      overflow: "hidden",
      height: `${SLOT_REM}rem`,
      verticalAlign: "middle",
    },
    track: {
      display: "flex",
      flexDirection: "column",
      transform: "translateY(0)",
    },
    letter: {
      display: "block",
      fontSize: "7rem",
      lineHeight: `${SLOT_REM}rem`,
      height: `${SLOT_REM}rem`,
      textAlign: "center",
      minWidth: "0.8em",
    },
    tagline: {
      marginTop: 1, // less gap
      fontFamily: "'Rage', serif",
      fontStyle: "italic",
      fontSize: "55px",
      color: "#1E7291",
      position:"absolute",
      left: "14%",
      transform: "translateX(-50%)",    
      // keep tagline absolutely positioned so it visually overlays without reflow (optional)
      // if you prefer removing position:absolute leave it out — we've reserved space above so shifting won't happen
      // 
    },
  };

  if (finished) return null;

  return (
    <div ref={wrapperRef} style={styles.wrapper} aria-hidden>
      <div ref={circleRef} style={styles.circle} />

      <div style={styles.textBlock}>
        {showReels && (
          <h1 style={styles.title}>
            {FINAL_TEXT.split("").map((char, i) => (
              <span key={i} style={{ display: "inline-block", marginRight: "0.05rem" }}>
                <span style={styles.reelWrapper}>
                  <span ref={(el) => setReelRef(el, i)} style={styles.track}>
                    {track.map((t, idx) => (
                      <span key={idx} style={styles.letter}>
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            ))}
          </h1>
        )}

        <AnimatePresence>
          {showTagline && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "backOut" }}
              style={styles.tagline}
            >
              Transforming Dreams into Journeys
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Intro;
