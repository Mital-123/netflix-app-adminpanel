import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

function UserData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios.get('https://netflixbackend-dcnc.onrender.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

 const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://netflixbackend-dcnc.onrender.com/users/${id}`);
          Swal.fire("Deleted!", "✅ Series has been successfully deleted!", "success");
          setUsers(users.filter(user => user._id !== id));
        } catch (error) {
          console.error("Error deleting series:", error);
          Swal.fire("Error!", "❌ Something went wrong. Please try again.", "error");
        }
      }
    });
  };
  
  return (
    <div style={{ padding: '20px' }}>
     <div><h3 className='fw-bold text-center'>User Data</h3></div>
      <table className='table table-border table-hover table-responsive table-striped' border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead >
          <tr >
            <th className='text-info bg-dark fw-bold'>No.</th>
            <th className='text-info bg-dark fw-bold'>ID</th>
            <th className='text-info bg-dark fw-bold'>Email</th>
            <th className='text-info bg-dark fw-bold'>Username</th>
            <th className='text-info bg-dark fw-bold'>Subscription</th>
            <th className='text-info bg-dark fw-bold'>Join Date</th>
            <th className='text-info bg-dark fw-bold'>status</th>
            <th className='text-info bg-dark fw-bold'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
                <tr key={user._id || index} id='tdlist'>
                  <td>{index+1}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
            <td>{user.subscription}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>Active</td>
                <td className='text-danger text-center fs-6' onClick={() => handleDelete(user._id)} style={{ cursor: "pointer" }}><RiDeleteBin5Fill/></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserData;
