// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { RiDeleteBin5Fill } from 'react-icons/ri';
// import Swal from 'sweetalert2';

// function UserData() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch user data from the API
//     axios.get('https://netflixbackend-dcnc.onrender.com/users')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//  const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       allowOutsideClick: false,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`https://netflixbackend-dcnc.onrender.com/users/${id}`);
//           Swal.fire("Deleted!", "✅ Series has been successfully deleted!", "success");
//           setUsers(users.filter(user => user._id !== id));
//         } catch (error) {
//           console.error("Error deleting series:", error);
//           Swal.fire("Error!", "❌ Something went wrong. Please try again.", "error");
//         }
//       }
//     });
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//      <div><h3 className='fw-bold text-center'>User Data</h3></div>
//       <table className='table table-border table-hover table-responsive  table table-striped' >
//         <thead >
//           <tr >
//             <th className='text-info bg-dark fw-bold'>No.</th>
//             <th className='text-info bg-dark fw-bold'>ID</th>
//             <th className='text-info bg-dark fw-bold'>Email</th>
//             <th className='text-info bg-dark fw-bold'>Username</th>
//             <th className='text-info bg-dark fw-bold'>Subscription</th>
//             <th className='text-info bg-dark fw-bold'>Join Date</th>
//             <th className='text-info bg-dark fw-bold'>status</th>
//             <th className='text-info bg-dark fw-bold'>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user, index) => (
//                 <tr key={user._id || index} id='tdlist'>
//                   <td>{index+1}</td>
//                 <td>{user._id}</td>
//                 <td>{user.email}</td>
//                 <td>{user.name}</td>
//             <td>{user.subscription}</td>
//                 <td>{new Date(user.createdAt).toLocaleString()}</td>
//                 <td>Active</td>
//                 <td className='text-danger text-center fs-6' onClick={() => handleDelete(user._id)} style={{ cursor: "pointer" }}><RiDeleteBin5Fill/></td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" style={{ textAlign: 'center' }}>No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UserData;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

function UserData() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://netflixbackend-dcnc.onrender.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <img src="https://media.tenor.com/1s1_eaP6BvgAAAAC/rainbow-spinner-loading.gif" alt="" className='img-fluid bg-white' width={150} />
      </div>
    );
  }

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
          Swal.fire("Deleted!", "✅ User has been successfully deleted!", "success");
          setUsers(users.filter(user => user._id !== id));
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "❌ Something went wrong. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div className="container p-4">
      <h3 className='fw-bold text-center'>User Data</h3>

      <div className='table-responsive mt-3'>
        <table className='table table-bordered table-hover table-striped'>
          <thead className='table-dark' >
            <tr>
              <th className='text-info fw-bold'>No.</th>
              <th className='text-info fw-bold'>ID</th>
              <th className='text-info fw-bold'>Email</th>
              <th className='text-info fw-bold'>Username</th>
              <th className='text-info fw-bold'>Subscription</th>
              <th className='text-info fw-bold'>Join Date</th>
              <th className='text-info fw-bold'>Status</th>
              <th className='text-info fw-bold'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id || index} id='tdlist'>
                  <td>{index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.subscription}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>Active</td>
                  <td className='text-danger text-center fs-6' onClick={() => handleDelete(user._id)} style={{ cursor: "pointer" }}>
                    <RiDeleteBin5Fill />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserData;