import { useQueries } from '@tanstack/react-query'
import { apiList } from '../hooks/useApi';

/**
 * Obtiene datos externos en paralelo
 * @param {*} param0 {firstUrl:primer url, secondUrl:segundo url, firstQueryKey:primer queryKey,
 * secondQueryKey:segundo queryKey}
 * @returns Objeto con propiedades de ambas consultas
 */
export default function GetElements({firstUrl, secondUrl, firstQueryKey, secondQueryKey}) {
  const results = useQueries({
    queries:[
      {queryKey:[firstQueryKey], queryFn:()=>apiList(firstUrl)},
      {queryKey:[secondQueryKey], queryFn:()=>apiList(secondUrl)}
    ],
  });

  const firstResult = results[0];
  const secondResult = results[1];

  const firstProps = {data:firstResult.data, isFetching:firstResult.isFetching, isError:firstResult.isError,
    error:firstResult.error, isSuccess:firstResult.isSuccess};
  
  const secondProps = {data:secondResult.data, isFetching:secondResult.isFetching, isError:secondResult.isError,
    error:secondResult.error, isSuccess:secondResult.isSuccess};
  return ({firstQuery:firstProps, secondQuery:secondProps});
}
