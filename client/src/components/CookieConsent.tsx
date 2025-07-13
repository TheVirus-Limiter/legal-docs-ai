import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookies-accepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookies-accepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="bg-neutral-900 text-white border-neutral-700 shadow-2xl">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <Cookie className="text-blue-400 w-6 h-6 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-neutral-300 text-sm mb-4">
                This website uses cookies to enhance your experience, provide analytics, and display personalized advertisements. 
                By continuing to use our site, you consent to our use of cookies as described in our{" "}
                <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={acceptCookies}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Accept All Cookies
                </Button>
                <Button 
                  onClick={declineCookies}
                  variant="outline"
                  className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
                >
                  Essential Only
                </Button>
                <a 
                  href="/privacy" 
                  className="text-blue-400 hover:underline text-sm self-center"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}