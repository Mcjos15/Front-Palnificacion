//Esta funcion permite juntar varios nombres de clases para tener los nombnres de las clases guardadas dentro de los elementos.
export function classNames(...args:any[]):string{
    return args.filter(Boolean).join(" ");
}