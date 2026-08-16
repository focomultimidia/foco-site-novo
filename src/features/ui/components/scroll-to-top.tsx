import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router's client-side navigation preserves scroll position by
// default — going to a new route keeps wherever the previous page had
// scrolled to, instead of opening at the top like a normal page load.
// Keyed on `pathname` (not the full location) so in-page anchor links
// (`href="#contato"`, hash-only changes) aren't affected — only an actual
// route change resets the scroll.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export { ScrollToTop };
