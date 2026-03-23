import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) navigate('/');
    return () => dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-bgBase p-4'>
      <div className='w-full max-w-md glass-card p-8'>
        <div className='flex flex-col items-center mb-8'>
           <div className='w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 text-white text-2xl font-bold font-serif shadow-[0_0_20px_rgba(79,110,247,0.4)]'>
             C
           </div>
           <h2 className='text-3xl font-serif italic text-textPrimary'>Create Account</h2>
           <p className='text-textMuted mt-2 text-sm'>Join Corelo CRM today</p>
        </div>

        {isError && <div className='bg-danger/10 text-danger text-sm p-3 rounded-lg mb-4 text-center border border-danger/20'>{message}</div>}

        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <label className='block text-xs font-medium tracking-wider text-textSecondary uppercase mb-1.5'>Full Name</label>
            <input 
              type='text' 
              name='name' 
              value={name} 
              onChange={onChange}
              className='input-field bg-[#1B1D2C] border-borderDim h-11 transition-all focus:bg-bgSurface'
              placeholder='Lara Croft' 
              required 
            />
          </div>
          <div>
            <label className='block text-xs font-medium tracking-wider text-textSecondary uppercase mb-1.5'>Email Address</label>
            <input 
              type='email' 
              name='email' 
              value={email} 
              onChange={onChange}
              className='input-field bg-[#1B1D2C] border-borderDim h-11 transition-all focus:bg-bgSurface'
              placeholder='you@example.com' 
              required 
            />
          </div>
          <div>
            <label className='block text-xs font-medium tracking-wider text-textSecondary uppercase mb-1.5'>Password</label>
            <input 
              type='password' 
              name='password' 
              value={password} 
              onChange={onChange}
              className='input-field bg-[#1B1D2C] border-borderDim h-11 transition-all focus:bg-bgSurface'
              placeholder='••••••••' 
              required minLength='6'
            />
          </div>
          
          <button 
            type='submit' 
            disabled={isLoading}
            className='w-full btn-primary h-11 mt-6 text-base shadow-[0_4px_14px_0_rgba(79,110,247,0.39)] hover:shadow-[0_6px_20px_rgba(79,110,247,0.23)] hover:-translate-y-1 block'
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-textMuted'>
          Already have an account? <Link to='/login' className='text-primary hover:underline'>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
