"use client";

import { useState, useRef, useMemo } from "react";
import { PROJECTS, ContentBlock } from "@/data/projects";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"landing" | "design" | "research" | "info">("landing");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "bright">("dark");
  const [isScrolled, setIsScrolled] = useState(false);

  // Lightbox modal state
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt?: string; caption?: string } | null>(null);

  // Ref to programmatically scroll main content back to top
  const mainRef = useRef<HTMLElement | null>(null);

  // Section timeline tracking
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Which category tab is selected for each "table" block that uses the
  // category/items/agencies row format. Keyed by block index since a project
  // could have more than one such table.
  const [selectedCategoryByBlock, setSelectedCategoryByBlock] = useState<Record<number, number>>({});

  const designProjects = PROJECTS.filter((p) => p.type === "design");
  const researchProjects = PROJECTS.filter((p) => p.type === "research");

  const activeProject = PROJECTS.find((p) => p.id === activeId) || null;

  // Derive sections from divider positions + sectionTitles, so section boundaries
  // stay in sync with the content automatically instead of hardcoded block indices.
  const sections = useMemo(() => {
    if (!activeProject?.sectionTitles || activeProject.sectionTitles.length === 0) {
      return undefined;
    }

    const result: { id: string; title: string; blockIndex: number }[] = [];
    let titleIdx = 0;
    let segmentStart = 0;

    activeProject.blocks.forEach((block, i) => {
      if (block.type === "divider") {
        result.push({
          id: `sec-${titleIdx}`,
          title: activeProject.sectionTitles![titleIdx] ?? `Section ${titleIdx + 1}`,
          blockIndex: segmentStart,
        });
        titleIdx++;
        segmentStart = i + 1;
      }
    });

    // Final segment after the last divider (or the only segment if there are no dividers)
    result.push({
      id: `sec-${titleIdx}`,
      title: activeProject.sectionTitles![titleIdx] ?? `Section ${titleIdx + 1}`,
      blockIndex: segmentStart,
    });

    return result;
  }, [activeProject]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;

    if (scrollTop > 30) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (!sections || sections.length === 0) return;

    // The "activation line" is how far from the top of the scroll container
    // a section's heading needs to cross before it's considered active.
    const activationLine = 160;
    let current = sections[0].id;

    for (const section of sections) {
      const el = sectionRefs.current[section.id];
      if (el && el.offsetTop - scrollTop <= activationLine) {
        current = section.id;
      }
    }

    setActiveSectionId(current);
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTabChange = (tab: "landing" | "design" | "research" | "info") => {
    setActiveTab(tab);
    setIsScrolled(false);
    sectionRefs.current = {};
    setActiveSectionId(null);
    // Land on the thumbnail gallery rather than jumping into the first project.
    setActiveId(null);
  };

  const handleSelectProject = (id: string) => {
    sectionRefs.current = {};
    setActiveSectionId(null);
    setActiveId(id);
    setIsScrolled(false);
    scrollToTop();
  };

  // Return to the thumbnail grid for the current tab
  const backToGallery = () => {
    sectionRefs.current = {};
    setActiveSectionId(null);
    setActiveId(null);
    setIsScrolled(false);
  };

  // Jump the middle column's scroll position to a given section, offset by
  // the same activation line used in handleScroll so the highlight stays in sync.
  const scrollToSection = (sectionId: string) => {
    const container = mainRef.current;
    const target = sectionRefs.current[sectionId];
    if (!container || !target) return;

    const activationLine = 160;
    const top = target.offsetTop - activationLine;

    container.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    setActiveSectionId(sectionId);
  };

  // Pick a cover image for a gallery card: explicit `thumbnail` (with optional
  // light-mode variant) if set, otherwise fall back to the first image block.
  const getThumbnail = (project: (typeof PROJECTS)[number]) => {
    if (project.thumbnail) {
      return !isDark && project.thumbnailLight ? project.thumbnailLight : project.thumbnail;
    }

    const firstImage = project.blocks?.find(
      (b) => b.type === "image" || b.type === "image-row"
    );
    if (!firstImage) return null;
    if (firstImage.type === "image") return firstImage.src;
    if (firstImage.type === "image-row") return firstImage.images[0]?.src ?? null;
    return null;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "bright" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`h-screen w-screen overflow-hidden font-sans flex flex-col justify-between transition-colors duration-300 ${
        isDark ? "bg-neutral-900 text-neutral-100" : "bg-white text-neutral-900"
      }`}
    >
      {/* Dynamic Top Header */}
      <header
        className={`grid grid-cols-[auto_1fr] px-6 md:px-8 flex-shrink-0 items-center transition-all duration-300 ease-in-out ${
          isScrolled ? "pt-4 pb-3" : "pt-8 pb-4"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTabChange("landing")}
            className={`font-normal tracking-tight text-left hover:opacity-70 transition-all duration-300 ${
              isScrolled ? "text-xs md:text-sm" : "text-3xl md:text-4xl"
            } ${isDark ? "text-white" : "text-black"}`}
          >
            Richard Ruide Li
          </button>

          {/* Active Project Name next to your name when scrolled */}
          {isScrolled && activeProject && (
            <span
              className={`text-xs md:text-sm font-light transition-all duration-300 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              / {activeProject.title}
            </span>
          )}
        </div>

        {/* Dynamic Right Controls */}
        <nav
          className={`flex items-center justify-end gap-6 md:gap-8 transition-all duration-300 ${
            isScrolled ? "text-xs md:text-sm" : "text-base md:text-lg"
          }`}
        >
          {/* Default Navigation Links (hidden on scroll) */}
          {!isScrolled && (
            <>
              <button
                onClick={() => handleTabChange("design")}
                className={`transition-colors ${
                  activeTab === "design"
                    ? isDark
                      ? "text-white font-semibold"
                      : "text-black font-semibold"
                    : isDark
                    ? "text-neutral-400 hover:text-neutral-100"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                Design
              </button>
              <button
                onClick={() => handleTabChange("research")}
                className={`transition-colors ${
                  activeTab === "research"
                    ? isDark
                      ? "text-white font-semibold"
                      : "text-black font-semibold"
                    : isDark
                    ? "text-neutral-400 hover:text-neutral-100"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                Research
              </button>
              <button
                onClick={() => handleTabChange("info")}
                className={`transition-colors ${
                  activeTab === "info"
                    ? isDark
                      ? "text-white font-semibold"
                      : "text-black font-semibold"
                    : isDark
                    ? "text-neutral-400 hover:text-neutral-100"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                Info
              </button>
            </>
          )}

          {/* Back Button (Appears only on scroll) */}
          {isScrolled && (
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1 font-medium transition-colors ${
                isDark ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black"
              }`}
            >
              <span className="text-base">↑</span> Back
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`text-xs md:text-sm transition-colors cursor-pointer select-none ${
              isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
            }`}
          >
            <span className={!isDark ? "font-semibold text-black" : "font-normal opacity-70"}>
              Bright
            </span>{" "}
            /{" "}
            <span className={isDark ? "font-semibold text-white" : "font-normal opacity-70"}>
              Dark
            </span>
          </button>
        </nav>
      </header>

      {/* Main Display Area */}
      <div className="flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
        {/* LANDING TAB */}
        {activeTab === "landing" && (
          <main className="px-8 md:px-12 max-w-4xl flex flex-col gap-6">
            <p className="text-2xl md:text-3xl font-light leading-snug">
              Hello! I am a design researcher working to uncover and reshape how we systematically interact with our environments.
            </p>
          </main>
        )}

        {/* INFO TAB */}
        {activeTab === "info" && (
          <main className="px-8 md:px-12 max-w-2xl flex flex-col gap-4">
            <p className={`leading-relaxed text-base ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
              I work at the intersection of civic technology, experience design, and spatial research. 
              My work focuses on translating complex socio-technical systems into intuitive digital products and interventions.
            </p>
            <div className="pt-2 flex gap-6 text-sm font-semibold">
              <a href="mailto:email@example.com" className="underline hover:opacity-50">Email</a>
              <a href="#resume" className="underline hover:opacity-50">Resume</a>
            </div>
          </main>
        )}

        {/* WORK TABS — GALLERY INDEX (no project selected yet) */}
        {(activeTab === "design" || activeTab === "research") && !activeProject && (
          <main className="overflow-y-auto h-full no-scrollbar">
            {(activeTab === "design" ? designProjects : researchProjects).map((project) => {
              const thumb = getThumbnail(project);

              return (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className="group relative block w-full h-full min-h-[420px] overflow-hidden text-left focus:outline-none flex-shrink-0"
                >
                  {/* Full-bleed image */}
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className={`absolute inset-0 ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`} />
                  )}

                  {/* Gradient for text legibility */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDark
                        ? "from-black/90 via-black/20 to-transparent"
                        : "from-white/90 via-white/10 to-transparent"
                    }`}
                  />

                  {/* Overlaid content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 gap-3 max-w-3xl">
                    <h3
                      className={`text-3xl md:text-5xl font-semibold tracking-tight transition-colors ${
                        isDark ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      {project.title}
                    </h3>

                    {project.description && (
                      <p
                        className={`text-sm md:text-base leading-relaxed max-w-xl ${
                          isDark ? "text-neutral-200" : "text-neutral-700"
                        }`}
                      >
                        {project.description}
                      </p>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] px-2.5 py-0.5 rounded-full border backdrop-blur-sm transition-colors ${
                              isDark
                                ? "border-white/30 text-neutral-100 bg-black/20"
                                : "border-neutral-400 text-neutral-800 bg-white/40"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </main>
        )}

        {/* WORK TABS: Static Sidebars & Scrollable Showcase */}
        {(activeTab === "design" || activeTab === "research") && activeProject && (
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_320px] h-full overflow-hidden">
            {/* Left Sidebar Index */}
            <aside className="flex flex-col justify-between p-6 md:p-8 flex-shrink-0 select-none">
              <div className="flex flex-col gap-4">
                {sections ? (
                  /* --- SCROLL-TRACKED SECTION TIMELINE RAIL --- */
                  <div className="flex flex-col animate-in fade-in duration-300">
                    {sections.map((section, i) => {
                      const activeIdx = sections.findIndex((s) => s.id === activeSectionId);
                      const isActive = section.id === activeSectionId;
                      const isPast = activeIdx > i;

                      return (
                        <div key={section.id} className="flex flex-col items-start">
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className="flex items-start gap-3 text-left focus:outline-none group/rail"
                          >
                            <span
                              className={`mt-[3px] w-2.5 h-2.5 rounded-full border transition-colors duration-300 flex-shrink-0 group-hover/rail:border-neutral-300 ${
                                isActive || isPast
                                  ? isDark
                                    ? "bg-white border-white"
                                    : "bg-black border-black"
                                  : isDark
                                  ? "bg-transparent border-neutral-600"
                                  : "bg-transparent border-neutral-400"
                              }`}
                            />
                            <span
                              className={`text-xs leading-tight transition-colors duration-300 ${
                                isActive
                                  ? isDark
                                    ? "text-white font-medium"
                                    : "text-black font-medium"
                                  : isDark
                                  ? "text-neutral-500 group-hover/rail:text-neutral-300"
                                  : "text-neutral-400 group-hover/rail:text-neutral-600"
                              }`}
                            >
                              {section.title}
                            </span>
                          </button>
                          {i < sections.length - 1 && (
                            <div
                              className={`w-[1px] h-8 ml-[4.5px] transition-colors duration-500 ${
                                isPast
                                  ? isDark
                                    ? "bg-white"
                                    : "bg-black"
                                  : isDark
                                  ? "bg-neutral-700"
                                  : "bg-neutral-300"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* --- DEFAULT PROJECT LIST --- */
                  <>
                    {/* Back to thumbnail grid */}
                    <button
                      onClick={backToGallery}
                      className={`flex items-center gap-1.5 text-xs mb-1 transition-colors ${
                        isDark
                          ? "text-neutral-500 hover:text-white"
                          : "text-neutral-400 hover:text-black"
                      }`}
                    >
                      <span>←</span> All {activeTab === "design" ? "Design" : "Research"}
                    </button>

                    {activeTab === "design" && (
                      <div>
                        <h2 className={`text-xs uppercase tracking-wider font-semibold mb-2 ${isDark ? "text-neutral-400" : "text-neutral-400"}`}>
                          Design
                        </h2>
                        <nav className="flex flex-col gap-1.5">
                          {designProjects.map((project) => (
                            <button
                              key={project.id}
                              onClick={() => handleSelectProject(project.id)}
                              className={`text-left text-sm transition-colors ${
                                activeId === project.id
                                  ? isDark
                                    ? "font-semibold text-white"
                                    : "font-semibold text-black"
                                  : isDark
                                  ? "text-neutral-400 hover:text-neutral-100"
                                  : "text-neutral-500 hover:text-black"
                              }`}
                            >
                              {project.title}
                            </button>
                          ))}
                        </nav>
                      </div>
                    )}

                    {activeTab === "research" && (
                      <div>
                        <h2 className={`text-xs uppercase tracking-wider font-semibold mb-2 ${isDark ? "text-neutral-400" : "text-neutral-400"}`}>
                          Research
                        </h2>
                        <nav className="flex flex-col gap-1.5">
                          {researchProjects.map((project) => (
                            <button
                              key={project.id}
                              onClick={() => handleSelectProject(project.id)}
                              className={`text-left text-sm transition-colors ${
                                activeId === project.id
                                  ? isDark
                                    ? "font-semibold text-white"
                                    : "font-semibold text-black"
                                  : isDark
                                  ? "text-neutral-400 hover:text-neutral-100"
                                  : "text-neutral-500 hover:text-black"
                              }`}
                            >
                              {project.title}
                            </button>
                          ))}
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer Links */}
              <div className={`pt-4 flex flex-col gap-1 text-xs ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                <a href="#resume" className={isDark ? "hover:text-white" : "hover:text-black"}>Resume</a>
                <a href="mailto:email@example.com" className={isDark ? "hover:text-white" : "hover:text-black"}>Email</a>
              </div>
            </aside>

            {/* Middle Column Showcase Area */}
            <main
              ref={mainRef}
              onScroll={handleScroll}
              className="px-6 md:px-8 pt-0 pb-8 overflow-y-auto h-full no-scrollbar"
            >
              {activeProject && (
                <article className="flex flex-col gap-6 w-full pb-16">
                  {/* Dynamic Sequential Blocks */}
                  <div className="flex flex-col gap-6">
                    {activeProject.blocks?.map((block: ContentBlock, index: number) => {
                      // Does a section start at this block index? If so, wrap the
                      // rendered output in a ref div so scroll tracking can find it.
                      const section = sections?.find((s) => s.blockIndex === index);

                      const rendered = (() => {
                        if (block.type === "text") {
                          const textBlock = block as {
                            content: string;
                            isBold?: boolean;
                            size?: "sm" | "base" | "lg" | "xl";
                          };

                          // Helper for inline markdown link rendering ([text](url))
                          const parseLinks = (text: string) => {
                            const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
                            const parts = [];
                            let lastIndex = 0;
                            let match;

                            while ((match = regex.exec(text)) !== null) {
                              if (match.index > lastIndex) {
                                parts.push(text.substring(lastIndex, match.index));
                              }
                              parts.push(
                                <a
                                  key={match.index}
                                  href={match[2]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline underline-offset-4 decoration-neutral-400 hover:decoration-current transition-colors"
                                >
                                  {match[1]}
                                </a>
                              );
                              lastIndex = regex.lastIndex;
                            }

                            if (lastIndex < text.length) {
                              parts.push(text.substring(lastIndex));
                            }

                            return parts.length > 0 ? parts : text;
                          };

                          // Preset size mapping
                          const sizeClasses = {
                            sm: "text-xs md:text-sm",
                            base: "text-sm md:text-base",
                            lg: "text-base md:text-lg",
                            xl: "text-lg md:text-xl",
                          };

                          // Fallback priority: explicit size prop -> isBold default (lg) -> normal default (sm)
                          const selectedSize = textBlock.size
                            ? sizeClasses[textBlock.size]
                            : textBlock.isBold
                            ? sizeClasses.lg
                            : sizeClasses.sm;

                          return (
                            <p
                              key={index}
                              className={`w-full my-3 leading-relaxed transition-colors duration-200 ${selectedSize} ${
                                textBlock.isBold ? "font-semibold" : "font-normal"
                              } ${
                                isDark
                                  ? textBlock.isBold ? "text-neutral-100" : "text-neutral-300"
                                  : textBlock.isBold ? "text-neutral-900" : "text-neutral-700"
                              }`}
                            >
                              {parseLinks(textBlock.content)}
                            </p>
                          );
                        }

                        if (block.type === "image") {
                          const imageSrc = !isDark && block.srcLight ? block.srcLight : block.src;
                          const shouldShowCaption = block.showCaptionInline !== false && block.caption;

                          return (
                            <figure key={index} className="flex flex-col gap-2 w-full my-4">
                              <div
                                onClick={() =>
                                  setExpandedImage({
                                    src: imageSrc,
                                    alt: block.alt || activeProject.title,
                                    caption: block.caption,
                                  })
                                }
                                style={{
                                  maxWidth: block.width ? `${block.width}px` : "100%",
                                }}
                                className="relative mx-auto w-full rounded-sm overflow-hidden cursor-pointer group bg-transparent transition-colors duration-300"
                              >
                                <img
                                  src={imageSrc}
                                  alt={block.alt || activeProject.title}
                                  className="w-full h-auto object-cover"
                                />
                              </div>

                              {shouldShowCaption && (
                                <figcaption
                                  style={{
                                    maxWidth: block.width ? `${block.width}px` : "100%",
                                  }}
                                  className={`mx-auto w-full text-xs text-center ${
                                    isDark ? "text-neutral-400" : "text-neutral-500"
                                  }`}
                                >
                                  {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          );
                        }

                        if (block.type === "image-row") {
                          const shouldShowCaption = (block as any).showCaptionInline !== false;

                          return (
                            <div key={index} className="w-full my-6 flex flex-col items-center">
                              <div 
                                className="w-full mx-auto flex flex-wrap items-start justify-center gap-6"
                                style={{ maxWidth: (block as any).maxWidth ? `${(block as any).maxWidth}px` : "100%" }}
                              >
                                {block.images.map((img, i) => {
                                  const imgSrc = !isDark && img.srcLight ? img.srcLight : img.src;

                                  return (
                                    <div 
                                      key={i} 
                                      className="flex flex-col items-start gap-2 flex-1 min-w-[200px]"
                                      style={{ maxWidth: img.width ? `${img.width}px` : "none" }}
                                    >
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setExpandedImage({
                                            src: imgSrc,
                                            alt: img.alt || `Row image ${i + 1}`,
                                            caption: img.caption,
                                          })
                                        }
                                        className="w-full text-left group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg overflow-hidden cursor-zoom-in"
                                      >
                                        <img
                                          src={imgSrc}
                                          alt={img.alt || `Row image ${i + 1}`}
                                          className={`w-full h-auto object-contain rounded-lg ${
                                            img?.transparent ? "bg-transparent" : ""
                                          }`}
                                        />
                                      </button>

                                      {shouldShowCaption && img.caption && (
                                        <span
                                          className={`text-xs text-left w-full ${
                                            isDark ? "text-neutral-400" : "text-neutral-500"
                                          }`}
                                        >
                                          {img.caption}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        if (block.type === "table") {
                          const rows = block.rows as any[];
                          const isCategoryTable =
                            rows.length > 0 && !Array.isArray(rows[0]);

                          if (isCategoryTable) {
                            const selectedIdx = selectedCategoryByBlock[index] ?? 0;
                            const selectedRow = rows[selectedIdx];

                            return (
                              <div key={index} className="w-full my-6">
                                {/* Horizontal category icon tabs */}
                                <div className="flex items-start justify-center gap-8 md:gap-12 pb-8 flex-wrap">
                                  {rows.map((row, rIdx) => {
                                    const isSelected = rIdx === selectedIdx;
                                    return (
                                      <button
                                        key={rIdx}
                                        type="button"
                                        onClick={() =>
                                          setSelectedCategoryByBlock((prev) => ({
                                            ...prev,
                                            [index]: rIdx,
                                          }))
                                        }
                                        className="flex flex-col items-center gap-2 focus:outline-none group/tab"
                                      >
                                        {row.category?.icon && (
                                          <img
                                            src={!isDark && row.category.iconLight ? row.category.iconLight : row.category.icon}
                                            alt={`${row.category.name} icon`}
                                            className={`h-8 w-8 object-contain transition-opacity duration-300 ${
                                              isSelected ? "opacity-100" : "opacity-40 group-hover/tab:opacity-70"
                                            }`}
                                          />
                                        )}
                                        {row.category?.name && (
                                          <span
                                            className={`text-xs whitespace-nowrap transition-colors duration-300 ${
                                              isSelected
                                                ? isDark
                                                  ? "text-white font-semibold"
                                                  : "text-black font-semibold"
                                                : isDark
                                                ? "text-neutral-500 group-hover/tab:text-neutral-300"
                                                : "text-neutral-400 group-hover/tab:text-neutral-600"
                                            }`}
                                          >
                                            {row.category.name}
                                          </span>
                                        )}
                                        <span
                                          className={`mt-1 h-[2px] w-6 rounded-full transition-colors duration-300 ${
                                            isSelected
                                              ? isDark
                                                ? "bg-white"
                                                : "bg-black"
                                              : "bg-transparent"
                                          }`}
                                        />
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Selected category's data, shown as a real table with headers + gridlines */}
                                {selectedRow && (
                                  <table className="w-full text-left border-collapse min-w-[500px]">
                                    <thead>
                                      <tr
                                        className={`border-b text-xs uppercase tracking-wider ${
                                          isDark ? "border-neutral-700 text-neutral-400" : "border-neutral-300 text-neutral-500"
                                        }`}
                                      >
                                        {block.headers && block.headers.length > 1 ? (
                                          // Skip the first header ("Category") since it's shown via the tabs above
                                          block.headers.slice(1).map((header, hIdx) => (
                                            <th
                                              key={hIdx}
                                              className={`pb-3 px-4 font-semibold ${hIdx === 0 ? "text-left pl-0" : "text-left"}`}
                                            >
                                              {header}
                                            </th>
                                          ))
                                        ) : (
                                          <>
                                            <th className="pb-3 px-4 font-semibold pl-0">Practices</th>
                                            <th className="pb-3 px-4 font-semibold">Impact</th>
                                            <th className="pb-3 px-4 font-semibold w-1/6">Agency</th>
                                          </>
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody className={`divide-y ${isDark ? "divide-neutral-800" : "divide-neutral-200"}`}>
                                      {selectedRow.items?.map((item: any, itemIdx: number) => (
                                        <tr key={itemIdx}>
                                          <td
                                            className={`py-4 px-4 pl-0 text-xs md:text-sm leading-relaxed ${
                                              isDark ? "text-neutral-300" : "text-neutral-700"
                                            }`}
                                          >
                                            {item.practice}
                                          </td>
                                          <td
                                            className={`py-4 px-4 text-xs md:text-sm leading-relaxed ${
                                              isDark ? "text-neutral-300" : "text-neutral-700"
                                            }`}
                                          >
                                            {item.impact}
                                          </td>

                                          {/* Agency cell only on the first item row, spanning the rest */}
                                          {itemIdx === 0 && selectedRow.agencies && selectedRow.agencies.length > 0 && (
                                            <td
                                              rowSpan={selectedRow.items.length}
                                              className="py-6 px-4 align-middle"
                                            >
                                              <div className="flex flex-col gap-4 items-center justify-center">
                                                {selectedRow.agencies.map((agencySrc: string, aIdx: number) => (
                                                  <img
                                                    key={aIdx}
                                                    src={agencySrc}
                                                    alt="Certifying agency"
                                                    className="h-10 max-w-[70px] object-contain"
                                                  />
                                                ))}
                                              </div>
                                            </td>
                                          )}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            );
                          }

                          // --- Simple string-array table (unchanged) ---
                          return (
                            <div key={index} className="w-full my-6 overflow-x-auto">
                              <table className="w-full text-left border-collapse min-w-[500px]">
                                {/* Table Header */}
                                <thead>
                                  <tr className={`border-b text-xs uppercase tracking-wider ${
                                    isDark ? "border-neutral-700 text-neutral-400" : "border-neutral-300 text-neutral-500"
                                  }`}>
                                    {block.headers && block.headers.length > 0 ? (
                                      block.headers.map((header, hIdx) => (
                                        <th
                                          key={hIdx}
                                          className={`pb-3 px-4 font-semibold ${
                                            hIdx === 0 ? "text-left pl-6" : "text-left"
                                          }`}
                                        >
                                          {header}
                                        </th>
                                      ))
                                    ) : (
                                      <>
                                        <th className="pb-3 px-4 font-semibold w-1/6">Category</th>
                                        <th className="pb-3 px-4 font-semibold w-2/5">Practices</th>
                                        <th className="pb-3 px-4 font-semibold w-2/5">Impact</th>
                                        <th className="pb-3 px-4 font-semibold w-1/6">Agency</th>
                                      </>
                                    )}
                                  </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className={`divide-y ${isDark ? "divide-neutral-800" : "divide-neutral-200"}`}>
                                  {rows.map((row: any, rIdx: number) => {
                                    const isLastRow = rIdx === rows.length - 1;
                                    return (
                                      <tr
                                        key={rIdx}
                                        className={isLastRow ? `font-semibold ${isDark ? "text-white" : "text-neutral-900"}` : ""}
                                      >
                                        {row.map((cell: string, cIdx: number) => (
                                          <td key={cIdx} className={`py-4 px-4 text-xs md:text-sm ${cIdx === 0 ? "pl-6" : ""}`}>
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        if (block.type === "video") {
                          const isAutoplay = (block as any).autoplay === true;
                          const isLoop = (block as any).loop === true;
                          const showControls = (block as any).controls !== false;

                          return (
                            <figure key={index} className="flex flex-col gap-2">
                              <div
                                className={`relative w-full rounded-sm overflow-hidden ${
                                  isDark ? "bg-neutral-800" : "bg-neutral-100"
                                }`}
                              >
                                <video
                                  controls={showControls}
                                  autoPlay={isAutoplay}
                                  muted={isAutoplay}
                                  playsInline={isAutoplay}
                                  loop={isLoop}
                                  className="w-full h-auto"
                                >
                                  <source src={block.src} type="video/mp4" />
                                  Your browser does not support video playback.
                                </video>
                              </div>
                              {block.caption && (
                                <figcaption className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                                  {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          );
                        }

                        if (block.type === "divider") {
                          return (
                            <hr
                              key={index}
                              className={`w-full my-8 border-0 border-t ${
                                isDark ? "border-neutral-700" : "border-neutral-300"
                              }`}
                            />
                          );
                        }

                        if (block.type === "figma") {
                          let baseUrl = block.url.startsWith("https://www.figma.com/embed")
                            ? block.url
                            : `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(block.url)}`;

                          if (!baseUrl.includes("hide-ui=1")) {
                            baseUrl += "&hide-ui=1";
                          }

                          if (baseUrl.includes("scaling=")) {
                            baseUrl = baseUrl.replace(/scaling=[^&]+/, "scaling=contain");
                          } else {
                            baseUrl += "&scaling=contain";
                          }

                          return (
                            <div key={index} className="w-full mt-2 mb-8 flex flex-col items-center gap-3">
                              <div
                                className={`w-full max-w-lg mx-auto overflow-hidden rounded-xl transition-colors duration-300 flex items-center justify-center ${
                                  isDark ? "bg-black" : "bg-neutral-900"
                                }`}
                                style={{ height: block.height ? `${block.height}px` : "620px" }}
                              >
                                <iframe
                                  src={baseUrl}
                                  title={block.title || "Figma Interactive Prototype"}
                                  className="w-full h-full border-0"
                                  allowFullScreen
                                />
                              </div>

                              {block.title && (
                                <span
                                  className={`text-xs text-center ${
                                    isDark ? "text-neutral-400" : "text-neutral-500"
                                  }`}
                                >
                                  {block.title}
                                </span>
                              )}
                            </div>
                          );
                        }
                        
                        if (block.type === "pipeline-steps") {
                          return (
                            <div key={index} className="w-full mt-1 mb-4 flex flex-col gap-4">
                              {block.steps.map((step) => (
                                <div
                                  key={step.num}
                                  className={`p-5 rounded-lg border transition-colors ${
                                    isDark
                                      ? "bg-neutral-900/50 border-neutral-800"
                                      : "bg-neutral-50 border-neutral-200"
                                  }`}
                                >
                                  <div className="flex items-start gap-4">
                                    <span
                                      className={`text-xs font-mono font-bold px-2 py-1 rounded shrink-0 ${
                                        isDark ? "bg-neutral-800 text-neutral-400" : "bg-neutral-200 text-neutral-600"
                                      }`}
                                    >
                                      {step.num}
                                    </span>
                                    <div className="flex-1">
                                      <h4 className={`text-sm md:text-base font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                                        {step.title}
                                      </h4>
                                      <p className={`mt-1 text-xs md:text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                        {step.desc}
                                      </p>

                                      {/* Render Sub-steps (Techniques) */}
                                      {step.subSteps && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                          {step.subSteps.map((sub, i) => (
                                            <div
                                              key={i}
                                              className={`p-3 rounded border text-left ${
                                                isDark
                                                  ? "bg-neutral-950/60 border-neutral-800/80"
                                                  : "bg-white border-neutral-200"
                                              }`}
                                            >
                                              <span className="text-[10px] font-mono tracking-wider uppercase text-blue-400 font-semibold block mb-1">
                                                {sub.tag}
                                              </span>
                                              <h5 className={`text-xs font-medium mb-1 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                                                {sub.name}
                                              </h5>
                                              <p className={`text-xs leading-normal ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                                                {sub.detail}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (block.type === "image-grid-featured") {
                          const getSrc = (img: { src: string; srcLight?: string }) =>
                            !isDark && img.srcLight ? img.srcLight : img.src;

                          const featuredSrc = getSrc(block.featuredImage);
                          const customMaxWidth = (block as any).maxWidth
                            ? `${(block as any).maxWidth}px`
                            : "640px"; // Capped max-width to scale down the phones

                          return (
                            <figure
                              key={index}
                              className="w-full mx-auto my-6 flex flex-col gap-3"
                              style={{ maxWidth: customMaxWidth }}
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center">
                                {/* Left Column: 2x2 Grid of Smaller Mockups */}
                                <div className="lg:col-span-6 grid grid-cols-2 gap-2 sm:gap-3">
                                  {block.gridImages.map((img, i) => {
                                    const src = getSrc(img);
                                    return (
                                      <div
                                        key={i}
                                        onClick={() =>
                                          setExpandedImage({
                                            src,
                                            alt: img.alt || activeProject.title,
                                            caption: block.caption,
                                          })
                                        }
                                        className="relative rounded-lg overflow-hidden cursor-pointer group bg-transparent"
                                      >
                                        <img
                                          src={src}
                                          alt={img.alt || `Mockup step ${i + 1}`}
                                          className="w-full h-auto object-contain"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Right Column: Featured Larger Mockup */}
                                <div className="lg:col-span-6 flex justify-center items-center">
                                  <div
                                    onClick={() =>
                                      setExpandedImage({
                                        src: featuredSrc,
                                        alt: block.featuredImage.alt || activeProject.title,
                                        caption: block.caption,
                                      })
                                    }
                                    className="relative w-full rounded-lg overflow-hidden cursor-pointer group bg-transparent"
                                  >
                                    <img
                                      src={featuredSrc}
                                      alt={block.featuredImage.alt || "Featured mockup screen"}
                                      className="w-full h-auto object-contain"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Optional Caption */}
                              {block.caption && (
                                <figcaption
                                  className={`text-xs text-center ${
                                    isDark ? "text-neutral-400" : "text-neutral-500"
                                  }`}
                                >
                                  {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          );
                        }

                        // "video-feature": a title + short paragraph beside a looping,
                        // autoplaying, muted video (e.g. a screen recording of a phone flow).
                        // Not yet part of the shared ContentBlock union — see note below.
                        if ((block as any).type === "video-feature") {
                          const vf = block as any as {
                            title: string;
                            text: string;
                            video: string;
                            poster?: string;
                            reverse?: boolean; // default: video on the left, text on the right. true = swap
                          };

                          const textCol = (
                            <div className="flex flex-col gap-3 justify-center">
                              <h3
                                className={`text-lg md:text-xl font-semibold ${
                                  isDark ? "text-white" : "text-neutral-900"
                                }`}
                              >
                                {vf.title}
                              </h3>
                              <p
                                className={`text-sm md:text-base leading-relaxed ${
                                  isDark ? "text-neutral-300" : "text-neutral-700"
                                }`}
                              >
                                {vf.text}
                              </p>
                            </div>
                          );

                          const videoCol = (
                            <div className="flex justify-center">
                              <div
                                className={`w-full max-w-[320px] rounded-2xl overflow-hidden ${
                                  isDark ? "bg-neutral-800" : "bg-neutral-100"
                                }`}
                              >
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  poster={vf.poster}
                                  className="w-full h-auto block"
                                >
                                  <source src={vf.video} type="video/mp4" />
                                </video>
                              </div>
                            </div>
                          );

                          return (
                            <div
                              key={index}
                              className="w-full my-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                            >
                              {vf.reverse ? (
                                <>
                                  {textCol}
                                  {videoCol}
                                </>
                              ) : (
                                <>
                                  {videoCol}
                                  {textCol}
                                </>
                              )}
                            </div>
                          );
                        }

                        return null;
                      })();

                      // If this block starts a section, wrap it with a ref div so
                      // the scroll handler can measure its offsetTop.
                      return section ? (
                        <div
                          key={`section-wrapper-${index}`}
                          ref={(el) => {
                            sectionRefs.current[section.id] = el;
                          }}
                        >
                          {rendered}
                        </div>
                      ) : (
                        rendered
                      );
                    })}
                  </div>
                </article>
              )}
            </main>

            {/* Right Sidebar - Description, Timeframe & Tag Index */}
            <aside className="p-6 md:p-8 flex-shrink-0 hidden md:flex flex-col gap-5 select-none">
              {activeProject && (
                <>
                  {activeProject.description && (
                    <p className={`text-sm leading-relaxed font-medium ${isDark ? "text-white" : "text-neutral-900"}`}>
                      {activeProject.description}
                    </p>
                  )}

                  {activeProject.timeframe && (
                    <p className={`text-[14px] font-semibold ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      {activeProject.timeframe}
                    </p>
                  )}

                  {activeProject.tags && activeProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-colors ${
                            isDark
                              ? "border-neutral-700 text-neutral-300 bg-neutral-800/40"
                              : "border-neutral-300 text-neutral-600 bg-neutral-100/60"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </aside>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {expandedImage && (
        <div
          onClick={() => setExpandedImage(null)}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 backdrop-blur-[2px] cursor-zoom-out transition-colors duration-300 ${
            isDark ? "bg-black/85" : "bg-white/95"
          }`}
        >
          <div className="relative max-w-5xl flex flex-col items-center gap-3 cursor-zoom-out">
            <img
              src={expandedImage.src}
              alt={expandedImage.alt || "Expanded view"}
              className="max-w-full max-h-[70vh] object-contain rounded-md bg-transparent"
            />
            {expandedImage.caption && (
              <p
                className={`text-xs md:text-sm text-center max-w-2xl px-4 font-normal leading-relaxed ${
                  isDark ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                {expandedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
