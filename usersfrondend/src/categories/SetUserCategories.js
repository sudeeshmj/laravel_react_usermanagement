
import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import Header from '../components/Header'
import { toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';


function SetUserCategories() {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedUserCat, setSelectedUserCat] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/userlist'); 
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setUsers(data.user); 
    } catch (error) {
      console.error('There was a problem fetching users:', error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categorieslist'); 
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      
      const mappedCategories = data.categories.map((category) => {
        return {
          key: category.name, 
          label: category.id,
          
        };
      });
      setCategories(mappedCategories); 
    } catch (error) {
      console.error('There was a problem fetching users:', error);
    }
  };
  fetchCategories(); 
  fetchUsers(); 
 
}, []);

function categorySubmit(userId){

    fetch('http://localhost:8000/api/save-user-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, categories: selectedUserCat }),
      })
        .then(response => response.json())
        .then(data => {
            toast.success(data.message);
        })
        .catch(error => {
            toast.error("Operation failed");
        });

}
  
function handleSelectChange(ids){
   
    setSelectedUserCat(ids);
}

  return (
    <><Header/>
    <div className="container my-5">
    <div className="row">
        <div className="col-md-12">
            <div id="response_message"></div>
            <div className="card">
                <div className="card-header">
                    <h5>
                        User Details
                       
                    </h5>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => { e.preventDefault(); }}>
                    <table className="table table-sm table-striped table-bordered ">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody id="tbody">
                        {
                        users.length === 0 ?
                        (<tr><td colSpan={5} className='text-center'>No Record Found</td></tr>)
                        :(
                            users.map((item,index)=>(
                        <tr key={item.id}>
                              <td className="align-middle">{index+1}</td>
                              <td  className="align-middle">{item.name}</td>
                              <td  className="align-middle">{item.email}</td>
                                <td  className="align-middle"> {item.image === null ? ("") : (
                                    <img
                                    src={`http://localhost:8000/img/${item.image}`}
                                    alt="user"
                                    style={{ width: '50px' , height: '50px' }}
                                    />)}
                             </td>
                             <td  className="align-middle" width={400}>  
                             { categories.length > 0 ?
                                 ( <>
                                    <Multiselect
                                        displayValue="key"
                                        onKeyPressFn={function noRefCheck(){}}
                                        onRemove={function noRefCheck(){}}
                                        onSearch={function noRefCheck(){}}
                                        options={categories}
                                        onSelect={(selectedList) => handleSelectChange(selectedList)}
         
                                        showCheckbox
                                    /> 
                                    <button  onClick={() => categorySubmit(item.id)} className='btn btn-sm btn-primary'>Update</button></>
                                    ):''}
                              </td>
                              </tr>
                        ))
                        
                        
                        )
                       }
                       
                        </tbody>
                      </table>
                      </form>
                </div>
            </div>
        </div>
    </div>
</div>
     
    
    </>
  )
}

export default SetUserCategories