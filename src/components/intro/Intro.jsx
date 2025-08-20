// src/components/intro/Intro.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const FINAL_TEXT = "DREAMPHASE";
const LETTERS = FINAL_TEXT.split("");
const REPEAT = 2; // increased so reels can spin and land back on same letter
const SLOT_REM = 10; // match font-size 7rem so a letter row == 7rem

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

  // (kept in case you still want it elsewhere)
  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
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
        duration: 0.025,
        ease: "power1.out",
      });
    }, "+=0.03");

    // AFTER expand: show reels, wait a frame for DOM to render, then animate reels
    tl.add(() => {
      gsap.to(circleRef.current, { opacity: 0, duration: 0.05 });
      setShowReels(true);

      gsap.delayedCall(0.009, () => {
        const tracks = reelRefs.current.slice(0, FINAL_TEXT.length);
        const baseDuration = 0.5;
        let completed = 0;

        // build a repeated track array (same for all reels)
        const repeatedTrack = buildTrack();

        // --- IMPORTANT: set initial visible row for each reel so start shows FINAL_TEXT ---
        tracks.forEach((trackEl, i) => {
          const char = FINAL_TEXT[i];
          if (!trackEl) return;
          const initialIndex = LETTERS.indexOf(char);
          // set the track to show the initialIndex row
          gsap.set(trackEl, { y: `-${initialIndex * SLOT_REM}rem` });
        });

        // bounce order: left -> right -> left
        const n = FINAL_TEXT.length;
        const forward = [...Array(n).keys()]; // [0,1,2,...,n-1]
        const bounce = forward.concat(forward.slice(0, -1).reverse());
        const totalAnimations = bounce.length;

        bounce.forEach((reelIndex, idx) => {
          const trackEl = tracks[reelIndex];
          if (!trackEl) {
            completed++;
            return;
          }

          const char = FINAL_TEXT[reelIndex];

          // compute final target index in the last repeat (so we land on same letter)
          const lastRepStart = (REPEAT - 1) * LETTERS.length;
          const targetIndexInLastRep = LETTERS.indexOf(char);
          const targetIndex =
            lastRepStart + (targetIndexInLastRep === -1 ? 0 : targetIndexInLastRep);

          const yValue = `-${targetIndex * SLOT_REM}rem`;
          const dur = baseDuration;

          // Create timeline for each reel
          const reelTl = gsap.timeline({
            delay: idx * 0.06,
            onComplete: () => {
              completed++;
              if (completed >= totalAnimations) {
                gsap.fromTo(
                  wrapperRef.current.querySelector("h1"),
                  { y: 0 },
                  { y: 15, duration: 0.9, ease: "back.out(4)" }
                );
                setShowTagline(true);
                setTimeout(() => {
                  setFinished(true);
                  if (typeof onFinish === "function") onFinish();
                }, 1300);
              }
            }
          });

          // Phase 1: scroll into place (animate towards the occurrence in last repeat)
          reelTl.to(trackEl, {
            y: yValue,
            duration: dur,
            ease: "power3.out"
          });

          // Phase 2: small bounce backwards (only when coming from the right → left pass)
          if (idx >= forward.length) {
            reelTl.to(trackEl, {
              y: `calc(${yValue} + 1.2rem)`, // nudge
              duration: 0.35,
              ease: "power2.inOut"
            });
            reelTl.to(trackEl, {
              y: yValue,
              duration: 0.05,
              ease: "back.out()"
            });
          }
        });

        if (tracks.length === 0) {
          setShowTagline(true);
          setTimeout(() => {
            setFinished(true);
            if (typeof onFinish === "function") onFinish();
          }, 1400);
        }
      });
    }, "+=0.3");

    return () => tl.kill();
  }, [onFinish]);

  // build repeated track array (non-rotated)
  const buildTrack = () => {
    const arr = [];
    for (let r = 0; r < REPEAT; r++) {
      arr.push(...LETTERS);
    }
    return arr;
  };

  const track = buildTrack();

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
      padding: "2px 18px",
      minHeight: `calc(${SLOT_REM}rem + 52px)`,
    },
    title: {
      letterSpacing: "0.02rem",
      fontSize: "7rem",
      fontWeight: 500,
      display: "inline-block",
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
      fontFamily: "'Rage', serif",
      fontStyle: "italic",
      fontSize: "55px",
      color: "#1E7291",
      position: "absolute",
      left: "14%",
      bottom: '-12%'
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
              transition={{ duration: 1, ease: "backOut" }}
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
