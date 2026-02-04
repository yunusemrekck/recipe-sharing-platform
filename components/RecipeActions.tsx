"use client";

import { Share2, Printer } from "lucide-react";

export function RecipeActions() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopyalandı!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <button 
        onClick={handleShare}
        className="p-3 text-charcoal-700/60 hover:text-charcoal-700 hover:bg-cream-50 rounded-lg transition-colors"
        title="Paylaş"
      >
        <Share2 className="w-5 h-5" />
      </button>
      <button 
        onClick={handlePrint}
        className="p-3 text-charcoal-700/60 hover:text-charcoal-700 hover:bg-cream-50 rounded-lg transition-colors"
        title="Yazdır"
      >
        <Printer className="w-5 h-5" />
      </button>
    </>
  );
}
