import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useLocation } from 'react-router-dom';

export default function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    supabase.from('page_views').insert({
      pathname: location.pathname,
      referrer: document.referrer || null
    });
  }, [location.pathname]);
}
