import React, { useEffect, useState, useRef } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  /*Importing React Hooks: 
                --> useState Hook <-- */
  const [error, setError] = useState(false);
  const [localStorage, setlocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  /*      -> useRef Hook <--  */
  const commentElem = useRef();
  const nameElem = useRef();
  const emailElem = useRef();
  const storeDataElem = useRef();

  useEffect(() => {
      nameElem.current.value = window.localStorage.getItem('name')
      emailElem.current.value = window.localStorage.getItem('email')
  }, [])

  /*         -->Functions<--     */
  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentElem.current;
    const { value: name } = nameElem.current;
    const { value: email } = emailElem.current;
    const { checked: storeData } = storeDataElem.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };
    if(storeData){
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('email', email);
    }else{
        window.localStorage.removeItem('name', name);
        window.localStorage.removeItem('email', email);

    }
    submitComment(commentObj)
            .then((res)=>{
                setShowSuccessMessage(true);
                setTimeout(()=>{
                    setShowSuccessMessage(false)
                },3000)
            })
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b-4 pb-4 text-center">
        <span className="text-pink-500 text-2xl">L</span>eave 
        <span className="text-pink-500 text-2xl"> A</span>
        <span className="text-pink-500 text-2xl"> R</span>eply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentElem}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100 "
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameElem}
          placeholder="Name"
          name="name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100"
        />
        <input
          type="text"
          ref={emailElem}
          placeholder="Email"
          name="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-pink-500 bg-pink-100"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="container px-2">
                <input  
                ref={storeDataElem}
                type="checkbox"
                id="storeData"
                name="storeData"
                value="true"
                className="focus:ring-2 focus:ring-pink-500 checked:to-pink-500"
                />
                <label className="px-3 text-pink-400 cursor-pointer" htmlFor="storeData">Save my E-mail and name for future Comments </label>
          </div>
      </div>
      {error && <p className="text-xs text-red-400">All fields are required</p>}
      <div className="mt-8 ">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-pink-400 inline-block text-lg bg-pink-500 rounded-full px-8 py-3 cursor-pointer text-white"
        >
          Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-pink-700">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
