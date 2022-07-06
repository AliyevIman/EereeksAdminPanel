import React, { useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from "react-hook-form";
import EditCategory from "./EditCategory";

const MainCategories = ({categoryId}) => {
console.log(categoryId);

  const dispatch=useDispatch();
  const {categories}=useSelector(state=>state.categoryList);
  const {Categorysucces}= useSelector(state=>state.categoryAddReducer)
  const categoryDelete = useSelector(state=>state.categoryDeleted)
  const { error, category } = categoryDelete;

  useEffect(()=>{
    dispatch(listCategories())
  },[dispatch,category])
  useEffect(()=>{
    if(Categorysucces){
      dispatch(listCategories())
    }
  },[dispatch,Categorysucces])
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            {
              categoryId?(
                <EditCategory categoryId={categoryId} />
                
              ):<CreateCategory />
            }
            {/* Categories table */}  
            <CategoriesTable categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
