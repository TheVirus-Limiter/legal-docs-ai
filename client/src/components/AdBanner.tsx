import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface AdBannerProps {
  size: 'leaderboard' | 'rectangle' | 'skyscraper' | 'mobile-banner' | 'large-rectangle' | 'wide-skyscraper' | 'banner' | 'medium-rectangle';
  className?: string;
  placeholderId?: string;
}

const adSizes = {
  leaderboard: 'w-full h-24 max-w-[728px]', // 728x90
  rectangle: 'w-full h-64 max-w-[336px]', // 336x280
  'large-rectangle': 'w-full h-72 max-w-[336px]', // 336x280 (larger)
  skyscraper: 'w-40 h-[600px]', // 160x600
  'wide-skyscraper': 'w-48 h-[600px]', // 200x600
  'mobile-banner': 'w-full h-16 max-w-[320px]', // 320x50
  banner: 'w-full h-20 max-w-[468px]', // 468x60
  'medium-rectangle': 'w-full h-60 max-w-[300px]' // 300x250
};

const adDimensions = {
  leaderboard: '728x90',
  rectangle: '336x280',
  'large-rectangle': '336x280',
  skyscraper: '160x600',
  'wide-skyscraper': '200x600',
  'mobile-banner': '320x50',
  banner: '468x60',
  'medium-rectangle': '300x250'
};

export function AdBanner({ size, className, placeholderId }: AdBannerProps) {
  const adId = placeholderId || `ezoic-pub-ad-placeholder-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    // Initialize Ezoic ads when component mounts
    if (typeof window !== 'undefined' && window.ezstandalone) {
      try {
        window.ezstandalone.cmd = window.ezstandalone.cmd || [];
        window.ezstandalone.cmd.push(function() {
          window.ezstandalone.define(adId);
        });
      } catch (error) {
        console.warn('Ezoic ad initialization failed:', error);
      }
    }
  }, [adId]);

  return (
    <div className={cn("ad-container", className)}>
      {/* Ezoic Ad Placeholder */}
      <div 
        id={adId}
        className={cn("ezoic-ad", adSizes[size])}
        style={{ 
          minHeight: size === 'leaderboard' ? '90px' : 
                    size === 'rectangle' || size === 'medium-rectangle' ? '250px' : 
                    size === 'mobile-banner' ? '50px' : '280px',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
  );
}

// Declare Ezoic global
declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>;
      define: (id: string) => void;
    };
  }
}
