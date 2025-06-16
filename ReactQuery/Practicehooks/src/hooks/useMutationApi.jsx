import {useMutation, useQueryClient} from '@tanstack/react-query'

const queryApi = async(params, action)=>{
  const query = await fetch("http://localhost/storemagic/controllers/user.api.php",{
    method:action,
    body:JSON.stringify(params)
  });
  if(!query.ok) throw new Error("Hubo un error en la respuesta");

  // const data = await query.text();
  // console.log(data);
  return query.json();
}


const queryAlternative = async (data)=>{
  const params = new URLSearchParams();
  params.append("idusuario", data);
  const query = await fetch(`http://localhost/storemagic/controllers/user.api.php?${params}`);
  if(!query.ok) throw new Error("Hubo un error en la respuesta");
  const resp = await query.json();
  console.log(resp);
  
  return resp;
}
export default function useMutationApi(action, typeQuery=1) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn:(params)=>queryApi(params, action),
    onSuccess:()=>{
      queryClient.invalidateQueries(["userQuery"])
    }
  });

  const secondMutation = useMutation({
    mutationFn:(params)=>queryAlternative(params)
  });

  const properties = typeQuery===1?mutation:secondMutation;
  return (properties);
}
