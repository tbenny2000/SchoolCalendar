import React, {useState} from 'react'
import './Registration.css'
const Form = () => {
    const [user, setUser] = useState(
        {
            Id: '', FirstName: '', LastName: '', Email: '', Password: ''
        }
    )
    let name, value
    console.log(user)
    const data = (e) =>
    {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value});
    }
    const getdata = (e) =>
    {
        const {Id, FirstName, LastName, Email, Password} = user;
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                Id, FirstName, LastName, Email, Password
            })
        }
        const res = fetch(
            'https://ggcbeartrack-default-rtdb.firebaseio.com/UserData.json',
            options
            )
            if(res)
            {
                alert("Register Successfully")
            }
            else
            {
                alert("Error Occurred")
            }
    }
  return (
    <>
    <div className='form'>
      <div className='container'>
        <form method ='POST'>
          <input type='number' name='Id' placeholder='Your Id' value={user.Id} autoComplete='off' required onChange={data}></input>
          <input type='text' name='First Name' placeholder='Your First Name' value={user.FirstName} autoComplete='off' required onChange={data}></input>
          <input type='text' name='Last Name' placeholder='Your Last Name' value={user.LastName} autoComplete='off' required onChange={data}></input>
          <input type='email' name='Email' placeholder='Email' value={user.Email} autoComplete='off' required onChange={data}></input>
          <input type='Password' name='Password' placeholder='Password' value={user.Password} autoComplete='off' required onChange={data}></input>
          <button onClick={getdata}>Submit</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Form
