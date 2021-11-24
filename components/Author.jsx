import React from 'react'
import Image from "next/image"
const Author = ({ author}) => {
    return (
        <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-pink-500   ">
            <div className="absolute left-0 -top-10 right-2">
            <Image 
            alt={author.name}
            unoptimized
            height="100px"
            width="100px"
            className='align-middle rounded-full '
            src={author.photo.url}
             />
             </div>
             <h3 className="text-white text-xl my-5 font-bold">{author.name}</h3>
             <p className="text-lg ">{author.bio}</p>
        </div>
    )
}

export default Author
