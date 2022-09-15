
interface UserResults {
  name:string ;
  email:string;
  password:string;
}
export const userLogin = async (loginInfo:{})=>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginInfo)
};
  const response = await fetch('http://localhost:3000/login',requestOptions)
  const data: UserResults = await response.json()
  return data
}
