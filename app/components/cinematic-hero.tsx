"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SCENE_CONFIGS, TOTAL_FRAMES, getFramePath, SceneConfig } from "./scene-config";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeScene, setActiveScene] = useState<SceneConfig>(SCENE_CONFIGS[0]);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const [sceneTranslateY, setSceneTranslateY] = useState(0);
  const [sceneBlur, setSceneBlur] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [useVideoFallback, setUseVideoFallback] = useState(false);

  // Cached frame images for zero-lag canvas scrubbing
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentRenderedFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(1);

  // Draw frame on canvas with aspect ratio preservation (cover) and optional crossfade interpolation
  const drawFrame = useCallback((img: HTMLImageElement | HTMLVideoElement, blendImg?: HTMLImageElement | null, blendWeight = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    let sourceW = 1920;
    let sourceH = 1080;

    if (img instanceof HTMLImageElement) {
      sourceW = img.naturalWidth || 1920;
      sourceH = img.naturalHeight || 1080;
    } else if (img instanceof HTMLVideoElement) {
      sourceW = img.videoWidth || 1920;
      sourceH = img.videoHeight || 1080;
    }

    // Cover math
    const hRatio = cw / sourceW;
    const vRatio = ch / sourceH;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (cw - sourceW * ratio) / 2;
    const centerShiftY = (ch - sourceH * ratio) / 2;
    const destW = sourceW * ratio;
    const destH = sourceH * ratio;

    // Render base frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img, 0, 0, sourceW, sourceH, centerShiftX, centerShiftY, destW, destH);

    // If sub-frame interpolation is active and adjacent frame is available, blend subtly for ultra-smoothness
    if (blendImg && blendImg.complete && blendWeight > 0.03) {
      ctx.globalAlpha = Math.min(blendWeight, 0.85);
      ctx.drawImage(blendImg, 0, 0, sourceW, sourceH, centerShiftX, centerShiftY, destW, destH);
      ctx.globalAlpha = 1.0;
    }
  }, []);

  // Preload initial frames rapidly, then lazily stream the remainder
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    // Set canvas dimensions
    const updateCanvasResolution = () => {
      if (canvasRef.current) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
      }
    };
    updateCanvasResolution();
    window.addEventListener("resize", updateCanvasResolution);

    // Progressive loading pipeline
    const loadFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (framesRef.current[idx]) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = getFramePath(idx);
        img.onload = () => {
          if (!isCancelled) {
            framesRef.current[idx] = img;
            count++;
            setLoadedCount(count);
            // First frame loaded renders immediately
            if (idx === 1 && currentRenderedFrameRef.current === 1) {
              drawFrame(img);
              setIsReady(true);
            }
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // Load all frames with priority ordering
    const preloadSequence = async () => {
      // 1. Initial immediate batch
      const immediateBatch: Promise<void>[] = [];
      for (let i = 1; i <= Math.min(45, TOTAL_FRAMES); i++) {
        immediateBatch.push(loadFrame(i));
      }
      await Promise.all(immediateBatch);
      setIsReady(true);

      // 2. Continuous parallel loading for all remaining frames
      for (let i = 46; i <= TOTAL_FRAMES; i += 10) {
        if (isCancelled) break;
        const chunk: Promise<void>[] = [];
        for (let j = i; j < i + 10 && j <= TOTAL_FRAMES; j++) {
          chunk.push(loadFrame(j));
        }
        await Promise.all(chunk);
      }
    };

    preloadSequence();

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", updateCanvasResolution);
    };
  }, [drawFrame]);

  // Main scroll loop with RAF interpolation and physics-based inertia
  useEffect(() => {
    let currentRenderFrame = 1;
    let targetFrame = 1;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolledDist = -rect.top;
      const rawProgress = Math.min(Math.max(scrolledDist / totalScrollableDistance, 0), 1);

      setScrollProgress(rawProgress);
      if (rawProgress > 0.01 && !hasScrolled) {
        setHasScrolled(true);
      }

      // Calculate target frame
      targetFrame = 1 + Math.round(rawProgress * (TOTAL_FRAMES - 1));
      targetFrameRef.current = targetFrame;

      // Update typography scene state
      let foundScene = SCENE_CONFIGS[0];
      for (let i = 0; i < SCENE_CONFIGS.length; i++) {
        const sc = SCENE_CONFIGS[i];
        if (rawProgress >= sc.startProgress && rawProgress <= sc.endProgress) {
          foundScene = sc;
          break;
        } else if (rawProgress > sc.endProgress) {
          foundScene = sc;
        }
      }
      setActiveScene(foundScene);

      // Calculate scene opacity, translation & blur curves with a generous dwell plateau
      // This ensures the typography stays at 100% visibility for reading before gently exiting
      const sceneRange = foundScene.endProgress - foundScene.startProgress;
      const progressInScene = (rawProgress - foundScene.startProgress) / (sceneRange || 1);

      // Plateau curve:
      // 0.0 to 0.15 -> fade in (0 to 1)
      // 0.15 to 0.82 -> steady 1.0 full dwell for reading
      // 0.82 to 1.0 -> fade out (1 to 0)
      let opacity = 0;
      let translateY = 0;
      let blur = 0;

      if (progressInScene < 0.15) {
        const t = Math.max(0, progressInScene / 0.15);
        opacity = t;
        translateY = (1 - t) * 16;
        blur = (1 - t) * 6;
      } else if (progressInScene <= 0.82) {
        opacity = 1;
        translateY = 0;
        blur = 0;
      } else {
        const t = Math.min(1, (progressInScene - 0.82) / 0.18);
        opacity = 1 - t;
        translateY = -t * 14;
        blur = t * 5;
      }

      setSceneOpacity(opacity);
      setSceneTranslateY(translateY);
      setSceneBlur(blur);

      // Video fallback sync if frames are absent
      if (useVideoFallback && videoRef.current && videoRef.current.duration) {
        videoRef.current.currentTime = rawProgress * videoRef.current.duration;
      }
    };

    // Render loop using requestAnimationFrame with smoothed float interpolation
    const tick = () => {
      // Gentle damping factor (0.12 instead of 0.35) makes motion silky, deliberate, and weightier
      const diff = targetFrameRef.current - currentRenderFrame;
      if (Math.abs(diff) > 0.005) {
        currentRenderFrame += diff * 0.12;

        const baseFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(currentRenderFrame)));
        const nextFrame = Math.min(TOTAL_FRAMES, baseFrame + 1);
        const subFrameFraction = currentRenderFrame - baseFrame; // 0.0 to 1.0

        const baseImg = framesRef.current[baseFrame];
        const nextImg = framesRef.current[nextFrame];

        if (baseImg && baseImg.complete) {
          drawFrame(baseImg, nextImg, subFrameFraction);
          currentRenderedFrameRef.current = Math.round(currentRenderFrame);
        } else {
          // Fallback nearest loaded frame lookup
          for (let offset = 1; offset < 20; offset++) {
            const lower = baseFrame - offset;
            const higher = baseFrame + offset;
            if (lower >= 1 && framesRef.current[lower]?.complete) {
              drawFrame(framesRef.current[lower]!);
              break;
            } else if (higher <= TOTAL_FRAMES && framesRef.current[higher]?.complete) {
              drawFrame(framesRef.current[higher]!);
              break;
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, hasScrolled, useVideoFallback]);

  // Position class mapper for editorial scene typography
  const getPositionClasses = (pos: SceneConfig["position"]) => {
    switch (pos) {
      case "top-left":
        return "top-24 sm:top-32 left-6 sm:left-16 text-left items-start";
      case "bottom-left":
        return "bottom-24 sm:bottom-32 left-6 sm:left-16 text-left items-start";
      case "top-right":
        return "top-24 sm:top-32 right-6 sm:right-16 text-right items-end";
      case "bottom-right":
        return "bottom-24 sm:bottom-32 right-6 sm:right-16 text-right items-end";
      case "center-right":
        return "top-1/2 -translate-y-1/2 right-6 sm:right-16 text-right items-end";
      case "center-left":
      default:
        return "top-1/2 -translate-y-1/2 left-6 sm:left-16 text-left items-start";
    }
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#07090e]"
      style={{ height: "1050vh" }} // 10.5x viewport track: gives each scene expansive reading scroll distance
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#07090e] select-none">
        
        {/* HTML5 Canvas for instant scrubbing without codec keyframe stutter */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Video fallback element if direct video sync is selected */}
        {useVideoFallback && (
          <video
            ref={videoRef}
            src="/theme-park-hero.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Cinematic Vignette & Edge Shadow Overlay */}
        <div className="absolute inset-0 pointer-events-none cinematic-vignette opacity-85" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07090e]/80 to-transparent pointer-events-none" />

        {/* Scene Typography Layer - Dynamic positioning */}
        <div
          className={`absolute pointer-events-none max-w-xl transition-all duration-75 ease-out flex flex-col ${getPositionClasses(
            activeScene.position
          )}`}
          style={{
            opacity: sceneOpacity,
            transform: `translateY(${sceneTranslateY}px)`,
            filter: `blur(${sceneBlur}px)`,
          }}
        >
          {/* Scene Tag */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span
              className="w-2 h-2 rounded-full shadow-lg"
              style={{ backgroundColor: activeScene.accentColor }}
            />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-white/70 uppercase">
              {activeScene.tag}
            </span>
          </div>

          {/* Scene Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] title-glow">
            {activeScene.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 sm:mt-4 text-sm sm:text-lg text-white/85 font-normal tracking-wide max-w-md leading-relaxed drop-shadow-md">
            {activeScene.subtitle}
          </p>

          {/* Ride Specs / Telemetry badges (if present) */}
          {activeScene.rideStats && (
            <div className="mt-5 flex items-center gap-4 border-t border-white/15 pt-3">
              {activeScene.rideStats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-white/50">
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scrub Telemetry / HUD Indicator (Corner) */}
        <div className="absolute bottom-8 left-6 sm:left-12 flex items-center gap-4 pointer-events-none z-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                TIMELINE
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-400">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
            {/* Minimal Progress Bar */}
            <div className="w-24 sm:w-36 h-[2px] bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 transition-all duration-75 ease-out rounded-full"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[9px] font-mono text-white/30 tracking-widest hidden sm:inline-block">
            {currentRenderedFrameRef.current} / {TOTAL_FRAMES} FR
          </span>
        </div>

        {/* Initial Scroll Down Indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-all duration-700 ${
            hasScrolled ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80 animate-pulse">
            Scroll To Explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Ride Quick-Jump Dots on Right Side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 pointer-events-auto z-20">
          {SCENE_CONFIGS.map((scene, idx) => {
            const isActive = activeScene.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  if (containerRef.current) {
                    const totalDist = containerRef.current.offsetHeight - window.innerHeight;
                    const targetScroll = containerRef.current.offsetTop + scene.peakProgress * totalDist;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                  }
                }}
                className="group flex items-center justify-end gap-3 focus:outline-none"
                aria-label={`Jump to ${scene.name}`}
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                    isActive ? "text-amber-400 opacity-100" : "text-white/60"
                  }`}
                >
                  {scene.name}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-6 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                      : "w-2 h-2 bg-white/25 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Preload Progress Indicator (Discreet top bar) */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none">
            <div
              className="h-full bg-amber-400/40 transition-all duration-300"
              style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
