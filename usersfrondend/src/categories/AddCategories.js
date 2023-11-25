import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import Header from '../components/Header'
import { toast } from 'react-toastify';

function AddCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({ name: ''});
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8000/api/categorieslist');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  async function addNewCategory(e){
    e.preventDefault();
    if (validateForm()) {
        let item = {name};
        let result = await fetch("http://localhost:8000/api/add-categories",{
          method:"POST",
          body:JSON.stringify(item),
          headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
          }
        });
       
        if (result.ok) {
            const response = await result.json();
            window.location.reload();
            toast.success("User Category added successfully");
           
        } else {
          const errorResponse = await result.json();
          if ( errorResponse.error) {
            toast.error(errorResponse.error);
          } else {
            toast.error("Operation failed");
           
          }
        }
      } 
}

function validateForm() {
  let valid = true;
  const updatedErrors = { name: '' };

  if (!name || !name.trim()) {
    updatedErrors.name = 'Name is required';
    valid = false;
  }
 setErrors(updatedErrors);
  return valid;
}

  return (
   <>
   <Header/>
   <div className="container my-5">
    <div className="row">
        <div className="col-md-8">
            <div id="response_message"></div>
            <div className="card" style={{boxShadow: 'none'}}>
                <div className="card-header">
                    <h5>
                        User Categories
                       
                    </h5>
                </div>
                <div className="card-body">
                    <table className="table table-sm table-striped table-bordered ">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                          </tr>
                        </thead>
                        <tbody id="tbody">
                       {
                        categories.length === 0 ?
                        (<tr><td colSpan={2} className='text-center'>No Record Found</td></tr>)
                        :(
                        categories.map((item,index)=>(
                        <tr key={item.id}>
                              <td>{index+1}</td>
                              <td>{item.name}</td>
                             
                              </tr>
                        ))
                        
                        
                        )
                       }
                        
                        </tbody>
                      </table>
                </div>
            </div>
            
        </div>
        <div class="col-md-4">
        <div class="card">
                <div class="card-header">
                    <h5>
                        Add New Categories
                        
                    </h5>
                </div>
                <div class="card-body">
                  <form onSubmit={addNewCategory} >
                  <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" name="name" id="name" placeholder="Enter Category Name"
                       className="form-control" style={{ width: '100%' }}
                       onChange={(e)=>{setName(e.target.value);}}   />
                           {errors.name && <div className="text-danger">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                  <button className="btn btn-primary"type="submit" style={{ width: '100%' }}>Add</button>
                  </div>
                  </form>
                  </div>
            </div>
        </div>
    </div>
</div>
 
   </>
  )
}

export default AddCategories