import React, {useContext, useEffect, useCallback, useMemo, memo, useState} from 'react'
import FormControl from '@common/FormControl/FormControl'
import Button from '@common/Button/Button'
import TextField from '@common/TextField/TextField/TextField'
import Select from '@common/Select/Select/Select'
import DatePicker from '@common/DatePicker/DatePicker/DatePicker'
import CheckList from '@common/CheckList/CheckList'
import RadioList from '@common/RadioList/RadioList'
import TextArea from '@common/TextArea/TextArea/TextArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PhotoUploader from '@common/PhotoUploader/PhotoUploader'
import DynamicFields from '@common/DynamicFields/DynamicFields/DynamicFields'
import ToggleSwitch from '@common/ToggleSwitch/ToggleSwitch'
import { DeviceContext, UserContext } from '@App'
import useForm from '@hooks/useForm'
import { faDownload, faLock, faSignIn, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import authService from '@services/authService'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {

  const navigate = useNavigate()
  const device: string = useContext(DeviceContext)

  const currentUser = useContext(UserContext);

  const [data, setData] = useState<any>({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState<any>({})
  const [submitIndex, setSubmitIndex] = useState(0)
  const [submissionLoading, setSubmissionLoading] = useState(false)

  const schema: any = useMemo(() => {
    return {
      username: {
          component: "TextField",
          validateOnBlur: false,
          validators: {
            required: true, 

          }
      },

      password: {
          component: "TextField",
          validateOnBlur: false,
          validators: {
            required: true, 
          }
      },
    }}, 
  [])

  const {
    handleFormControlChange,
    handleDynamicFormControlChange,
    validateForm,
    elRef
  } = useForm(schema, data, setData, errors, setErrors,)



  const handleSubmit = async () => {
    
    setSubmitIndex(prev => prev + 1)
    const isValid = await validateForm(schema, data, errors, setErrors)
    if(isValid==true) {
      
      setSubmissionLoading(true)

      try {
        const authentication = await authService.login(
          data.username,
          data.password
        );
  
  
        //setIsLoading(false)
        setSubmissionLoading(false)

  
        window.location.href = "/"
      } catch (ex: any) {
        //////////////////////////////////console.log  ("EX", ex)
        if (ex.response && ex.response.status === 400) {
          const message = ex.response.data.message;
          console.log  ("ERROR: ", message)
          //toast.error(message, { className: "toast-message" });
        }

        console.log("MESSAGE", ex)
      }

      //insert axios async submit function
      //const isSubmitted = await submit(data)
      
    }
    
  }

  if (currentUser) {
    //////////////////////////////////console.log  ("NAVIGATE", currentUser)
    window.location.href = "/"
  }

  const handleChange = useCallback(async (value: any, name?: string, trigger?: string) => {
    handleFormControlChange(value, /*schema,*/ data, setData, errors, setErrors, name!, trigger) 
  }, [])

  const handleDynamicFieldChange = useCallback((value: any, index: number, fieldName: string, component: string, name: string, errors?: any) => {
    handleDynamicFormControlChange(value, schema, data, setData, errors, setErrors, index, fieldName, component, name)
  }, [])


  useEffect(() => {

  }, [])


  return (
    <>
         <form onSubmit={handleSubmit}>
            <h1 style={{fontFamily: "Helvetica Neue", padding: "15px"}}>Login</h1>
            <FormControl ref={elRef}>
              <TextField
                error={errors["username"]}
                label={"Username"}
                name={"username"}
                onChange={handleChange}
                placeholder={"Enter username"}
                type={"text"}
                startAdornment={<FontAwesomeIcon icon={faUser}/>}
                value={data.username}
              />
            </FormControl>  

            

            <FormControl ref={elRef}>
              <TextField
                error={errors["password"]}
                label={"Password"}
                name={"password"}
                onChange={handleChange}
                placeholder={"Enter password"}
                type={"password"}
                startAdornment={<FontAwesomeIcon icon={faLock}/>}
                value={data.password}
              />
            </FormControl>

            <FormControl style={{display: "block", width: "100%", textAlign: "right"}}>
                <Button 
                    theme={"primary"}
                    variant={"contained"}
                    size={"medium"}
                    //theme={"secondary"}
                    onClick={handleSubmit}
                    endAdornment={<FontAwesomeIcon icon={faSignIn} />}
                    style={{width: "100%"}}
                >
                    LOGIN
                </Button>
            </FormControl>
        </form>
    </>
  )
}

export default LoginForm