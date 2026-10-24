import React, { useCallback, useEffect, useState } from "react";
import { fetchPhone } from "../api/phoneApi";
import { ErrorBox } from "../components/ErrorBox";
import { Loading } from "../components/Loading";
import { Phone } from "../types";
import { SelectPhoneApp } from "./SelectPhoneApp";


export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);                      
    setPhone(null);
    try {                                 
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi không xác định");
    }
  }, []);

  useEffect(() => { load(); }, [load]);   

  if (error) return <ErrorBox message={error} onRetry={load} />;  
  if (!phone) return <Loading />;                                 
  return <SelectPhoneApp phone={phone} />;                        
}
