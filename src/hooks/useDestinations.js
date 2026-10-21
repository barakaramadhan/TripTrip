import { useEffect, useState } from "react";
import { fetchDestinations } from "../services/tripService";

export function useDestinations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetchDestinations().then((d) => alive && (setItems(d), setLoading(false)));
    return () => {
      alive = false;
    };
  }, []);
  return { destinations: items, loading };
}
