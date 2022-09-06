import { React, useState, useEffect } from 'react'
import './textfield.css'

const BasicTextFields = (props) => {

    const { searchText, updateSearchText, setbuttonClick, setApi } = props

    return (
        <>
            <h1>T1 input field</h1>
            <div className='inputbox'>
                <input className='input' id="outlined-basic" label="Image Text" variant="outlined" value={searchText}
                    onChange={(e) => updateSearchText(e.target.value)} />
                <button className='button' onClick={() => setbuttonClick(true)}>search</button>
            </div>
        </>
    );
}

export default BasicTextFields;