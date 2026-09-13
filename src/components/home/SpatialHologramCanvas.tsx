"use client";

import { useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  Maximize2,
  Layers,
  Sparkles,
  Shield,
  Activity,
  Zap,
  Box,
  Eye,
} from "lucide-react";

type ModelType = "turbine" | "headset" | "digital-twin";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  p1: number;
  p2: number;
}

interface Hotspot {
  id: string;
  pIndex: number;
  title: string;
  metric: string;
  status: "nominal" | "warning" | "optimal";
  description: string;
}

export function SpatialHologramCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelType, setModelType] = useState<ModelType>("turbine");
  const [isWireframe, setIsWireframe] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Rotation angles
  const rotXRef = useRef(0.3);
  const rotYRef = useRef(0.4);
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Generate 3D geometry based on selected model
  const getModelGeometry = (type: ModelType) => {
    const points: Point3D[] = [];
    const edges: Edge[] = [];
    const hotspots: Hotspot[] = [];

    if (type === "turbine") {
      // Cylindrical turbine with blades and center hub
      const rings = 6;
      const segments = 12;
      const length = 180;
      const radius = 70;

      for (let r = 0; r < rings; r++) {
        const z = (r / (rings - 1) - 0.5) * length;
        const currentRadius = r === 0 || r === rings - 1 ? radius * 0.6 : radius;
        for (let s = 0; s < segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const x = Math.cos(angle) * currentRadius;
          const y = Math.sin(angle) * currentRadius;
          points.push({ x, y, z });

          const currIdx = r * segments + s;
          const nextSIdx = r * segments + ((s + 1) % segments);
          edges.push({ p1: currIdx, p2: nextSIdx });

          if (r > 0) {
            const prevRIdx = (r - 1) * segments + s;
            edges.push({ p1: currIdx, p2: prevRIdx });
          }
        }
      }

      // Add center axle
      points.push({ x: 0, y: 0, z: -length * 0.6 });
      points.push({ x: 0, y: 0, z: length * 0.6 });
      const axleP1 = points.length - 2;
      const axleP2 = points.length - 1;
      edges.push({ p1: axleP1, p2: axleP2 });

      // Hotspots
      hotspots.push({
        id: "valve-1",
        pIndex: 6,
        title: "High-Pressure Relief Valve",
        metric: "142.4 PSI • Normal",
        status: "nominal",
        description: "Simulated emergency pressure drop drill threshold.",
      });
      hotspots.push({
        id: "core-bearing",
        pIndex: Math.floor(points.length / 2),
        title: "Thermal Bearing Chamber",
        metric: "78.2°C • Optimal",
        status: "optimal",
        description: "Real-time thermal telemetry synchronized over WebXR.",
      });
      hotspots.push({
        id: "exhaust",
        pIndex: points.length - 5,
        title: "Vibration Sensor Array",
        metric: "0.04 mm/s RMS",
        status: "nominal",
        description: "6-DOF haptic trigger node for hazardous vibration warnings.",
      });
    } else if (type === "headset") {
      // VR Headset geometry (box visor + strap arcs + lens nodes)
      const w = 90;
      const h = 55;
      const d = 50;

      // Front visor box (8 points)
      const boxCoords = [
        [-w, -h, -d],
        [w, -h, -d],
        [w, h, -d],
        [-w, h, -d],
        [-w * 0.85, -h * 0.85, d],
        [w * 0.85, -h * 0.85, d],
        [w * 0.85, h * 0.85, d],
        [-w * 0.85, h * 0.85, d],
      ];

      boxCoords.forEach(([x, y, z]) => points.push({ x, y, z }));

      // Visor edges
      const boxEdges: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];
      boxEdges.forEach(([p1, p2]) => edges.push({ p1, p2 }));

      // Left and right lenses (circles)
      const lensRadius = 22;
      const leftLensCenter = { x: -35, y: 0, z: -d + 10 };
      const rightLensCenter = { x: 35, y: 0, z: -d + 10 };
      const lensSegs = 8;

      const baseL = points.length;
      for (let i = 0; i < lensSegs; i++) {
        const a = (i / lensSegs) * Math.PI * 2;
        points.push({
          x: leftLensCenter.x + Math.cos(a) * lensRadius,
          y: leftLensCenter.y + Math.sin(a) * lensRadius,
          z: leftLensCenter.z,
        });
        edges.push({ p1: baseL + i, p2: baseL + ((i + 1) % lensSegs) });
      }

      const baseR = points.length;
      for (let i = 0; i < lensSegs; i++) {
        const a = (i / lensSegs) * Math.PI * 2;
        points.push({
          x: rightLensCenter.x + Math.cos(a) * lensRadius,
          y: rightLensCenter.y + Math.sin(a) * lensRadius,
          z: rightLensCenter.z,
        });
        edges.push({ p1: baseR + i, p2: baseR + ((i + 1) % lensSegs) });
      }

      // Strap curve points
      const strapSegs = 10;
      const baseStrap = points.length;
      for (let i = 0; i <= strapSegs; i++) {
        const t = i / strapSegs;
        const a = t * Math.PI;
        points.push({
          x: Math.cos(a) * w * 0.9,
          y: -10,
          z: d + Math.sin(a) * 110,
        });
        if (i > 0) {
          edges.push({ p1: baseStrap + i - 1, p2: baseStrap + i });
        }
      }

      hotspots.push({
        id: "lens-l",
        pIndex: baseL,
        title: "Pancake Optical Engine",
        metric: "2064 x 2208 per eye",
        status: "optimal",
        description: "Full HDR spatial passthrough with 120Hz refresh.",
      });
      hotspots.push({
        id: "tracking-cam",
        pIndex: 1,
        title: "Inside-Out 6-DOF Cameras",
        metric: "<5ms Motion-to-Photon",
        status: "nominal",
        description: "Sub-millimeter real-time hand & controller tracking.",
      });
    } else {
      // Digital Twin Factory Module (BIM isometric grid)
      const gridSize = 3;
      const spacing = 55;
      const baseIdx = 0;

      // Ground plane grid
      for (let gx = -gridSize; gx <= gridSize; gx++) {
        for (let gz = -gridSize; gz <= gridSize; gz++) {
          const x = gx * spacing;
          const z = gz * spacing;
          // Random slight heights for building blocks
          const isBuilding = (Math.abs(gx) === 1 && Math.abs(gz) === 1) || (gx === 0 && gz === 2);
          const height = isBuilding ? 60 + Math.abs(gx * gz) * 15 : 0;

          points.push({ x, y: 40, z }); // Base
          const curr = points.length - 1;

          if (height > 0) {
            points.push({ x, y: 40 - height, z }); // Top
            const top = points.length - 1;
            edges.push({ p1: curr, p2: top });
          }
        }
      }

      // Connect ground lines
      const totalPoints = points.length;
      for (let i = 0; i < totalPoints - 4; i += 2) {
        if (i + 2 < totalPoints) edges.push({ p1: i, p2: i + 2 });
      }

      hotspots.push({
        id: "dt-node-1",
        pIndex: 4,
        title: "Conveyor Line A Telemetry",
        metric: "1,240 units/hr",
        status: "optimal",
        description: "Live MQTT broker streaming factory machine status.",
      });
      hotspots.push({
        id: "dt-node-2",
        pIndex: Math.min(18, points.length - 1),
        title: "HVAC Energy Optimizer",
        metric: "94.8% Efficiency",
        status: "nominal",
        description: "Automated spatial heating & air flow monitoring.",
      });
    }

    return { points, edges, hotspots };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const { points, edges, hotspots } = getModelGeometry(modelType);

    if (hotspots.length > 0 && !selectedHotspot) {
      setSelectedHotspot(hotspots[0]);
    }

    // Set canvas dimensions on resize, NOT on every frame
    const updateDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || 600;
      canvas.height = canvas.parentElement.clientHeight || 420;
    };
    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let isRunning = true;
    let isVisible = true;

    // Pause animation completely when out of viewport to save 100% CPU/GPU cycles
    const intersectionObserver = new IntersectionObserver((entries) => {
      const currentlyVisible = entries[0]?.isIntersecting ?? true;
      if (currentlyVisible && !isVisible && isRunning) {
        isVisible = true;
        animId = requestAnimationFrame(render);
      } else {
        isVisible = currentlyVisible;
      }
    }, { threshold: 0.05 });
    intersectionObserver.observe(canvas);

    const render = () => {
      if (!isVisible || !isRunning) {
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background HUD grid
      ctx.save();
      ctx.strokeStyle = "rgba(240, 24, 108, 0.06)";
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshairs
      ctx.strokeStyle = "rgba(240, 24, 108, 0.18)";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 90, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Auto rotation
      if (autoRotate && !isDraggingRef.current) {
        rotYRef.current += 0.008;
      }

      const rx = rotXRef.current;
      const ry = rotYRef.current;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Project 3D points to 2D screen
      const fov = 340;
      const distance = 420;
      const projected: { x: number; y: number; z: number; origIdx: number }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        let x1 = p.x * cosY + p.z * sinY;
        let y1 = p.y;
        let z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (distance + z2);
        const px = width / 2 + x2 * scale;
        const py = height / 2 + y2 * scale;

        projected.push({ x: px, y: py, z: z2, origIdx: i });
      }

      // Draw wireframe edges
      if (isWireframe) {
        ctx.lineWidth = 1.3;
        for (const edge of edges) {
          const p1 = projected[edge.p1];
          const p2 = projected[edge.p2];
          if (!p1 || !p2) continue;

          // Depth based opacity
          const avgZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.18, Math.min(0.9, (1 - avgZ / 250) * 0.8));

          ctx.strokeStyle = `rgba(240, 24, 108, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw vertex nodes
      for (const p of projected) {
        const alpha = Math.max(0.2, (1 - p.z / 250) * 0.9);
        ctx.fillStyle = `rgba(214, 19, 95, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isWireframe ? 1.8 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw interactive hotspots
      if (showHotspots) {
        hotspots.forEach((hs) => {
          const p = projected[hs.pIndex];
          if (!p) return;

          const isSelected = selectedHotspot?.id === hs.id;
          const pulse = Math.sin(Date.now() / 200) * 3;

          // Outer glowing ring
          ctx.strokeStyle = isSelected ? "#F0186C" : "rgba(240, 24, 108, 0.6)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (isSelected ? 10 : 7) + pulse, 0, Math.PI * 2);
          ctx.stroke();

          // Inner solid core
          ctx.fillStyle = isSelected ? "#F0186C" : "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, isSelected ? 4.5 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Text label
          ctx.fillStyle = isSelected ? "#F0186C" : "rgba(26, 10, 18, 0.75)";
          ctx.font = "600 10px Inter, monospace";
          ctx.fillText(hs.title, p.x + 12, p.y + 3);
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [modelType, isWireframe, showHotspots, autoRotate, selectedHotspot]);

  // Mouse drag handlers for 3D rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    rotYRef.current += dx * 0.008;
    rotXRef.current += dy * 0.008;
    rotXRef.current = Math.max(-1.2, Math.min(1.2, rotXRef.current));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePos.current.x;
    const dy = e.touches[0].clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    rotYRef.current += dx * 0.01;
    rotXRef.current += dy * 0.01;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    rotXRef.current = 0.3;
    rotYRef.current = 0.4;
  };

  const { hotspots } = getModelGeometry(modelType);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-surface/90 shadow-2xl backdrop-blur-md">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-surface-muted/60 px-4 py-3 sm:px-6">
        {/* Model Switcher Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-border/70 bg-surface p-1 shadow-inner">
          <button
            onClick={() => {
              setModelType("turbine");
              setSelectedHotspot(null);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              modelType === "turbine"
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">SafeAct</span> Turbine
          </button>
          <button
            onClick={() => {
              setModelType("headset");
              setSelectedHotspot(null);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              modelType === "headset"
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Spatial</span> Headset
          </button>
          <button
            onClick={() => {
              setModelType("digital-twin");
              setSelectedHotspot(null);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              modelType === "digital-twin"
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Box className="h-3.5 w-3.5" />
            <span>Digital Twin</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe"
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
              isWireframe
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Wireframe</span>
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Rotate"
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
              autoRotate
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{autoRotate ? "Auto" : "Paused"}</span>
          </button>
          <button
            onClick={resetView}
            title="Reset Angle"
            className="flex items-center rounded-lg border border-border bg-surface p-1.5 text-muted hover:border-primary/40 hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative h-80 w-full cursor-grab active:cursor-grabbing sm:h-96">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="h-full w-full touch-none"
        />

        {/* Live HUD Telemetry Corner Badge */}
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-primary/20 bg-surface/85 px-3 py-1.5 font-mono text-[11px] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-semibold text-foreground">Interactive 3D WebXR Studio</span>
          <span className="text-muted">| 60 FPS</span>
        </div>

        {/* Interactive Hint */}
        <div className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-lg border border-border/80 bg-surface/85 px-2.5 py-1 text-[10px] font-medium text-muted backdrop-blur-md sm:flex">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Click &amp; drag to rotate in 3D</span>
        </div>
      </div>

      {/* Hotspots Info Drawer */}
      <div className="border-t border-border/80 bg-surface-muted/40 p-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Telemetry Hotspots &amp; Sensor Nodes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {hotspots.map((hs) => (
              <button
                key={hs.id}
                onClick={() => setSelectedHotspot(hs)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                  selectedHotspot?.id === hs.id
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-border/70 bg-surface text-muted hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {hs.title}
              </button>
            ))}
          </div>
        </div>

        {selectedHotspot && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-surface p-3.5 shadow-sm sm:flex-nowrap">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{selectedHotspot.title}</p>
                <p className="text-[11px] text-muted">{selectedHotspot.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-lg bg-surface-muted px-3 py-1.5 font-mono text-xs font-bold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {selectedHotspot.metric}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
