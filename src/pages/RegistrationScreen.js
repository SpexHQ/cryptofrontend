import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Box, Heading, Text, Button } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';



// RegEx (Regular Expressions)
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
    return re.test(password);
}







function RegistrationScreen() {

    // "initial", "sending", "successful", "unsuccessful", "validation error"
    const [state, setState] = useState("initial"); 
    const [errorsState, setErrorsState] = useState([]);

    // Declare undefined variables for later assignment (ref props)
    let avatarField;
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let contactField;
    let addressField;

    // To instantiate a FormData object
    const formData = new FormData();

    const attachFile = (evt) => {

        // Create an array for the files attached
        const files = Array.from(evt.target.files);

        // Append each file to the formData
        files.forEach(
            (file, index) => {
                formData.append(index, file);
            }
        )
    }

    const register = () => {

        const errors = [];

        // 1. Validate the fields
        if(firstNameField.value.length == 0) {
            errors.push("Please enter your first name");
        }
        if(lastNameField.value.length == 0) {
            errors.push("Please enter your last name");
        }
        if(!validateEmail(emailField.value)) {
            errors.push("Please enter a valid email address");
        }
        if(!validatePassword(passwordField.value)) {
            errors.push("Please enter a valid password");
        }

        // 1.1 If there are errors, set the state to "validation error"
        if(errors.length > 0) {
            setState("validation error");
            // Populate the alert box with the errors
            setErrorsState(errors);
        }
        // 1.2 If there are no errors, set the state to "sending"
        else {
            setState("sending");
            setErrorsState([]);

            formData.append('firstName', firstNameField.value);
            formData.append('lastName', lastNameField.value);
            formData.append('email', emailField.value);
            formData.append('password', passwordField.value);
            formData.append('contactNumber', contactField.value);
            formData.append('address', addressField.value);

            fetch(`http://localhost:3001/user/add`, {
                method: 'POST',
                //headers: {"Content-Type": "application/json"},
                body: formData
            })
            // 2.1 If the submission is successful, set the state "successful"
            .then((backendResponse)=> backendResponse.json())
            .then((theJson)=>{
                console.log(theJson);
                setState("successful");
            })
            // 2.2 If the submission is unsuccessful, set the state "unsuccessful"
            .catch((error)=>{
                console.log(error);
                setState("unsuccessful");
            });
        }
    }

    return (
        <ThemeProvider theme={theme}>
        <section sx={styles.banner} id="home">
            <Container sx={styles.banner.container}>
                <Box sx={styles.contentBox}>
                    <Heading as="h1" variant="heroPrimary">
                        Want to join our network?
                    </Heading>
                    <Text as="p" variant="heroSecondary">
                        Please provide below information:
                    </Text>
                </Box>
            <Box>
                <Container>
                    <Box>
                        <label for="avatar" className="form-label">Avatar</label>
                        <br></br>
                        <input 
                        onChange={attachFile}
                        ref={ (elem)=>avatarField = elem } type="file" className="form-control" id="avatar" aria-describedby="avatar" />
                    </Box>

                    <Box>
                        <label for="firstName" className="d-flex my-4 justify-content-between">First Name</label>
                        <br></br>
                        <input ref={ (elem)=>firstNameField = elem } type="text" className="form-control" id="firstName" aria-describedby="firstName"/>
                    </Box>

                    <Box>
                        <label for="lastName" className="form-label">Last Name</label>
                        <br></br>
                        <input ref={ (elem)=>lastNameField = elem } type="text" className="form-control" id="lastName" aria-describedby="lastName" />
                    </Box>

                    <Box>
                        <label for="email" className="form-label">Email address</label>
                        <br></br>
                        <input ref={ (elem)=>emailField = elem } type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </Box>

                    <Box>
                        <label for="password" className="form-label">Password</label>
                        <br></br>
                        <input ref={ (elem)=>passwordField = elem } type="password" className="form-control" id="password" aria-describedby="password" />
                    </Box>

                    <Box>
                        <label for="contactNumber" className="form-label">Contact Number</label>
                        <br></br>
                        <input ref={ (elem)=>contactField = elem } type="text" className="form-control" id="contactNumber" aria-describedby="contactNumber" />
                    </Box>

                    <Box>
                        <label for="address" className="form-label">Address</label>
                        <br></br>
                        <input ref={ (elem)=>addressField = elem } type="text" className="form-control" id="address" aria-describedby="address" />
                    </Box>

                    {
                        state !== "sending" && state !== "successful" &&
                        <button onClick={register} variant="primary">Submit</button>
                    }

                    { 
                        state === "validation error" &&
                        <div className="alert alert-danger" role="alert">
                        <ul>
                        {
                            errorsState.map(
                                (error) => <li>{error}</li>
                            )
                        }
                        </ul>
                        </div>
                    }

                    {
                        state === "successful" &&
                        <div className="alert alert-success" role="alert">
                            You have registered successfully!
                        </div>
                    }

                    {
                        state === "unsuccessful" &&
                        <div className="alert alert-danger" role="alert">
                            Internal error. Please try again later.
                        </div>
                    }

                    {
                        state === "sending" &&
                        <p>Loading...</p>
                    }


                </Container>
            </Box>
            </Container>
        </section>
        </ThemeProvider>
    )


};

const styles = {
  banner: {
    pt: ['140px', '145px', '155px', '170px', null, null, '180px', '215px'],
    pb: [2, null, 0, null, 2, 0, null, 5],
    position: 'relative',
    zIndex: 2,
    '&::before': {
      position: 'absolute',
      content: '""',
      bottom: 6,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: -1,
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      bottom: '40px',
      right: 0,
      height: '100%',
      width: '100%',
      zIndex: -1,
    },
    container: {
      minHeight: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      mb: ['40px', null, null, null, null, 7],
    },
    contentBox: {
      width: ['100%', '90%', '535px', null, '57%', '60%', '68%', '60%'],
      mx: 'auto',
      textAlign: 'left',
      mb: ['40px', null, null, null, null, 7],
    },
    imageBox: {
      justifyContent: 'center',
      textAlign: 'center',
      display: 'inline-flex',
      mb: [0, null, -6, null, null, '-40px', null, -3],
      img: {
        position: 'relative',
        height: [245, 'auto'],
      },
    },
    grid: {
        mt: [0, null, -6, null, -4],
        gridGap: ['35px 0px', null, 0, null, null, '30px 35px'],
        gridTemplateColumns: [
          'repeat(2,1fr)',
          null,
          'repeat(2,1fr)',
        ],
    },
},

};

  

export default RegistrationScreen;