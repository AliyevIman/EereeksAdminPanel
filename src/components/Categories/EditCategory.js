import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { categoryAdd, categoryEditAction } from "../../Redux/Actions/CategoryActions";

const EditCategory = ({categoryId}) => {
  const dispatch=useDispatch();
  const [isFeatured, setIsFeatured] = useState(false)
  const {category} = useSelector(state=>state.categoryEdit)
  console.log(category);
  useEffect(()=>{
    dispatch(categoryEditAction(categoryId))
  },[dispatch,categoryId])
   
  const {categories}=useSelector(state=>state.categoryList);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const categorySubmitHandler=(data)=>{
    dispatch(categoryAdd(data))
  }

  return (
    <div className="col-md-12 col-lg-4">
      <h1>Edit Category</h1>
      {category&&(
   <form onSubmit={handleSubmit(categorySubmitHandler)}>
   <div className="mb-4">
     <label htmlFor="product_name" className="form-label">
       Name
     </label>
     <input
      {...register("name",{required:true})}
      name="name"
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
     {...register("parentCategoryId",{required:true})}
     defaultValue={category.parentCategoryId}

     className="form-control" 
     // onChange={e=>setParentId(Number(e.target.value))}
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
     {...register("isFeatured")}
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
