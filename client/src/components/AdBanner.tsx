import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface AdBannerProps {
  size: 'leaderboard' | 'rectangle' | 'skyscraper' | 'mobile-banner' | 'large-rectangle' | 'wide-skyscraper' | 'banner' | 'medium-rectangle';
  className?: string;
  label?: string;
  slotId?: string;
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

export function AdBanner({ size, className, label, slotId }: AdBannerProps) {
  const adId = `ad-${size}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    // Initialize Google AdSense when component mounts
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn('AdSense initialization failed:', error);
      }
    }
  }, []);

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-2 text-center ad-container", className)}>
      <div className="text-xs text-gray-400 mb-1">Advertisement</div>
      
      {/* Google AdSense Ad Unit */}
      <ins 
        className={cn(
          "adsbygoogle block border-2 border-dashed border-gray-300",
          adSizes[size]
        )}
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
        data-ad-slot={slotId || "1234567890"} // Replace with your ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-test="on" // Remove this in production
      >
        {/* Fallback content for development/testing */}
        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm font-medium">
          {label || `Ad Space - ${adDimensions[size]}`}
        </div>
      </ins>
    </div>
  );
}

// Declare AdSense global
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
