import { useMemo } from "react";

export default function useColumns(columnas:any) {
 const columns = useMemo(
   () => columnas,
   []
 );

 return  columns;
}