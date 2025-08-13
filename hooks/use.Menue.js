// import { useEffect, useState, useCallback } from 'react';
// import { api } from '../services/api';

// export default function useMenu() {
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const load = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const m = await api.getMenu();
//       setMenu(m);
//     } catch (e) {
//       setError(e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { load(); }, [load]);

//   return { menu, loading, error, reload: load };
// }



import { useEffect, useState, useCallback } from "react";
import { getMenu } from "../api";

export default function useMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMenu();
      setMenu(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { menu, loading, error, reload: load };
}
