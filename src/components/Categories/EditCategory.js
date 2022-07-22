import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { categoryAdd, categoryEditAction, categoryUpdateAction, listCategories } from "../../Redux/Actions/CategoryActions";
import { CATEGORY_UPDATE_RESET } from "../../Redux/Constants/CategoryConstants";

const EditCategory = ({categoryId}) => {
  const dispatch=useDispatch();
   const {category:categoryupdate} =useSelector(state=>state.categoryUpdate);
  const history= useHistory();
  const [parentId, setParentId] = useState(null)
  const [isFeatured, setIsFeatured] = useState(false)
  const [name, setName] = useState("")
  const {category} = useSelector(state=>state.categoryEdit)
  console.log(category);
  useEffect(()=>{
    dispatch(categoryEditAction(categoryId))

    if(category.parentId || category.categoryId!== categoryId){
    setParentId(category.parentId)
    setName(category.name)
    setIsFeatured(category.isFeatured)
    }
  },[dispatch,categoryId,category.parentId,category.name,category.isFeatured,category.categoryId])
   
  const {categories}=useSelector(state=>state.categoryList);


  const categorySubmitHandler=(e)=>{
    e.preeventDefault();
    dispatch(categoryAdd(data))
    const data={
      id:categoryId,name,parentId,isFeatured
    }
    dispatch(categoryUpdateAction(data));
    history.push("/category")
     }
  

  return (
    <div className="col-md-12 col-lg-4">
      <h1>Edit Category</h1>
      {category&&(
   <form onSubmit={categorySubmitHandler}>
   <div className="mb-4">
     <label htmlFor="product_name" className="form-label">
       Name
     </label>
     <input
      name="name"
      defaultValue={category.name}
      onChange={e=>setName(e.target.value)}
       type="text"
       placeholder="Type here"
       className="form-control py-3"
       id="product_name"
     />
   </div>
   <div className="mb-4">
     <label className="form-label">Parent Category</label>
     <select
     name="parentCategoryId"
     defaultValue={category.parentCategoryId}
   
     className="form-control" 
     onChange={e=>setParentId(Number(e.target.value))}
     >
       <option value={0}>None</option>
       {categories?.map(cate=>(
         <option
           key={cate.categoryId}
           >
             {cate.name}
         </option>
       ))}
     </select>
   </div>
  
    <div className="mb-4">
    <label htmlFor="isFeatured" className="form-label">Is Featured</label>
     <input
     name="isFeatured"
     checked={category.isFeatured?true:false}
     type="checkbox" id="isFeatured"   />
   </div>
   {errors.exampleRequired && <span>This field is required</span>}

    <div className="d-grid">
      <button className="btn btn-primary py-3">Create category</button>
    </div>
   </form>

      )
      }
   
    </div>
  );
};


export default EditCategory;
