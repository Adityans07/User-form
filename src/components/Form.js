import React, { useRef, useState } from 'react';
import "./Form.css";
import validator from 'validator';

export default function Form({ onFormSubmit, data, onSuccess, onError }) {
    const radioRef = useRef();
    const radioRef2 = useRef();
    const [formData, setFormData] = useState({
        id: (data.length == 0 ? 0 : data[data.length-1].id),
        fname: '',
        mname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        dob: '',
        ind: '',
    });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'fname':
        error = !value.trim() ? 'First name is required' : '' || !(/^[a-zA-Z]+$/.test(value));
        break;
      case 'lname':
        error = !value.trim() ? 'Last name is required' : '' || !(/^[a-zA-Z]+$/.test(value));
        break;
      case 'email':
        error = !value.trim() ? 'Email address is required' : !validator.isEmail(value) ? 'Invalid email address' : '';
        break;
      case 'phone':
        error = !value.trim() ? 'Phone number is required' : !validator.isMobilePhone(value) || value.length != 10 ? 'Invalid phone number' : '';
        break;
      case 'address':
        error = value.length < 10 ? 'Address is too short' : '';
        break;
      case 'gender':
        error = !value ? 'Please select a gender' : '';
        break;
      case 'dob':
        error = !value ? 'Date of birth is required' : '' || (new Date(value).getTime() > new Date().getTime() ?"Date of birth is invalid": "" );
        break;
      case 'ind':
        error = value !== 'yes' && value !== 'no' ? 'Please select an option' : '';
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error
    });

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    // console.log((data[data.length-1].id));
    console.log(data.length);
    e.preventDefault();
    // Form validation
    const validationErrors = {};
    if (!formData.fname.trim()) {
      validationErrors.fname = 'First name is invalid';
    }else if(!/^[a-zA-Z]+$/.test(formData.fname)){
      validationErrors.fname = 'First name is invalid';
    }
    if (formData.lname === '') {
      validationErrors.lname = 'Last name is invalid';
    }
    if (formData.email === '') {
      validationErrors.email = 'Email address is invalid';
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && formData.email.length < 5) {
      validationErrors.email = 'Invalid email address';
    }
    if (formData.dob === '' || (new Date(formData.dob).getTime() > new Date().getTime() ?"Date of birth is invalid": "" )) {
      validationErrors.dob = 'Date of birth is invalid';
    }
    if(formData.gender == ""){
        validationErrors.gender = "Please select a gender"
    }
    if(formData.phone == ""){
        validationErrors.phone = "Please enter phone number."
    }
    else if(!validator.isMobilePhone(formData.phone)){
        validationErrors.phone = "Invalid phone number"
    }
    if(formData.address.length < 10){
        validationErrors.address = "Address is too short"
    }
    if (formData.ind !== 'yes' && formData.ind !== 'no') {
        validationErrors.ind = 'Please select an option';
    }
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
    //   Handle form submission if no validation errors
      const fullName = [formData.fname, formData.mname, formData.lname].filter(Boolean).join(' ');
      const updatedFormData = { ...formData, name: fullName, id: ++formData.id };
      console.log("Form submitted:", updatedFormData);
    //   // Update grid data
      onFormSubmit(updatedFormData);
      // Reset form
      setFormData({
        id: formData.id,
        fname: '',
        mname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        dob: '',
        ind: '',
      });
      
    if (radioRef.current.checked) {
        radioRef.current.checked = false;
    }
    if (radioRef2.current.checked) {
        radioRef2.current.checked = false;
    }
      setErrors({});
      onSuccess();
    }
    else{
      onError();
    }
  };
  const handleReset = () => {
    setFormData({
      id: formData.id,
      fname: '',
      mname: '',
      lname: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      dob: '',
      ind: '',
    });
    if (radioRef.current.checked) {
        radioRef.current.checked = false;
    }
    if (radioRef2.current.checked) {
        radioRef2.current.checked = false;
    }
    setErrors({});
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='container'>
            <div>
            <label htmlFor="fname">First Name</label>
            <input type="text" name='fname' placeholder='First Name' value={formData.fname} onChange={handleChange} className={errors.fname ? 'error-border' : ''}  />
            {errors.fname && <span className="error-message input-error">{errors.fname}</span>}
            </div>
            <div>
            <label htmlFor="mname">Middle Name</label>
            <input type="text" placeholder='Middle Name' name='mname' value={formData.mname}  onChange={handleChange} />
            </div>
            <div>
            <label htmlFor="lname">Last Name</label>
            <input type="text" name="lname" placeholder='Last Name' value={formData.lname} className={errors.lname ? 'error-border' : ''} onChange={handleChange} />
            {errors.lname && <span className="error-message input-error">{errors.lname}</span>}
            </div>
            <div>
            <label htmlFor="email">Email address</label>
            <input type="text" placeholder='Email address' name='email' value={formData.email} onChange={handleChange} className={errors.email ? 'error-border' : ''} />
            {errors.email && <span className="error-message input-error">{errors.email}</span>}
            </div>
            <div>
            <label htmlFor="phone">Number</label>
            <input type="tel" placeholder='Mobile Number' name='phone' value={formData.phone} onChange={handleChange} className={errors.phone ? 'error-border' : ''}/>
            {errors.phone && <span className="error-message input-error">{errors.phone}</span>}
            </div>
            <div  className="address">
            <label htmlFor="address">Address</label> 
            <textarea type="text" placeholder='Address' name='address' wrap='soft' value={formData.address} onChange={handleChange} className={errors.address ? 'error-border' : ''} />
            {errors.address && <span className="error-message input-error">{errors.address}</span>}
            </div>
            <div>
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'error-border' : ''} >
                <option value="">--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
            </select>
            {errors.gender && <span className="error-message input-error">{errors.gender}</span>}
            </div>
            <div>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={errors.dob ? 'error-border' : ''} />
            {errors.dob && <span className="error-message input-error">{errors.dob}</span>}
            </div>
            <div className='country'>
                <label>Are you indian</label>
                <input type="radio" name="ind" value="yes" onChange={handleChange} ref={radioRef}/>
                <div>Yes</div>
                <input type="radio" name="ind" value="no" onChange={handleChange} ref={radioRef2}/>
                <div>No</div>
                {errors.ind && <span className="error-message input-error">{errors.ind}</span>}
            </div>
        </div>
        <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
        </div>       
      </form>
    </div>
  );
}
