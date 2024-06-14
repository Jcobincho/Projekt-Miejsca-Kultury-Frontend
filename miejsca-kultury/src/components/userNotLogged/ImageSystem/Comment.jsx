import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { gsap } from 'gsap';

export default function TextFieldSection({ onChange, placeholder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      inputRef.current,
      { x: -100, opacity: 0 },
      { x: 10, opacity: 1, duration: 0.5, ease: "elastic.out(0.2, 0.8)" }
    );
  }, []);

  const handleChange = (event) => {
    onChange(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '30%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Input
        fullWidth
        placeholder={placeholder}
        inputProps={{ style: { fontFamily: 'Outfit' } }}
        ref={inputRef}
        onChange={handleChange}
      />
    </Box>
  );
}