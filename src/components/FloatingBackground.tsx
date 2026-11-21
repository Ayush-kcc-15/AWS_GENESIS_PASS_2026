import React from 'react';
import '../styles/FloatingBackground.css';

// SVG 1: Filled Microchip with center cutout & circuit core
const FilledMicrochip: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = '#40B4F5',
}) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_8px_rgba(64,180,245,0.25)]"
  >
    <path
      d="M 30,10 L 40,10 L 40,20 L 45,20 L 45,10 L 55,10 L 55,20 L 60,20 L 60,10 L 70,10 L 70,30 L 80,30 L 80,40 L 90,40 L 90,45 L 80,45 L 80,55 L 90,55 L 90,60 L 80,60 L 80,70 L 70,70 L 70,80 L 60,80 L 60,90 L 55,90 L 55,80 L 45,80 L 45,90 L 40,90 L 40,80 L 30,80 L 30,70 L 20,70 L 20,60 L 10,60 L 10,55 L 20,55 L 20,45 L 10,45 L 10,40 L 20,40 L 20,30 L 30,30 Z"
      fill={color}
    />
    <rect x="36" y="36" width="28" height="28" fill="#161C25" />
    <rect x="46" y="46" width="8" height="8" fill={color} opacity="0.65" />
  </svg>
);

// SVG 2: Thin Outlined Microchip for ethereal geometric depth
const OutlinedMicrochip: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({ size = 64, color = '#40B4F5', strokeWidth = 2 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 30,10 L 40,10 L 40,20 L 45,20 L 45,10 L 55,10 L 55,20 L 60,20 L 60,10 L 70,10 L 70,30 L 80,30 L 80,40 L 90,40 L 90,45 L 80,45 L 80,55 L 90,55 L 90,60 L 80,60 L 80,70 L 70,70 L 70,80 L 60,80 L 60,90 L 55,90 L 55,80 L 45,80 L 45,90 L 40,90 L 40,80 L 30,80 L 30,70 L 20,70 L 20,60 L 10,60 L 10,55 L 20,55 L 20,45 L 10,45 L 10,40 L 20,40 L 20,30 L 30,30 Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      fill="transparent"
    />
    <rect
      x="36"
      y="36"
      width="28"
      height="28"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="transparent"
    />
  </svg>
);

// SVG 3: Small Circuit Crosshair Node & Square Accent
const CircuitSquareNode: React.FC<{ size?: number; color?: string }> = ({
  size = 14,
  color = '#40B4F5',
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="6"
      y="6"
      width="12"
      height="12"
      stroke={color}
      strokeWidth="1.5"
      fill="transparent"
    />
    <rect x="9" y="9" width="6" height="6" fill={color} opacity="0.8" />
    <line x1="12" y1="1" x2="12" y2="5" stroke={color} strokeWidth="1.2" opacity="0.6" />
    <line x1="12" y1="19" x2="12" y2="23" stroke={color} strokeWidth="1.2" opacity="0.6" />
    <line x1="1" y1="12" x2="5" y2="12" stroke={color} strokeWidth="1.2" opacity="0.6" />
    <line x1="19" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1.2" opacity="0.6" />
  </svg>
);

interface FloatingItemConfig {
  id: string;
  type: 'filled' | 'outlined' | 'node';
  size: number;
  color: string;
  strokeWidth?: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  animClass: string;
  animDuration: string;
  baseOpacity: number;
  responsiveClass?: string;
}

const floatingItems: FloatingItemConfig[] = [
  // --- LAYER 2: Medium Floating Microchip Icons (Peripheral distribution) ---
  {
    id: 'chip-left-top',
    type: 'filled',
    size: 42,
    color: '#40B4F5',
    position: { left: '3%', top: '14%' },
    animClass: 'anim-float-1',
    animDuration: '16s',
    baseOpacity: 0.12,
  },
  {
    id: 'chip-right-top',
    type: 'outlined',
    size: 52,
    color: '#55C5FF',
    strokeWidth: 1.8,
    position: { right: '4%', top: '18%' },
    animClass: 'anim-float-2',
    animDuration: '20s',
    baseOpacity: 0.11,
  },
  {
    id: 'chip-right-mid',
    type: 'filled',
    size: 38,
    color: '#40B4F5',
    position: { right: '3.5%', top: '52%' },
    animClass: 'anim-float-4',
    animDuration: '17s',
    baseOpacity: 0.13,
  },
  {
    id: 'chip-left-bottom',
    type: 'filled',
    size: 32,
    color: '#40B4F5',
    position: { left: '4%', top: '76%' },
    animClass: 'anim-float-2',
    animDuration: '19s',
    baseOpacity: 0.12,
  },

  // --- LAYER 3: Larger Subtle Chip Outlines (Atmospheric depth) ---
  {
    id: 'chip-left-mid-large',
    type: 'outlined',
    size: 78,
    color: '#515963',
    strokeWidth: 1.5,
    position: { left: '5%', top: '44%' },
    animClass: 'anim-float-3',
    animDuration: '24s',
    baseOpacity: 0.08,
  },
  {
    id: 'chip-right-bottom-large',
    type: 'outlined',
    size: 86,
    color: '#40B4F5',
    strokeWidth: 1.5,
    position: { right: '5%', top: '80%' },
    animClass: 'anim-float-1',
    animDuration: '22s',
    baseOpacity: 0.07,
  },

  // --- LAYER 1: Small Geometric Nodes & Circuit Squares (Decorative accents) ---
  {
    id: 'node-left-sub-1',
    type: 'node',
    size: 16,
    color: '#40B4F5',
    position: { left: '11%', top: '26%' },
    animClass: 'anim-float-4',
    animDuration: '14s',
    baseOpacity: 0.15,
    responsiveClass: 'hidden sm:block',
  },
  {
    id: 'node-right-sub-1',
    type: 'node',
    size: 14,
    color: '#55C5FF',
    position: { right: '10%', top: '36%' },
    animClass: 'anim-float-1',
    animDuration: '18s',
    baseOpacity: 0.14,
    responsiveClass: 'hidden sm:block',
  },
  {
    id: 'node-left-sub-2',
    type: 'node',
    size: 12,
    color: '#40B4F5',
    position: { left: '8%', top: '64%' },
    animClass: 'anim-float-2',
    animDuration: '15s',
    baseOpacity: 0.16,
    responsiveClass: 'hidden sm:block',
  },
  {
    id: 'node-right-sub-2',
    type: 'node',
    size: 18,
    color: '#515963',
    position: { right: '11%', top: '68%' },
    animClass: 'anim-float-3',
    animDuration: '21s',
    baseOpacity: 0.12,
    responsiveClass: 'hidden sm:block',
  },
  {
    id: 'chip-top-accent',
    type: 'outlined',
    size: 36,
    color: '#40B4F5',
    strokeWidth: 1.5,
    position: { left: '26%', top: '6%' },
    animClass: 'anim-float-3',
    animDuration: '20s',
    baseOpacity: 0.06,
    responsiveClass: 'hidden lg:block',
  },
  {
    id: 'chip-bottom-accent',
    type: 'filled',
    size: 28,
    color: '#55C5FF',
    position: { right: '24%', top: '92%' },
    animClass: 'anim-float-4',
    animDuration: '18s',
    baseOpacity: 0.08,
    responsiveClass: 'hidden lg:block',
  },
];

export const FloatingBackground: React.FC = () => {
  return (
    <div
      className="floating-bg-container"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className={`floating-chip-item ${item.animClass} ${item.responsiveClass || ''}`}
          style={
            {
              ...item.position,
              '--anim-duration': item.animDuration,
              '--base-opacity': item.baseOpacity,
              opacity: item.baseOpacity,
            } as React.CSSProperties
          }
        >
          {item.type === 'filled' && (
            <FilledMicrochip size={item.size} color={item.color} />
          )}
          {item.type === 'outlined' && (
            <OutlinedMicrochip
              size={item.size}
              color={item.color}
              strokeWidth={item.strokeWidth}
            />
          )}
          {item.type === 'node' && (
            <CircuitSquareNode size={item.size} color={item.color} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingBackground;
