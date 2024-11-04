
import Swal from 'sweetalert2';
import './App.css'
import { Link } from 'react-router-dom';

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const status = form.status.value;
    const gender = form.gender.value;
    // console.log(gender, status, name, email);
    const user = { name, email, status, gender }
    console.log(user);

    fetch('https://user-management-system-server-ashy.vercel.app/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.insertedId) {
          Swal.fire({
            title: "User Added Successfully!",
            text: "Success!",
            icon: "success"
          });
          e.target.reset();
        }
      })
  }

  return (
    <>
      <div className='md:p-10 p-4'>
        <Link to="/users"><button className='btn mb-5'>All Users</button></Link>
        <h2 className='text-center text-4xl mb-4'>New User</h2>
        <p className='text-center'>Use the below form to create a new account</p>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="name" name='name' placeholder="Name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
          </div>
          {/* radio 1 */}
          <div className='flex items-center gap-6 mt-2'>
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <label className="flex">
              <input
                type="radio"
                name="gender"
                value="Male"
                className="radio radio-primary mr-2"
              />
              <p>Male</p>
            </label>
            <label className='flex'>
              <input
                type="radio"
                name="gender"
                value="Female"
                className="radio radio-primary mr-2"
              />
              <p>Female</p>
            </label>
          </div>
          {/* radio end */}
          {/* radio 2 */}
          <div className='flex items-center gap-6'>
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <label className="flex">
              <input
                type="radio"
                name="status"
                value="Active"
                className="radio radio-primary mr-2"
              />
              <p>Active</p>
            </label>
            <label className='flex'>
              <input
                type="radio"
                name="status"
                value="Inactive"
                className="radio radio-primary mr-2"
              />
              <p>Inactive</p>
            </label>
          </div>
          {/* radio end */}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
