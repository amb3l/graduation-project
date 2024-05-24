import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { title } from 'process'
import React, { useCallback, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useNavigate} from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { theme } from '../../themes/theme'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'


export const Registraion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()
  

  const handleRegistration = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.post('http://localhost:8000/api/register', {
        name: nameValue,
        email: emailValue,
        password: passwordValue
      })
      setIsLoading(false)
      console.log(response.data)
      // login(response.data)

      navigate('/order')


    } catch (e: unknown) {
      const error = e as AxiosError
      setIsLoading(false)
      setError(error.message)
      console.log(error)
    }
  }, [emailValue, passwordValue, isLoading])

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  }


  return (
    <Box width={'100%'}
      sx={{
        backgroundColor: 'white',
        filter: 'drop-shadow(0 30px 25px rgb(50 0 0 / 0.15))',
        borderRadius: '1.5rem',
        padding: '2rem'
      }}
    >

      { isLoading ?
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 'inherit',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'fixed',
            backgroundColor: 'black',
            opacity: 0.6,
            zIndex: '1100'
          }}
        >
          <CircularProgress color='success' />
        </Box>
        : null
      }

      <Button
        sx={{
          position: 'absolute',
          borderRadius: '50%',
          minWidth: 'auto',
          padding: '0.5rem',
          top: '1.7rem',
          left: '1rem'
        }}
        onClick={handleBackClick}
      >
        <ArrowBackIcon />
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '3rem' }}>
        <Box textAlign={'center'}>
          <Typography variant='h5' fontWeight={500} sx={{ mb: '1rem' }}>
            Создайте аккаунт
          </Typography>
          <Typography variant='body1' fontWeight={500}>
            Время попробовать! 
          </Typography>
        </Box>
      </Box>
      {error.length ?
        <Box
          sx={{
            color: theme.palette.error.light,
            position: 'absolute',
            borderRadius: '50%',
            minWidth: 'auto',
            padding: '0.5rem',
            top: '1.7rem',
            right: '1rem'
          }}
        > 
          <ErrorOutlineIcon />
        </Box>
        : null
      }      

      
      <Box my='0.5rem'>
        <TextField
          error={ error.length ? true : false }
          helperText={ error.length ? '' : error }
          value={nameValue}
          onChange={handleNameChange}
          placeholder='Введите имя'
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.5rem",
              backgroundColor: '#efefee',
              fontSize: '1.2rem',
              pl: '0.5rem'
            }
          }}
        />
      </Box>

      <Box my='0.5rem'>
        <TextField
          error={ error.length ? true : false }
          helperText={ error.length ? '' : error }
          value={emailValue}
          onChange={handleEmailChange}
          placeholder='Введите email'
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.5rem",
              backgroundColor: '#efefee',
              fontSize: '1.2rem',
              pl: '0.5rem'
            }
          }}
        />
      </Box>

      <Box my='0.5rem'>
        <TextField
          error={ error.length ? true : false }
          helperText={ error.length ? '' : error }
          value={passwordValue}
          onChange={handlePasswordChange}
          placeholder='Введите пароль'
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.5rem",
              backgroundColor: '#efefee',
              fontSize: '1.2rem',
              pl: '0.5rem'
            }
          }}
        />
      </Box>

      <Box mt='3rem'>
        <Button
          onClick={handleRegistration}
          fullWidth
          variant='outlined'
          sx={[
            { 
              borderRadius: '1.5rem',
              textTransform: 'none',
              height: '60px',
              backgroundColor: theme.palette.primary.main,
              color: 'white'
            },
            (theme) => ({
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: 'white'
              },
            }),
          ]}
        >
          <Typography fontWeight='500'>
            Продолжить
          </Typography>
        </Button>
      </Box>
      
    </Box>
  )
}