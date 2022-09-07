import { React, useState, useEffect } from 'react'

const BasicTextFields = (props) => {

    const { searchText, updateSearchText, setbuttonClick, setApi } = props

    const handleChange = (e) => {
        e.preventDefault()
        updateSearchText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setbuttonClick(true)
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={searchText}
                    onChange={handleChange}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
        </>
    );
}

export default BasicTextFields;