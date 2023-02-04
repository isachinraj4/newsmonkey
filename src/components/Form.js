import React from 'react'

export default function Form() {
  return (
        <div>
            <form action="" className='wrapper'>
                <div className='box'>

                <label htmlFor="fname" className=''>First name:</label>
                <label htmlFor="lname" className=''>Last name:</label>
                <label htmlFor=""></label>
                </div>
                <div className='box'>

                <input type="text" className='a' name="fname" value="John"/><br/>
                <input type="text" className='a' name="lname" value="Doe"/><br/><br/>
                </div>

            </form>
        </div>
  )
}
