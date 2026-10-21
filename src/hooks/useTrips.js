import { useCallback, useEffect, useState } from "react";
import { fetchTrips, deleteTrip, computeStats } from "../services/tripService";

export function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      setError("");
      setTrips(await fetchTrips());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const remove = async (id) => {
    await deleteTrip(id);
    setTrips((list) => list.filter((t) => t.id !== id));
  };

  return { trips, loading, error, reload, remove, stats: computeStats(trips) };
}
