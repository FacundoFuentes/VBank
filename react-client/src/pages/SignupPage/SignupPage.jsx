
import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import register from "../../img/register.jpg"
import styled from "styled-components"
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from '@nextui-org/react';
import { registerUser } from '../../redux/reducers/userSlice';
import Nav from '../../components/Nav/Nav';

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from "react-i18next";


const Page = styled.div`
background-color: none;
max-height: 100vh;
display: flex;

justify-content: center;
align-items: center;
margin-top:15px;
@media only screen and (max-width:725px){
  margin-top:15px;
}

`;

const FormContainer = styled.div`

width: 70%;
background-color:white;
height: 600px;
max-height: 600px;
display: grid;
grid-template-columns: 1fr 1fr;
 img{
   width: 100%;
   min-height: 100%;
   object-fit: contain;
   display:block
  }
  @media only screen and (max-width:725px){
    height: auto;
   
   grid-template-columns: 1fr;
   img{
     display:none;
   }

   section{
     width: 100%;
     
     .form{
       width: 100%;
     }
   }
 }
.container-steps {

  transform: translate(-1%, -1%);
}
.steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 200px;
}
.step {
  width: 30px;
  height: 30px;
  background: #95BEFE;
  border: 2px solid #ACACA6;
  border-radius: 50%;
  transition: background 1s;
  text-align: center;
  padding-bottom: 15px;
}
.step.selected {
  border: 2px solid #0070f3; 
  color:  #fff; 

}
.step.completed {
  border: 2px solid #0070f3;
  background: #0070f3;
}
.progress {
  position: absolute;
  width: 100%;
  height: 50%;
  border-bottom: 2px solid transparent;
  z-index: -1;
}
.percent {
  position: absolute;
  width: 0;
  height: 100%;
  border-bottom: 2px solid #0070f3;
  z-index: 1;
  transition: width 1s;
}
h2{
  margin-top: 20px;
}

.form {
  background-color: #95BEFE;
  display:flex;
  flex-direction: column;
  align-items: center;
  color: #f5f5f5;
 
  min-height: 520px;
  border-radius:10px;
  padding-top:25px;
  padding-bottom:5%;
}

form{
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  width: 50%;

  @media screen and (max-width:520px){
        width: 55%;
   
        }

  .fields{
    margin-top:10px;
    margin-bottom:25px;
    width: 100%;

    &
    label{
      color: #f5f5f5;

    }
   .jsx-4281389978 { // lo saque del html 
     width: 100%;
    }
    input.jsx-4281389978:-webkit-autofill, input.jsx-4281389978:-webkit-autofill.jsx-4281389978:hover, input.jsx-4281389978:-webkit-autofill.jsx-4281389978:active, input.jsx-4281389978:-webkit-autofill.jsx-4281389978:focus, textarea.jsx-4281389978:-webkit-autofill, textarea.jsx-4281389978:-webkit-autofill.jsx-4281389978:hover, textarea.jsx-4281389978:-webkit-autofill.jsx-4281389978:active, textarea.jsx-4281389978:-webkit-autofill.jsx-4281389978:focus {
    box-shadow: 0 0 0 30px #95BEFE inset !important;
    -webkit-text-fill-color: #fff !important;
}
   input{
     color:#f5f5f5;
   }
   span{
     color: #f5f5f5;
   }

   .error{
     
     margin-top: 4px;
     color:#dc3545;
     font-size: 13px;
   }
  
  }
  .navigation{
           margin-top:10px;
      display:flex;
      width: 100%;
      justify-content: space-between;

      margin-bottom: 12px;
      @media screen and (max-width:467px){
        button{
          padding: 5px 10px 5px 10px;

        }
      }
    }

}

`;


const SignupPage = () => {
  
 const dispatch = useDispatch()

 const userState = useSelector(state => state.user);

 const {loggedInUser} =userState; // lo manejo en useEffect

 const {error} = useSelector(state => state.user.registerState)



 const history= useHistory();

 useEffect(() => { 
  
  if (loggedInUser){
      //redirect con el hook useHistory
      history.push("/home"); //esto me lleva hacia esta ventana

  }
}, [loggedInUser,history])

  const {control, handleSubmit, formState: { errors, isValid }} = useForm({mode:"all"});

   

  const onSubmit =async (data) => {
    try {
      const response= await dispatch(registerUser(data)).unwrap()
      let {status} = response;
      if (status === "ok"){
        toast.info('created succesfully, check Email!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          onClose: () => ( history.push("/")  ), 
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
      }
    } catch (error) {
      // handle error here
      console.log(error.data)
     let {status} = error
     if (status === "failed"){
     /*  toast.error(`${error.data}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        }); */
     }
    }
  }
  const [formStep, setFormStep] = useState(0)
  const FormTitles = ["Sign Up", "Personal Info", "Contact"];
  
  const handleInput=(e) => {
    if (e.currentTarget === e.target) {
        document.getElementById('date').type= 'date';
       
      } else {
        document.getElementById('date').type= 'text';
      }
  }
  const { t, i18n } = useTranslation("global");
/*   style={{ width: formStep === 0 ? "33.3%" : formStep == 1 ? "66.6%" : "100%" }} */
  return (
    <>
      <Nav/>
      <Page>
        <FormContainer>
          <img src={register} alt="register" />

          <div className="form">
          
          <div class="container-steps">
  <div class="progress">
    <div class="percent"
    style={{ width: formStep === 0 ? "0%" : formStep === 1 ? "50%" : "100%" }}
    ></div>
  </div>
  <div className="steps">
    <div className={`step ${formStep === 0 ? "selected": "completed"}`} id="0"> 
    <span>1</span>
    </div>
    <div class="step" id="1"
    className={`step ${formStep === 1 ? "selected": "completed"}`} 
    > 
    <span>2</span>
    </div>
    <div class="step" id="2"
    className={`step ${formStep === 2 ? "selected": "completed"}`} 
    >
    <span>3</span>
      </div>
  </div>
</div>
         
            <h2>{FormTitles[formStep]}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            { formStep === 0 && (<section>
            <div  className="fields">
          <Controller
        className="fields"
        name="username"
        control={control}
        defaultValue=""
       rules={{required:true, pattern:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/}}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder={t("Nav.Username")}
         color="#f5f5f5" {...field} />}
      />
       {errors?.username?.type === "required" && <p className="error">{t("Prof.err")}</p>}
       {errors?.username?.type === "pattern" && <p className="error">{t("Sing.err")}</p>}
      

            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="email"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i }}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Email"
         color="#f5f5f5" {...field} />}
      />
      {errors?.email?.type === "required" && <p className="error">{t("Prof.err")}</p>}
      {errors?.email?.type === "pattern" && (
        <p className="error">{t("Sing.err2")}</p>
      )}
            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="password"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/}}
        render={({ field }) => <Input.Password
           underlined 
           labelPlaceholder={t("Nav.Pass")}
             type="password" 
             className="input"
         color="#f5f5f5" {...field} />}
      />
     {errors?.password?.type === "required" && <p className="error">{t("Prof.err")}</p>}

     {errors?.password?.type === "pattern" && <p className="error">{t("Sing.err3")}</p>}
   
            </div>

            </section>
            )}

            { formStep === 1 &&
              <section>
                <div  className="fields">
          <Controller
        className="fields"
        name="firstName"
        control={control}
        defaultValue=""
        rules={ { pattern: /[A-Za-z]{2,254}/i, required:true, maxLength:32}}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder={t("Prof.firts")}
         color="#f5f5f5" {...field} />}
      />
       {errors?.firstName?.type === "required" && <p className="error">{t("Prof.err")}</p>}
      {errors?.firstName?.type === "maxLength" && (
        <p className="error"> {t("Sing.err-first")}</p>
      )}
      {errors?.firstName?.type === "pattern" && (
        <p className="error">{t("Sing.err-first2")}</p>
      )}
      
            </div>

            <div  className="fields">
          <Controller
        className="fields"
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ pattern: /^[A-Za-z]+$/i, required: true, maxLength:32 }}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder={t("Prof.lastn")}
         color="#f5f5f5" {...field} />}
      />
       {errors?.lastName?.type === "required" && <p className="error">{t("Prof.err")}</p>}
      {errors?.lastName?.type === "maxLength" && (
        <p className="error">{t("Sing.err-first3")}</p>
      )}
      {errors?.lastName?.type === "pattern" && (
        <p className="error">{t("Sing.err-first2")}</p>
      )}

            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="dni"
        rules={{ required: true, pattern: /^([0-9])*$/i , maxLength:9}}
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
      
        underlined 
       
        labelPlaceholder="DNI"
         color="#f5f5f5" {...field} />}
      />
      {errors.dni?.type === 'required' && <p className="error">{t("Sing.err-dni")}</p>}
      {errors.dni?.type === 'pattern' && <p className="error">{t("Sing.err-dni2")} </p>}
      {errors.dni?.type === 'maxLength' && <p className="error">{t("Sing.err-dni3")} </p>}

            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="birthDate"
        rules={{ required: true}}
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
        onFocus={handleInput}
        type="text"
        id="date"
        underlined 
        labelPlaceholder={t("Prof.birth")}
         color="#f5f5f5" {...field} />}
      />
      {errors.birthDate?.type === 'required' && <p className="error"> {t("Prof.err")}</p>}

            </div>
              </section>
            }

            {
             formStep === 2 &&
             <section>
              <div className="fields">
                <Controller
                  className="fields"
                  name="phoneNumber"
                  rules={{
                    required: true,
                  }}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      className="input"
                      underlined
                      labelPlaceholder={t("Prof.phone")}
                      color="#f5f5f5"
                      {...field}
                    />
                  )}
                />
                {errors.dni?.type === "required" && (
                  <p className="error">{t("Prof.err")}</p>
                )}
              {error && <p className="error">{error}</p>}
              </div> 
             </section>
            }

             <div className="navigation">

<Button
size="mini"
disabled={formStep === 0}
onClick={() => {
setFormStep((currPage) => currPage - 1);
}}
>
{t("Sign.prev")}
</Button>
<Button
size="mini"
disabled={formStep === 2 }
onClick={() => {
setFormStep((currPage) => currPage + 1);

}}
>
{t("Sign.next")}

</Button>
</div>


{formStep === 2  && isValid ? <>   <Button  type="submit" color="primary" auto>
{t("Sign.create")}
</Button></> : null}
          

{/* <pre>
  {JSON.stringify(watch(), null,2)}
</pre> */}
            
          </form>
          </div>

        </FormContainer>
  </Page>
  </>
  ) }
export default SignupPage
