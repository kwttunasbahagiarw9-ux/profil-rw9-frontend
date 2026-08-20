import { useEffect, useState } from "react";
import { apiUrl } from "../api";

export function useData(endpoint, fallbackKey) {
  const [data, setData] = useState(() => {
    const key = fallbackKey || endpoint.replace("/", "");
    return key === "site" ? {} : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(apiUrl(`/api/${endpoint}`))
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data");
        return res.json();
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
