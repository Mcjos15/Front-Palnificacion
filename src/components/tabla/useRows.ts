import { useMemo } from "react";

export default function useRows(rowsData:any) {
 const rows = useMemo(
   () => rowsData,
   []
 );

 return rows;
}
