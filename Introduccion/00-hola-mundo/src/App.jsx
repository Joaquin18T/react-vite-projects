import { useState } from 'react';
import './App.css'
import { TwitterCard } from './TwittweCard'

const users=[
  {
    userName:'midudev',
    name:'Miguel Angel',
    isFollowing:true,
  },
  {
    userName:'nekito',
    name:'Joaquin Torres',
    isFollowing:true,
  },  
  {
    userName:'pheralb',
    name:'Pablo h.',
    isFollowing:false,
  },
  {
    userName:'tomas',
    name:'tomas c.',
    isFollowing:false,
  },
];

export function App(){
  const formatUsername = (userName)=>`@${userName}`;
  //const [name,setName] = useState('midudev');
  const ChangeName=()=>{
    setIsFollow(!isFollow)
  };
  //initialIsFollow: cuando un prop comieza por initial
  //es que es un prop que va a inicializar un state 

  const [isFollow,setIsFollow]=useState(false);

  return(
    <div className='App'>
      {
        users.map(({userName, name, isFollowing})=>(
          //const {userName, name, isFollowing} = user;
            <TwitterCard
            userName={userName}
            initialIsFollow={isFollowing}
            format={formatUsername}
            key={userName}>
            {name}
            </TwitterCard>
        ))
      }

    </div>
  )
}