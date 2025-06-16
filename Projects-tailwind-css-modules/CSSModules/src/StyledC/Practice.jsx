import styled from 'styled-components';

const Button = styled.button`
  background-color:#c3f3c0;
  border:2px solid #7ee081;
  border-radius:5px;
  padding:5px;
  color:#222;
  font-size:16px;
  cursor:pointer;

  &:hover{
    border:2px solid #588157;
    background-color:#62a87c;
    color:#fff;
  }
  &:disabled{
    cursor:not-allowed;
  }
`;

const Card = styled.div`
  border: 2px solid #ef233c;
  border-radius:5px;
  width:160px;
  height:150px;
  margin:10px;
  box-shadow: 10px 10px 5px 0px rgba(199,193,199,1);
  transition:box-shadow 0.5s;
  &:hover{
    box-shadow: 5px 5px 5px 0px #fff;
    transition:box-shadow 0.5s;
  }
`;

const Input = styled.input`
  border: 1px solid gray;
  padding:3px;
  padding-inline-start:3px;
  padding-inline-end:3px;
  border-radius:3px;
`;

const Label = styled.label`
  ${Input}:focus+&&{
    color:#669bbc;
    font-size:16px;
  }
`;

const Item = styled.li`
  font-size:15px;
  text-decoration:${props=>props.$state?'line-through':'none'};
  &:hover{
    color:${(props)=>props.$state?'#a7c957':'#a41623'}
  }
`;

const Nav = styled.nav`
  display:flex;
  justify-content:space-around;
  background-color:#4a5759;
  padding:3px;
`;
const Link = styled.a`
  text-decoration: none;
  font-size:16px;
  color:#e0e1dd;
  &.active{
    color:#9b2226;
  }
  &:hover{
    color:#ffbf69;
  }
`;

const Basic = ({className})=><div className={className}>Algun texto escrito</div>
const Fancy = styled(Basic)`
  color:pink;
`;
export default function Practice() {
  const items = [{task:"clean the room", state:false},{task:"Do Homework", state:true},{task:"Eat foods", state:false}];
  return (
    <div>
      <Button disabled>Styled Button</Button>
      <Card/>
      <Input/>
      <Label>Styled Label</Label>
      <ul>
        {
          items.map(({task,state})=>(
            <Item key={task} $state={state}>{task} - {state?'✅':'❌'}</Item>
          ))
        }
      </ul>
      <Nav>
        <Link href='#'>Home</Link>
        <Link href='#'>Productos</Link>
        <Link href='#'>Car shop</Link>
      </Nav>
      <Fancy/>
    </div>
  )
}
